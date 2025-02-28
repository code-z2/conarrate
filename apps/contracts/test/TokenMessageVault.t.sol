// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {TokenMessageVault} from "../src/TokenMessageVault.sol";
import {MockERC20} from "./mocks/MockERC20.sol";

contract TokenMessageVaultTest is Test {
    TokenMessageVault public vault;
    MockERC20 public token;
    address public owner;
    address public user;
    uint256 public constant INITIAL_BALANCE = 1000e18;
    uint256 public constant DEPOSIT_AMOUNT = 100e18;

    function setUp() public {
        owner = makeAddr("owner");
        user = makeAddr("user");

        // Deploy mock token and vault
        token = new MockERC20("Test Token", "TEST");
        vault = new TokenMessageVault(address(token), owner);

        vm.deal(address(vault), DEPOSIT_AMOUNT * 2);

        // Setup initial balances
        token.mint(user, INITIAL_BALANCE);
        vm.deal(user, INITIAL_BALANCE); // Give user some ETH

        // Approve vault to spend tokens
        vm.prank(user);
        token.approve(address(vault), type(uint256).max);
    }

    function test_Constructor() public view {
        assertEq(address(vault.token()), address(token));
        assertEq(vault.owner(), owner);
    }

    function test_DepositTokens() public {
        uint256 messageId = 1;
        vm.prank(user);
        vault.depositTokens(DEPOSIT_AMOUNT, messageId);

        TokenMessageVault.MessageDeposit[] memory deposits = vault
            .getMessageDeposits(user);
        assertEq(deposits.length, 1);
        assertEq(deposits[0].amount, DEPOSIT_AMOUNT);
        assertEq(deposits[0].messageId, messageId);
        assertEq(deposits[0].timestamp, block.timestamp);
        assertFalse(deposits[0].redeemed);
        assertEq(vault.cumulativeDeposits(user), DEPOSIT_AMOUNT);
        assertEq(vault.underlyingBalance(user), DEPOSIT_AMOUNT);
    }

    function test_RevertWhen_DepositZeroAmount() public {
        vm.prank(user);
        vm.expectRevert("Amount must be greater than 0");
        vault.depositTokens(0, 1);
    }

    function test_RevertWhen_DuplicateMessageId() public {
        uint256 messageId = 1;

        vm.startPrank(user);
        vault.depositTokens(DEPOSIT_AMOUNT, messageId);

        vm.expectRevert("Message ID already used");
        vault.depositTokens(DEPOSIT_AMOUNT, messageId);
        vm.stopPrank();
    }

    function test_ClaimUnderlying() public {
        uint256 messageId = 1;

        // Setup: deposit tokens first
        vm.prank(user);
        vault.depositTokens(DEPOSIT_AMOUNT, messageId);

        uint256 initialBalance = user.balance;

        // Claim underlying
        vm.prank(user);
        vault.claimUnderlying();

        assertEq(vault.underlyingBalance(user), 0);
        assertEq(user.balance, initialBalance + DEPOSIT_AMOUNT);
    }

    function test_RevertWhen_ClaimWithNoBalance() public {
        vm.prank(user);
        vm.expectRevert("No underlying balance");
        vault.claimUnderlying();
    }

    function test_RedeemTokens() public {
        uint256 messageId = 1;

        // Setup: deposit tokens first
        vm.startPrank(user);
        vault.depositTokens(DEPOSIT_AMOUNT, messageId);

        // Redeem tokens
        vault.redeemTokens{value: DEPOSIT_AMOUNT}();
        vm.stopPrank();

        TokenMessageVault.MessageDeposit[] memory deposits = vault
            .getMessageDeposits(user);
        bool redeemed = deposits[0].redeemed;
        assertTrue(redeemed);
        assertEq(vault.cumulativeDeposits(user), 0);
        assertEq(token.balanceOf(user), INITIAL_BALANCE);
    }

    function test_RevertWhen_InsufficientUnderlyingProvided() public {
        uint256 messageId = 1;

        // Setup: deposit tokens first
        vm.startPrank(user);
        vault.depositTokens(DEPOSIT_AMOUNT, messageId);

        // Try to redeem with insufficient underlying
        vm.expectRevert("Insufficient underlying provided");
        vault.redeemTokens{value: DEPOSIT_AMOUNT - 1}();
        vm.stopPrank();
    }

    function test_WithdrawNativeTokens() public {
        // Fund the contract
        vm.deal(address(vault), DEPOSIT_AMOUNT);
        uint256 initialBalance = owner.balance;

        vm.prank(owner);
        vault.withdrawNativeTokens(DEPOSIT_AMOUNT);

        assertEq(owner.balance, initialBalance + DEPOSIT_AMOUNT);
        assertEq(address(vault).balance, 0);
    }

    function test_RevertWhen_NonOwnerWithdraw() public {
        vm.deal(address(vault), DEPOSIT_AMOUNT);

        vm.prank(user);
        vm.expectRevert();
        vault.withdrawNativeTokens(DEPOSIT_AMOUNT);
    }
}
