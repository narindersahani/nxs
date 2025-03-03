import { useState, useEffect } from "react";

const TextInput = ({
	name,
	value = "",
	onChange,
	placeholder = "Enter text",
	icon,
	error, // Parent validation error
	allowOnly = "all", // Accepts "all", "text", or "number"
}) => {
	const [inputValue, setInputValue] = useState(value);
	const [localError, setLocalError] = useState(""); // Local validation error

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleChange = (e) => {
		let val = e.target.value;
		let errorMessage = "";

		// ✅ Check and validate input type while typing
		if (allowOnly === "number") {
			if (/[^0-9]/.test(val)) {
				errorMessage = "Only numbers are allowed!";
			}
			val = val.replace(/[^0-9]/g, ""); // Remove non-numeric characters
		} else if (allowOnly === "text") {
			if (/[^a-zA-Z ]/.test(val)) {
				errorMessage = "Only letters are allowed!";
			}
			val = val.replace(/[^a-zA-Z ]/g, ""); // Remove numbers & special characters
		}

		// ✅ Update input value & local error
		setInputValue(val);
		setLocalError(errorMessage);

		// Pass value & error to parent
		if (onChange) {
			onChange(name, val, errorMessage);
		}
	};

	// ✅ Show required error when input is empty on blur
	const handleBlur = () => {
		if (!inputValue.trim()) {
			setLocalError("This field is required!");
		}
	};

	// 🔹 If `error` from parent exists, show it; otherwise, show local validation error.
	const displayError = error || localError;

	return (
		<div className="w-full ">
			<div className={`border focus-within:shadow-[0px_0px_0px_3px_#C7D2E5] gap-2 focus-within:border-primary focus-within:border-1 rounded-md p-3 flex items-center justify-between cursor-pointer transition-all
					${displayError ? "border-red mb-4 " : "border-gray-200"}`}>
				
				{/* ✅ Show icon if provided */}
				{icon && <span className="text-gray-500">{icon}</span>}

				<input
					type="text"
					name={name}
					value={inputValue}
					onChange={handleChange}
					onBlur={handleBlur} // 🔹 Validate required on blur
					placeholder={placeholder}
					className="w-full outline-none bg-transparent placeholder-gray-400"
				/>
			</div>

			{/* 🔹 Show validation errors from parent or local validation */}
			{displayError && 
				<div className="flex content-center items-center gap-1 p-1 rounded-[8px] bg-red-50 transition-all duration-300">
					<div className="flex">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.65737 10.0488C8.58831 6.4522 9.55378 4.65391 10.8786 4.191C11.6074 3.93633 12.3926 3.93633 13.1214 4.191C14.4462 4.65391 15.4117 6.4522 17.3426 10.0488C19.2736 13.6454 20.239 15.4437 19.9494 16.9089C19.7901 17.715 19.3975 18.4462 18.828 18.9976C17.7928 20 15.8619 20 12 20C8.13812 20 6.20718 20 5.17197 18.9976C4.60246 18.4462 4.20991 17.715 4.05058 16.9089C3.76096 15.4437 4.72643 13.6454 6.65737 10.0488Z" stroke="#BF435D" strokeWidth="1.6"/>
							<path d="M11.994 15.3687H12.0015" stroke="#BF435D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M12 12.8423L12 9.47386" stroke="#BF435D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
					<div className="font-normal text-[14px] text-red-500 leading-[22px]">
						{displayError}
					</div>
				</div>
			}
		</div>
	);
};

export default TextInput;
