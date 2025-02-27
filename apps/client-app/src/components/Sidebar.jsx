import {useState} from 'react';
import { IoIosLogOut } from "react-icons/io";
import { TbSmartHome, TbMoneybag } from "react-icons/tb";
import { PiChatTeardropText, PiBookOpenText } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuCircleHelp, LuSettings } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { MdOutlinePrivacyTip } from "react-icons/md";
import Modal from './Modal';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col h-[1024px] w-[220px] text-[#090909]">
      {/* Sidebar Header */}
      <div className="flex items-center h-16">
        <h1 className="text-[24px] font-head text-[#51016D] px-3">Conarrative</h1>
      </div>

      {/* Sidebar Options */}
      <div className="flex flex-col flex-1 p-4 space-y-2 font-body">
        <h2 className='font-medium'> MAIN MENU</h2>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"><TbSmartHome size={20}/> Home</span>
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"> <PiChatTeardropText size={20}/>Popular</span>
        </a>
        <h2 className='font-medium'>TOPICS</h2>
        <button onClick={() => setIsOpen(true)} className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
        <span className="ml-2 flex items-center gap-2"> <FaPlus size={20}/>Create New Topic</span>
      </button>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"><TbMoneybag size={20}/> Crypto</span>
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"> <PiBookOpenText size={20}/> Untold Stories</span>
        </a>
        <h2 className='font-medium'>RESOURCES</h2>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"><CiCircleInfo size={20}/>About Conarrative</span>
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"> <IoNewspaperOutline size={20}/> Blog</span>
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"> <LuCircleHelp size={20}/>Support</span>
        </a>
        <h2 className='font-medium'>SYSTEM</h2>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"><GoPeople size={20}/>Communities</span>
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"> <MdOutlinePrivacyTip size={20}/>Privacy Policy</span>
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-2"> <LuSettings size={20}/>Settings</span>
        </a>
      </div>

      {/* Logout Option */}
      <div className="p-4 font-body">
        <button className="flex items-center w-full p-2 hover:bg-[#FCF4FF] hover:shadow-md rounded hover:text-[#51016D]">
          <span className="ml-2 flex items-center gap-1"><IoIosLogOut size={20}/> Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;