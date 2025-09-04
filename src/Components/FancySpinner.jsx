// FancySpinner.jsx
import React from "react";

const FancySpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-6 bg-blue-500 rounded-full opacity-70 animate-[wave_1.2s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.15}s` }}
          ></div>
        ))}
      </div>

      {/* Inline keyframes for wave animation */}
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
            50% { transform: scaleY(1); opacity: 1; }
          }
          .animate-[wave_1.2s_ease-in-out_infinite] {
            animation: wave 1.2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default FancySpinner;
