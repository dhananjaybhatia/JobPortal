import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-[#FF6B81]"></span>
          <span className="relative inline-flex size-[11px] rounded-full bg-[#FF6B81] shadow-md shadow-[#ff6b81]/40"></span>
        </span>
      </div>
    </div>
  );
};

export default Ping;
