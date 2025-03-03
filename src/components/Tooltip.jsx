import { useEffect, useRef, useState } from "react";

const Tooltip = ({ id, content, isOpen, setOpenTooltip, position = "top", children }) => {
  const tooltipRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [tooltipPosition, setTooltipPosition] = useState(position);

  useEffect(() => {
    const updateView = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setTooltipPosition(isMobileView ? "bottom" : position);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, [position]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpenTooltip(isOpen ? null : id);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setOpenTooltip(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setOpenTooltip]);

  const positions = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "md:-mt-9 left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div ref={tooltipRef} className="lg:relative inline-block">
      <div
        onMouseEnter={() => !isMobile && setOpenTooltip(id)}
        onMouseLeave={() => !isMobile && setOpenTooltip(null)}
        onClick={handleToggle}
        className="cursor-pointer"
      >
        {children}
      </div>

      {isOpen && (
        <div
          
          className={`absolute ${positions[tooltipPosition]} transition-all duration-300 ease-in-out ${isOpen ? " opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"} 
          bg-white text-black text-[14px] p-4 min-h-16 min-w-[337px] rounded-[16px] border-1 border-gray-100 shadow-[4px_4px_20px_0px_rgba(18,18,23,0.15),0px_4px_4px_0px_rgba(18,18,23,0.10)] z-10 w-48`}
        >
          {/* Icon */}
          <div className="absolute left-[-6.5px] top-7 w-3 h-3 bg-white border-t border-l border-gray-100 -rotate-45"></div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
