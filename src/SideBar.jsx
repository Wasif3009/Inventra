import React, { use, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Profile from "./Profile";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  let user = localStorage.getItem("userName");
  const handleProfile = () => {
    setOpen(true);
    setShowProfile(true);
  };
  return (
    <div className="section-3 text-[#F3F4F6]  h-14 flex items-center justify-between">
      {showProfile && (
        <Profile
          open={open}
          setOpen={setOpen}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
      )}
      <p className="text-2xl">Hello,{user}</p>
      <CgProfile size={20} className="cursor-pointer" onClick={handleProfile} />
    </div>
  );
};

export default SideBar;
