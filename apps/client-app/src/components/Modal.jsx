import React from "react";
import { useModalStore } from "./useModalStore";
import { FaArrowLeft } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TbMoneybag } from "react-icons/tb";

const Modal = ({ onClose }) => {
  const {
    step,
    topic,
    setTopic,
    description,
    setDescription,
    amount,
    setAmount,
    nextStep,
    prevStep,
  } = useModalStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-body">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Step 1: Topic Input */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Create a Topic</h2>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#51016D]"
              placeholder="Write your topic here"
            />
            <button
              onClick={nextStep}
              disabled={!topic}
              className={`flex justify-center items-center gap-3 mt-4 w-full text-[#8E8E93] p-2 text-white rounded ${
                topic ? "bg-[#51016D] text-[#FEFBFF]" : "bg-[#E5E5EA]"
              }`}
            >
              Continue <FaCircleArrowRight />
            </button>
          </div>
        )}

        {/* Step 2: Description Input */}
        {step === 2 && (
          <div>
            <h2 className="text-sm font-semibold mb-3">Create a Topic</h2>
            <button
              onClick={prevStep}
              className="flex items-center my-4 ml-1 gap-3"
            >
              <FaArrowLeft /> Go Back
            </button>
            <p className="text-sm">Topic</p>
            <h2 className="text-[20px] font-semibold mb-3">{topic}</h2>
            <textarea
              name="text"
              id=""
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 h-44"
              placeholder="Write about your topic here"
            ></textarea>
            {/* <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter description..."
            />
             */}
            <div className="flex justify-between border-2 border-[#E5E5EA] p-4 rounded-xl">
              <p>Add to your post</p>
              <div>%%%</div>
            </div>
            <button
              onClick={nextStep}
              disabled={!description}
              className={`flex justify-center items-center gap-3 mt-4 w-full text-[#8E8E93] p-2 text-white rounded ${
                topic ? "bg-[#51016D] text-[#FEFBFF]" : "bg-[#E5E5EA]"
              }`}
            >
              Continue <FaCircleArrowRight />
            </button>
          </div>
        )}

        {/* Step 3: Amount Selection */}
        {step === 3 && (
          <div>
            <h2 className="text-sm font-semibold mb-3">Create a Topic</h2>
            <button
              onClick={prevStep}
              className="flex items-center my-4 ml-1 gap-3"
            >
              <FaArrowLeft /> Go Back
            </button>
            <p className="text-sm">Topic</p>
            <h2 className="text-[20px] font-semibold mb-3">{topic}</h2>
            <p>{description}</p>
            <div className="border-2 border-[#E5E5EA] px-5 py-3">
              <div className="flex justify-between items-center my-2">
                <p>Stake Deposit</p>
                <div>
                  <Select>
                    <SelectTrigger className="w-[135px] rounded-3xl">
                      <TbMoneybag size={16} />
                      <SelectValue placeholder="Select Coin" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white">
                      <SelectGroup>
                        <SelectLabel>Avaliable Coins</SelectLabel>
                        <SelectItem value="apple">USDT</SelectItem>
                        <SelectItem value="banana">Dash</SelectItem>
                        <SelectItem value="blueberry">Tron</SelectItem>
                        <SelectItem value="grapes">Ethereum</SelectItem>
                        <SelectItem value="pineapple">Bitcoin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p>Deposit amount</p>
                <p>$0-100</p>
              </div>
              <div className="border-2 border-[#E5E5EA]">
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                />
                <p className="text-center mt-2 text-lg font-semibold">
                  ${amount}
                </p>
              </div>
              <div className="border-b-2 border-[#E5E5EA] mt-2"></div>
              <div className="flex justify-between items-center">
                <p>How many days do you want to invest for?</p>
                <p>Days</p>
              </div>
              <div className="border-2 border-[#E5E5EA]">
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                />
                <p className="text-center mt-2 text-lg font-semibold">
                  ${amount}
                </p>
              </div>
            </div>
            <button
              onClick={nextStep}
              className={`flex justify-center items-center gap-3 mt-4 w-full text-[#8E8E93] p-2 text-white rounded ${
                topic ? "bg-[#51016D] text-[#FEFBFF]" : "bg-[#E5E5EA]"
              }`}
            >
              Continue <FaCircleArrowRight />
            </button>
          </div>
        )}

        {/* Step 4: Final Review */}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Review & Confirm</h2>
            <p>
              <strong>Topic:</strong> {topic}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Amount:</strong> ${amount}
            </p>
            <div className="flex justify-between mt-4">
              <button onClick={prevStep} className="p-2 bg-gray-300 rounded">
                Back
              </button>
              <button
                onClick={() => {
                  alert("Submission successful!");
                  onClose();
                }}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
