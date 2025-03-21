// components/Download.tsx
import React from "react";
import { LiaDownloadSolid } from "react-icons/lia";

const Download: React.FC = () => {
  return (
    <button className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center">
      <LiaDownloadSolid size={20} className="sm:mr-2 " />
      <span className="sm:block hidden">Download</span>
    </button>
  );
};

export default Download;