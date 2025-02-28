// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenMessageVault is ReentrancyGuard, Ownable {
    // Structs
    struct MessageDeposit {
        uint256 messageId;
        uint256 amount;
        uint256 timestamp;
        bool redeemed;
    }

    // State variables
    IERC20 public token;
    mapping(address => MessageDeposit[]) public messageDeposits; // user => deposits array
    mapping(address => uint256) public cumulativeDeposits; // user => total deposits
    mapping(address => uint256) public underlyingBalance; // user => native token balance
    uint256 public constant NATIVE_TOKEN_RATIO = 1e18; // 1 ETH per 1 token deposited

    // Events
    event TokenDeposited(
        address indexed user,
        uint256 indexed messageId,
        uint256 amount
    );
    event UnderlyingClaimed(address indexed user, uint256 amount);
    event TokensRedeemed(address indexed user, uint256 amount);

    constructor(
        address _underlying,
        address _initialOwner
    ) Ownable(_initialOwner) {
        require(_underlying != address(0), "Invalid token address");
        token = IERC20(_underlying);
    }

    function getMessageDeposits(
        address user
    ) public view returns (MessageDeposit[] memory) {
        return messageDeposits[user];
    }

    /**
     * @notice Deposits ERC20 tokens with a message ID
     * @param amount Amount of tokens to deposit
     * @param messageId Unique identifier for the message
     */
    function depositTokens(
        uint256 amount,
        uint256 messageId
    ) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        // Check for duplicate message ID
        MessageDeposit[] storage deposits = messageDeposits[msg.sender];
        for (uint256 i = 0; i < deposits.length; i++) {
            require(
                deposits[i].messageId != messageId,
                "Message ID already used"
            );
        }

        // Transfer tokens from user
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        // Update deposits
        messageDeposits[msg.sender].push(
            MessageDeposit({
                messageId: messageId,
                amount: amount,
                timestamp: block.timestamp,
                redeemed: false
            })
        );
        cumulativeDeposits[msg.sender] += amount;

        // Calculate and update underlying balance
        uint256 underlyingAmount = (amount * NATIVE_TOKEN_RATIO) / 1e18;
        underlyingBalance[msg.sender] += underlyingAmount;

        emit TokenDeposited(msg.sender, messageId, amount);
    }

    /**
     * @notice Claims available underlying native tokens
     */
    function claimUnderlying() external nonReentrant {
        uint256 amount = underlyingBalance[msg.sender];
        require(amount > 0, "No underlying balance");

        // Reset balance before transfer
        underlyingBalance[msg.sender] = 0;

        // Transfer native tokens
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Native token transfer failed");

        emit UnderlyingClaimed(msg.sender, amount);
    }

    /**
     * @notice Redeems all available original tokens by providing underlying native tokens
     */
    function redeemTokens() external payable nonReentrant {
        uint256 totalAmount = 0;
        uint256 totalUnderlying = 0;

        // Calculate total unredeemed tokens and required underlying
        MessageDeposit[] storage deposits = messageDeposits[msg.sender];
        for (uint256 i = 0; i < deposits.length; i++) {
            if (!deposits[i].redeemed) {
                totalAmount += deposits[i].amount;
                totalUnderlying +=
                    (deposits[i].amount * NATIVE_TOKEN_RATIO) /
                    1e18;
                deposits[i].redeemed = true;
            }
        }

        require(totalAmount > 0, "No unredeemed deposits");
        require(
            msg.value >= totalUnderlying,
            "Insufficient underlying provided"
        );

        // Update cumulative deposits
        cumulativeDeposits[msg.sender] -= totalAmount;

        // Transfer tokens back to user
        require(
            token.transfer(msg.sender, totalAmount),
            "Token transfer failed"
        );

        // Refund excess native tokens if any
        uint256 excess = msg.value - totalUnderlying;
        if (excess > 0) {
            (bool success, ) = msg.sender.call{value: excess}("");
            require(success, "Refund transfer failed");
        }

        emit TokensRedeemed(msg.sender, totalAmount);
    }

    /**
     * @notice Allows the contract to receive native tokens
     */
    receive() external payable {}

    /**
     * @notice Allows owner to withdraw native tokens
     * @param amount Amount of native tokens to withdraw
     */
    function withdrawNativeTokens(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}
