import React, { useState, useRef, useEffect } from "react";
import "./Popover.css";

const Popover = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Dynamically set position (right for desktop, bottom for mobile)
  const positionClass = isMobile
    ? "top-full left-1/2 transform -translate-x-1/2 mt-2" // Bottom for mobile
    : "left-full md:-mt-9 top-1/3 transform -translate-y-1/2 ml-2"; // Right for desktop

  return (
    <div className="popover-container relative inline-block">
      <button
        ref={triggerRef}
        className="popover-trigger"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
        onClick={isMobile ? toggleVisibility : undefined}
        onMouseEnter={!isMobile ? () => setIsVisible(true) : undefined}
        onMouseLeave={!isMobile ? () => setIsVisible(false) : undefined}
      >
        {children}
      </button>

      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          

          className={`absolute ${positionClass} transition-all duration-300 ease-in-out 
          ${isVisible ? " opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"} 
          bg-white text-black text-[14px] p-4 min-h-16 min-w-[337px] rounded-[16px] border-1 border-gray-100 shadow-[4px_4px_20px_0px_rgba(18,18,23,0.15),0px_4px_4px_0px_rgba(18,18,23,0.10)] z-10 w-48`}
        >
          {/* Arrow Icon */}
          <div className={`popover-arrow absolute  top-7 w-3 h-3 bg-white border-t border-l border-gray-100  ${isMobile ? "bottom top-[-6.5px] left-0 right-0 ml-auto mr-auto -rotate-320" : "left left-[-6.5px] -rotate-45"}`}></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
