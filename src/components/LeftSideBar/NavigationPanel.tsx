import React from "react";
import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";

export const NavigationPanel: FC<{
  width: number;
}> = ({ width }) => {
  const location = useLocation();
  {/*竖着的线*/}
  return (
    <aside
      style={{
        width: `${width}px`,
      }}
      className="overflow-hidden absolute h-full border-r border-gray-300 transition-all duration-200"
    >
      <div className="w-[280px] absolute inset-0 flex flex-col h-full">
        {/* Logo and Preview Button */}
        <div className="p-6 pb-0">
          <div className="text-center mb-6">
            <span style={{ color: "#222C67", fontFamily: "'Roboto Condensed', 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif", fontWeight: '900', fontSize: '29px', lineHeight: '24px', letterSpacing: '0.5px' }}>
              DUA<span style={{ color: "#007CBA" }}>BUILDER</span>
            </span>
          </div>
          
          {/* Preview Button */}
          <Link
            to="/preview"
            className="flex items-center justify-center w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Document
          </Link>
          
          {/* Divider */}
          <div className="mt-6 mx-0">
            <div className="border-t border-gray-300"></div>
          </div>
        </div>

        {/* Navigation items */}
        
      </div>
    </aside>
  );
};
