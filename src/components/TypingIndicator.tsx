import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 bg-[#3a3939b0] rounded-full animate-bounce [animation-delay:0s]"></span>
      <span className="w-1.5 h-1.5 bg-[#3a3939b0] rounded-full animate-bounce [animation-delay:0.2s]"></span>
      <span className="w-1.5 h-1.5 bg-[#3a3939b0] rounded-full animate-bounce [animation-delay:0.4s]"></span>
    </div>
  );
};

export default TypingIndicator;
