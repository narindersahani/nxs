import React, { useState } from 'react';
import catIcon from '../assets/cat-icon.svg';
import dogIcon from '../assets/dog-icon.svg';
const PetCheckBox = () => {
    const [selected, setSelected] = useState("option1");

    // Define icons based on id type
    const iconMap = {
        cat: catIcon,
        dog: dogIcon,
    };

    const options = [
        { id: "dog", label: "Dog" },
        { id: "cat", label: "Cat" },
    ];
    return (
        <>
            <div className="grid grid-cols-2 gap-4 w-[272px] mb-8">
                {options.map((option) => (
                    <label
                        key={option.id}
                        className={`rounded-[12px]  p-4 border-2 border-gray-200 relative flex flex-col justify-center justify-items-center cursor-pointer transition-all ${selected === option.id ? "border-primary bg-blue-50 shadow-[0px_4px_0px_0px_#5173AF]" : "bg-white shadow-[0px_4px_0px_0px_#A9ADB9]"
                            }`}
                    >
                        {/* Hidden Default Radio Input */}
                        <input
                            type="radio"
                            name="custom-radio"
                            value={option.id}
                            checked={selected === option.id}
                            onChange={() => setSelected(option.id)}
                            className="hidden"
                        />

                        {/* Custom Radio Circle */}
                        <div
                            className={`absolute right-0 top-0 mt-2 mr-2 w-[24px] h-[24px] flex items-center justify-center border-1 rounded-full mr-3 transition-all ${selected === option.id ? "border-[#7C96C3] border-2" : "border-gray-400 bg-white"
                                }`}
                        >
                            {selected === option.id && <div className="w-[16px] h-[16px] bg-primary flex justify-center items-center rounded-full">
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 2.6L3.25 5L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>}
                        </div>
                        {/* Image Icon from Assets */}
                        <div className=" text-center pt-3 ">
                            <img src={iconMap[option.id]} alt={option.label} className="w-12 mx-auto h-12 mb-2" />
                        </div>

                        {/* Label */}
                        <span className="font-medium text-center text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
            {/* <div className="grid grid-cols-2 gap-4 w-[272px]">
                <div className="">
                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="hidden"/>
                    <label for="bordered-radio-1" className="flex relative rounded-[12px] p-4 border-2 border-gray-200 after:absolute after:border-2 after:w-6 after:h-6 after:top-0 after:right-0 after:mt-2 after:mr-2 after:rounded-[40px] after:border-gray-200">
                        <img src={catIcon} alt="" />

                    </label>
                </div>
                <div className="rounded-3 border-2 border-gray-200 ">
                    <input checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                </div>
            </div> */}
        </>
    );
}

export default PetCheckBox;