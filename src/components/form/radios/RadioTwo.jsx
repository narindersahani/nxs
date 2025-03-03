import React, { useState } from 'react';
import './RadioTwo.css';
const RadioTwo = ({
    name,
    options = [],
    selectedValue,
    onChange,
    showIcons = true, // Global control for icons
    errorMessage = "Please select an option",
    isError,
    labelCLass="",
    iconClass="",
    subTextClass=""
}) => {
    return (
        <div>
            <div className="flex gap-4 mb-4">
                {options.map(({ id, label, subtext, icon, showIcon = true }) => {
                    // Resolve the icon only if both showIcons (global) and showIcon (per option) are true
                    const resolvedIcon =
                        showIcons && showIcon && icon ? icon : null;

                    return (
                        <label
                            key={id}
                            className={labelCLass+ ` rounded-[12px]  p-4 border-2 border-gray-200 relative flex flex-col justify-center justify-items-center cursor-pointer transition-all ${selectedValue === id ? "border-primary bg-blue-50 shadow-[0px_4px_0px_0px_#5173AF]" : "bg-white shadow-[0px_4px_0px_0px_#A9ADB9]"
                            } ${isError ? "border-red- shadow-[0px_4px_0px_0px_#FFEBEF]-":"" }`}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={id}
                                checked={selectedValue === id}
                                onChange={() => onChange?.(id)}
                                className="hidden"
                            />

                            {/* Custom Radio Circle */}
                            <div
                                className={`absolute right-0 top-0 mt-2 mr-2 w-[24px] h-[24px] flex items-center justify-center border-1 rounded-full mr-3 transition-all ${selectedValue === id ? "border-[#7C96C3] border-2" : "border-gray-400 bg-white"
                                    }`}
                            >
                                {selectedValue ===id && <div className="w-[16px] h-[16px] bg-primary flex justify-center items-center rounded-full">
                                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 2.6L3.25 5L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </div>}
                            </div>
                        
                            {/* Conditional Icon Rendering (Global + Per Option) */}
                            {resolvedIcon && (
                                <div className="pt-3">
                                    <img src={resolvedIcon} alt={label} className={iconClass + ` w-12 h-12 mb-2`} />
                                </div>
                            )}
                            
                            {label &&
                                <span className={subTextClass +` font-bold text-gray-700 text-4`}>  
                                    {label}
                                </span>
                            }
                            
                            {subtext && 
                                <span className="text-sm pt-1 text-gray-300">{subtext}</span>
                            }
                        </label>
                    );
                })}
            </div>
            {isError &&
				<div className="flex content-center items-center gap-1 p-1 rounded-[8px] bg-red-50 transition-all duration-300">
					<div className="flex">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.65737 10.0488C8.58831 6.4522 9.55378 4.65391 10.8786 4.191C11.6074 3.93633 12.3926 3.93633 13.1214 4.191C14.4462 4.65391 15.4117 6.4522 17.3426 10.0488C19.2736 13.6454 20.239 15.4437 19.9494 16.9089C19.7901 17.715 19.3975 18.4462 18.828 18.9976C17.7928 20 15.8619 20 12 20C8.13812 20 6.20718 20 5.17197 18.9976C4.60246 18.4462 4.20991 17.715 4.05058 16.9089C3.76096 15.4437 4.72643 13.6454 6.65737 10.0488Z" stroke="#BF435D" strokeWidth="1.6" />
							<path d="M11.994 15.3687H12.0015" stroke="#BF435D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12 12.8423L12 9.47386" stroke="#BF435D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<div className="font-normal text-[14px] text-red-500 leading-[22px]">
						{errorMessage}
					</div>
				</div>
			}
        </div>
    );
};


export default RadioTwo;
