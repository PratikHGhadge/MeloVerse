import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center bg-black items-center h-screen bg-white">
      <div className="border-t-4  border-blue rounded-full animate-spin  h-12 w-12"></div>
    </div>
  );
};

export default Spinner;
