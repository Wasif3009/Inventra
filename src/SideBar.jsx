import React, { use } from "react";

const SideBar = () => {
  let user = localStorage.getItem("userName");
  return (
    <div className="section-3 text-[#F3F4F6]  h-14 flex flex-col  justify-center">
      <p className="text-2xl">Hello,{user}</p>
    </div>
  );
};

export default SideBar;
