import React, { useState } from "react";

const AlertBox = ({ type = "info", title, children }) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const InfoIcon = () => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12Z" stroke="#8C92A2" strokeWidth="1.6"/>
			<path d="M12.1951 15.5556V12.0001C12.1951 11.6229 12.1951 11.4344 12.078 11.3172C11.9608 11.2001 11.7723 11.2001 11.3951 11.2001" stroke="#8C92A2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M11.9942 8.79993H12.0014" stroke="#8C92A2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
    const ErrorIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.65737 10.0488C8.58831 6.4522 9.55378 4.65391 10.8786 4.191C11.6074 3.93633 12.3926 3.93633 13.1214 4.191C14.4462 4.65391 15.4117 6.4522 17.3426 10.0488C19.2736 13.6454 20.239 15.4437 19.9494 16.9089C19.7901 17.715 19.3975 18.4462 18.828 18.9976C17.7928 20 15.8619 20 12 20C8.13812 20 6.20718 20 5.17197 18.9976C4.60246 18.4462 4.20991 17.715 4.05058 16.9089C3.76096 15.4437 4.72643 13.6454 6.65737 10.0488Z" stroke="#BF435D" strokeWidth="1.6"/>
            <path d="M11.9943 15.3682H12.0018" stroke="#BF435D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12.8418L12 9.47338" stroke="#BF435D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    const alertStyles = {
        info: "bg-primary-10 border-primary rounded-[8px] p-[16px] relative",
        success: "bg-green-100 text-green-700 border-green-400 rounded-[8px] p-[16px] relative",
        warning: "bg-yellow-100 text-yellow-700 border-yellow-400 rounded-[8px] p-[16px] relative",
        error: "bg-red-100 text-red-700 border-red-400 rounded-[8px] p-[16px] relative",
    };

    const iconStyles = {
        info:<InfoIcon/>,
        success: "✅",
        warning: "⚠️",
        error: "<ErrorIcon/>",
    };

    return (
        <div className={`mb-6 p-4 border-l-4 ${alertStyles[type]}`}>
            <div className="mb-2">{iconStyles[type]}</div>
            <div className="">
                <h4 className="font-semibold text-[16px] text-[#000] mb-1">{title}</h4>
                <div className="text-[#5D616C] text-[14px]">{children}</div>
            </div>
            <button onClick={() => setVisible(false)} className="absolute top-0 right-0 mt-[12px] mr-[12px] cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#F4F4F6"/>
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#DDDFE3"/>
                    <path d="M15 9L9 15M15 15L9 9" stroke="#5D616C" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    );
};

export default AlertBox;
