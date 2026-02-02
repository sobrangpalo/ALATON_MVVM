
import React from 'react';

interface AndroidDeviceFrameProps {
  children: React.ReactNode;
}

const AndroidDeviceFrame: React.FC<AndroidDeviceFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-gray-900 bg-gray-900 border-[12px] rounded-[3rem] h-[720px] w-[340px] shadow-2xl ring-4 ring-gray-800">
      {/* Punch Hole Camera */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border-2 border-gray-800"></div>
      
      {/* Side Buttons */}
      <div className="h-[40px] w-[3px] bg-gray-800 absolute -right-[15px] top-[100px] rounded-r-md"></div>
      <div className="h-[80px] w-[3px] bg-gray-800 absolute -right-[15px] top-[160px] rounded-r-md"></div>
      
      <div className="rounded-[2.2rem] overflow-hidden w-full h-full bg-white relative flex flex-col">
        {/* Android Status Bar */}
        <div className="h-8 w-full flex justify-between items-center px-6 pt-2 bg-white z-40">
          <span className="text-[11px] font-bold text-gray-800">12:30</span>
          <div className="flex gap-2 items-center">
            {/* Cellular */}
            <svg className="w-3 h-3 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 22h20V2L2 22z" />
            </svg>
            {/* Wi-Fi */}
            <svg className="w-3.5 h-3.5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity=".3"/>
              <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            </svg>
            {/* Battery */}
            <div className="flex items-center gap-0.5">
              <div className="w-5 h-2.5 border border-gray-800 rounded-sm relative p-[1px]">
                <div className="h-full w-4/5 bg-gray-800 rounded-sm"></div>
              </div>
              <div className="w-0.5 h-1 bg-gray-800 rounded-r-sm"></div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>

        {/* Android 3-Button Navigation Bar */}
        <div className="h-12 w-full flex justify-around items-center bg-white border-t border-gray-50 px-12">
          {/* Back Button (Triangle) */}
          <div className="w-10 h-10 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </div>
          {/* Home Button (Circle) */}
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-3.5 h-3.5 border-2 border-gray-400 rounded-full"></div>
          </div>
          {/* Recents Button (Square) */}
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-gray-400 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndroidDeviceFrame;
