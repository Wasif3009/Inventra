import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import Profile from "./Profile";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const user = localStorage.getItem("userName");

  const handleProfile = () => {
    setOpen(true);
    setShowProfile(true);
  };

  return (
    <>
      {showProfile && (
        <Profile
          open={open}
          setOpen={setOpen}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
      )}

      <div
        className="
          w-full
          bg-[#1F1F23]
          border-b
          border-[#2A2A2E]
            shadow-[0_4px_10px_rgba(0,0,0,0.25)]
          px-4
          sm:px-5
          py-1
          flex
          items-center
          justify-between
        "
      >
        {/* User Info */}
        <div className="flex flex-col overflow-hidden">
          <p
            className="
              text-sm
              sm:text-base
              md:text-lg
              font-medium
              text-[#F3F4F6]
              truncate
              max-w-[180px]
              sm:max-w-[260px]
              md:max-w-[400px]
            "
          >
            Hello, {user}
          </p>
        </div>

        {/* Profile Icon */}
        <button
          onClick={handleProfile}
          className="
            flex
            items-center
            justify-center
            
        
        
          
            cursor-pointer
          "
        >
          <CgProfile size={22} className="text-[#F3F4F6]" />
        </button>
      </div>
    </>
  );
};

export default SideBar;
