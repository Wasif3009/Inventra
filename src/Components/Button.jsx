import React from "react";

const Button = ({ btnText, btnHandler }) => {
  return (
    <button
      onClick={btnHandler}
      className="
                    bg-[#9333ea]
                    hover:bg-[#6D28D9]
                    transition-all
                    text-white
                    px-4
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                  "
    >
      {btnText}
    </button>
  );
};

export default Button;
