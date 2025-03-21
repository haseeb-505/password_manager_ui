import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full">
      <div className="logo font-bold text-2xl">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-700">OP/&gt;</span>
      </div>
      <div className="flex justify-cneter items-center m-1">
        Created with <img className="w-6 mx-2 bg-white" src={`${import.meta.env.BASE_URL}/icons/working-with-a-laptop.png`} alt="heart" />
      </div>
    </div>
  );
};

export default Footer;
