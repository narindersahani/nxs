const RadioGroup = ({ name, options, selectedValue, onChange, error }) => {
	return (
		<div className="space-y-2">
			<div className={`flex gap-3 flex-wrap
            ${error ? "mb-4" : ""
				}`}
			>
				{options.map(({ label, value }) => (
					<label
						key={value}
						className={`cursor-pointer px-6 py-2 border-2 rounded-full transition-all select-none font-medium
                ${selectedValue === value
								? "bg-primary text-white border-primary"
								: "border-gray-200 text-gray-300"
							}`}
					>
						<input
							type="radio"
							name={name}
							value={value}
							checked={selectedValue === value}
							onChange={() => onChange(value)}
							className="hidden"
						/>
						{label}
					</label>
				))}
			</div>
			{error &&
				<div className="flex content-center items-center gap-1 p-1 rounded-[8px] bg-red-50 transition-all duration-300">
					<div className="flex">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.65737 10.0488C8.58831 6.4522 9.55378 4.65391 10.8786 4.191C11.6074 3.93633 12.3926 3.93633 13.1214 4.191C14.4462 4.65391 15.4117 6.4522 17.3426 10.0488C19.2736 13.6454 20.239 15.4437 19.9494 16.9089C19.7901 17.715 19.3975 18.4462 18.828 18.9976C17.7928 20 15.8619 20 12 20C8.13812 20 6.20718 20 5.17197 18.9976C4.60246 18.4462 4.20991 17.715 4.05058 16.9089C3.76096 15.4437 4.72643 13.6454 6.65737 10.0488Z" stroke="#BF435D" strokeWidth="1.6" />
							<path d="M11.994 15.3687H12.0015" stroke="#BF435D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12 12.8423L12 9.47386" stroke="#BF435D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<div className="font-normal text-[14px] text-red-500 leading-[22px]">
						{error}
					</div>
				</div>
			}
		</div>
	);
};

export default RadioGroup;



// import { useState } from "react";

// const RadioGroup = ({ options, name }) => {
//     const [selected, setSelected] = useState("");

//     return (
//         <div className="flex gap-3">
//             {options.map(({ label, value }) => (
//                 <label
//                     key={value}
//                     className={`cursor-pointer px-6 py-2 border-2 rounded-full transition-all select-none font-medium
//                     ${selected === value
//                         ? "bg-primary text-white border-primary"
//                         : "border-gray-200 text-gray-300"
//                     }`}
//                 >
//                     <input
//                         type="radio"
//                         name={name}
//                         value={value}
//                         checked={selected === value}
//                         onChange={() => setSelected(value)}
//                         className="hidden"
//                     />
//                     {label}
//                 </label>
//             ))}
//         </div>
//     );
// };

// export default RadioGroup;
