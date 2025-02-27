import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
  FaCircleArrowRight,
  FaPlus,
  FaUpLong,
  FaDownLong,
} from "react-icons/fa6";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineMoreHoriz, MdIosShare } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { TbMoneybag, TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";

const myBtn = [
  "Tending",
  "Cryptocurrency",
  "Starknet Espresso",
  "Ai",
  "Gaming",
  "Web3.0",
  "Mixes",
  "Music",
  "Zero Knowledge",
  "Cameras",
  "News",
];
const stories = [
  {
    title: "The History of Cryptocurrency",
    description: "The blooming millennials at outside again...",
    name: "Contributors",
    background: "/images/bg-1.svg",
    reader1: "/images/1.svg",
    reader2: "/images/2.svg",
    reader3: "/images/3.svg",
  },
  {
    title: "The Origin of Sybil Attacks",
    description: "The blooming millennials at outside again...",
    name: "Contributors",
    background: "/images/bg-2.svg",
    reader1: "/images/1.svg",
    reader2: "/images/2.svg",
    reader3: "/images/3.svg",
  },
  {
    title: "Untold Stories",
    description: "The blooming millennials at outside again...",
    name: "Contributors",
    background: "/images/bg-3.svg",
    reader1: "/images/1.svg",
    reader2: "/images/2.svg",
    reader3: "/images/3.svg",
  },
  {
    title: "Crypto-Jacking",
    description: "The blooming millennials at outside again...",
    name: "Contributors",
    background: "/images/bg-4.svg",
    reader1: "/images/1.svg",
    reader2: "/images/2.svg",
    reader3: "/images/3.svg",
  },
];
function Home() {
  return (
    <div className="flex gap-2">
      <div className="border-r-2 h-[1020px] ">
        <Sidebar />
      </div>
      <div className="font-body">
        <div className="border-b-2 border-[#999999] py-4 mb-5">
          <Navbar />
        </div>
        <div className="flex justify-evenly gap-2 w-[950px]">
          {myBtn.map((items, index) => (
            <div key={index}>
              <button className="border-2 border-[#FEF2FD] text-[13px] py-[6px] px-[10px] rounded-[4px] bg-[#FEF2FD] hover:bg-[#51016D] hover:text-white">
                {items}
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-evenly gap-3 relative my-5">
          {stories.map((item, index) => (
            <div
              key={index}
              className="w-[245px] h-[312px] relative rounded-2xl border-2"
              style={{ backgroundImage: `url(${item.background})` }}
            >
              <div className="flex flex-col absolute bottom-0 left-0 right-0 rounded-b-xl text-white bg-gradient-to-b from-[#14100EDB] to-[#1916158F] backdrop-blur-sm px-2 py-1">
                <h2 className="font-semibold mb-1 text-[15px]">{item.title}</h2>
                <p className="font-light text-[11.5px] mb-1">
                  {item.description}
                </p>
                <p className="font-light text-[8px] mb-1">{item.name}</p>
                <div className="flex gap-1">
                  <img src={item.reader1} alt={item.title + " reader1"} />
                  <img src={item.reader2} alt={item.title + " reader2"} />
                  <img src={item.reader3} alt={item.title + " reader3"} />
                  <span className="w-[22.38px] h-[27.41px] border-2 border-[#F5F5F5] rounded-lg bg-[#F5F5F5] text-black">
                    +1
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <div className="w-[70%] border-[#AAAAAA] border-2 rounded-2xl">
            <div className="flex justify-between items-center mx-5">
              <div className="flex gap-2">
                <img
                  src="/images/3.svg"
                  alt=""
                  className="w-[48px] h-[48px] rounded-full"
                />
                <div>
                  <p>Feri</p>
                  <p className="flex items-center gap-1">
                    <span>
                      <CiClock2 />
                    </span>
                    10 hr.ago
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 my-4 pl-4">
                <button className="flex items-center gap-2 bg-[#51016D] text-white py-3 px-4 rounded-[5px]">
                  contribute <FaCircleArrowRight />
                </button>
                <span>
                  <MdOutlineMoreHoriz size={30} />
                </span>
              </div>
            </div>
            <div className="mx-5">
              <h3 className="font-bold">
                The Origin of Sybil Attacks: A Tale of Deception in Digital
                Networks
              </h3>
              <p>
                In the early 2000s, as the internet evolved into a more
                connected space, researchers faced an emerging problem—how could
                online networks verify the authenticity of participants without
                relying on a central authority? This question led Microsoft
                researcher John R. Douceur to publish a groundbreaking paper in
                2002,{" "}
                <a href="#" className="text-[#51016D] font-medium">
                  Read More...
                </a>
              </p>
            </div>
            <div className="flex gap-3 mx-5 my-1 w-full">
              <img
                src="/images/postpic1.svg"
                alt=""
                className="w-[355px] h-[265px] "
              />
              <img
                src="/images/postpic2.svg"
                alt=""
                className="w-[290px] h-[265px] "
              />
            </div>
            <div className="flex gap-3 mx-5 mb-4 font-body">
              <button className="flex justify-center items-center gap-1 w-[92px] h-[36px] p-2 bg-[#AAAAAA] font-semibold text-[16px] rounded-[32px]">
                <TbMoneybag size={20} />
                stake
              </button>
              <button className="flex justify-center items-center gap-1 w-[108px] h-[36px] p-2 bg-[#AAAAAA] font-semibold text-[16px] rounded-[32px]">
                {" "}
                <TbArrowBigUp size={20} />
                1.7k <TbArrowBigDown size={20} />
              </button>
              <button className="flex justify-center items-center gap-1 w-[70px] h-[36px] p-2 bg-[#AAAAAA] font-semibold text-[16px] rounded-[32px]">
                <IoChatbubbleOutline size={20} /> 89
              </button>
              <button className="flex justify-center items-center gap-1 w-[92px] h-[36px] p-2 bg-[#AAAAAA] font-semibold text-[16px] rounded-[32px]">
                <MdIosShare size={20} /> share
              </button>
            </div>
          </div>
          <div className="w-[30%] border-2 border-[#AAAAAA] rounded-2xl">
            <h2 className="mx-3 my-1 font-bold border-b-2 border-[#AAAAAA] py-3 text-xl ">
              Topics
            </h2>
            <div className="mx-3 border-b-2 border-[#AAAAAA] py-2 ">
              <h2 className="text-lg font-medium">Crypto-Jacking</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs my-1">contributors(2)</p>
                  <div className="flex gap-1">
                    <img
                      src="/images/1.svg"
                      alt=""
                      className="w-[25.6px] h-[25.6px]"
                    />
                    <img
                      src="/images/2.svg"
                      alt=""
                      className="w-[25.6px] h-[25.6px]"
                    />
                    {/* <img src="/images/3.svg" alt="" /> */}
                    <span className="w-[22.38px] h-[27.41px] border-2 border-black rounded-xl bg-[#090909] text-white">
                      +1
                    </span>
                  </div>
                </div>
                <div>
                  <button className="border-2 border-[#51016D] p-1 text-[#51016D] rounded-[6px] font-medium hover:bg-[#51016D] hover:text-white ">
                    contribute
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-3 border-b-2 border-[#AAAAAA] py-2">
              <h2 className="text-lg font-medium">Crypto-Jacking</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs my-1">contributors(2)</p>
                  <div className="flex gap-1">
                    <img
                      src="/images/1.svg"
                      alt=""
                      className="w-[25.6px] h-[25.6px]"
                    />
                    <img
                      src="/images/2.svg"
                      alt=""
                      className="w-[25.6px] h-[25.6px]"
                    />
                    {/* <img src="/images/3.svg" alt="" /> */}
                    <span className="w-[22.38px] h-[27.41px] border-2 border-black rounded-xl bg-[#090909] text-white">
                      +1
                    </span>
                  </div>
                </div>
                <div>
                  <button className="border-2 border-[#51016D] p-1 text-[#51016D] rounded-[6px] font-medium hover:bg-[#51016D] hover:text-white">
                    contribute
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-3 border-b-2 border-[#AAAAAA] py-2">
              <h2 className="text-lg font-medium">Crypto-Jacking</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs my-1">contributors(2)</p>
                  <div className="flex gap-1">
                    <img
                      src="/images/1.svg"
                      alt=""
                      className="w-[25.6px] h-[25.6px]"
                    />
                    <img
                      src="/images/2.svg"
                      alt=""
                      className="w-[25.6px] h-[25.6px]"
                    />
                    {/* <img src="/images/3.svg" alt="" /> */}
                    <span className="w-[22.38px] h-[27.41px] border-2 border-black rounded-xl bg-[#090909] text-white">
                      +1
                    </span>
                  </div>
                </div>
                <div>
                  <button className="border-2 border-[#51016D] p-1 text-[#51016D] rounded-[6px] font-medium hover:bg-[#51016D] hover:text-white">
                    contribute
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-3 border-b-2 border-[#AAAAAA] py-2">
              <h2 className="text-lg font-medium">Crypto-Jacking</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs my-1">contributors(2)</p>
                  <div className="flex gap-1">
                    <img
                      src="/images/1.svg"
                      alt=""
                      className="w-[25.6px] h-[25.6px]"
                    />
                    <img
                      src="/images/2.svg"
                      alt=""
                      className="w-[25.6px] h-[25.6px]"
                    />
                    {/* <img src="/images/3.svg" alt="" /> */}
                    <span className="w-[22.38px] h-[27.41px] border-2 border-black rounded-xl bg-[#090909] text-white">
                      +1
                    </span>
                  </div>
                </div>
                <div>
                  <button className="border-2 border-[#51016D] p-1 text-[#51016D] rounded-[6px] font-medium hover:bg-[#51016D] hover:text-white">
                    contribute
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="flex justify-center items-center gap-2 border-2 border-[#51016D] w-[240px] h-[56px] bg-[#51016D] text-white font-medium rounded-[4px] my-3">
                Create New Topic{" "}
                <span>
                  <FaPlus />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
