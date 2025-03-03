import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

const Dropdown = ({
	options,
	placeholder = "Select...",
	name,
	required = false,
	value,
	onChange,
	error
}) => {
	const [selected, setSelected] = useState(value || null);
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		if (value) setSelected(value);
	}, [value]);

	useEffect(() => {
		if (!isOpen) setSearch(""); // Clear search when closing dropdown
	}, [isOpen]);

	const handleSelect = (option) => {
		setSelected(option);
		setSearch(""); // Clear search input after selecting
		setIsOpen(false);
		if (onChange) onChange(name, option);
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
		setIsOpen(true); // Keep dropdown open when typing
	};

	const toggleDropdown = (e) => {
		e.stopPropagation(); // Prevent input focus event from triggering dropdown
		setIsOpen((prev) => !prev);
	};

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Filter options based on search input
	const filteredOptions = options.filter((option) =>
		option.toString().toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div ref={dropdownRef} 
			className={`relative
				${
					error ? "":""
				}`}
		>
			{/* Input Field */}
			<div tabIndex={0}
				className={`border focus-within:shadow-[0px_0px_0px_3px_#C7D2E5] focus-within:border-primary focus-within:border-1 rounded-md p-3 flex items-center justify-between cursor-pointer transition-all 
          ${error ? "border-red mb-4" : "border-gray-200"}`}
				onClick={() => {
					setIsOpen(true);
					inputRef.current?.focus();
				}}
			>
				<input
					type="text"
					name={name}
					ref={inputRef}
					value={search}
					onChange={handleSearch}
					placeholder={selected ? selected : placeholder}
					className={`w-full outline-none bg-transparent ${
						selected ? "placeholder:text-black" : "placeholder:text-gray-400"
					}`}
					onFocus={() => setIsOpen(true)}
				/>
				<ChevronDown
					className={`w-6 h-6 transition-transform cursor-pointer ${isOpen ? "rotate-180" : ""}`}
					onClick={toggleDropdown}
				/>
			</div>

			{/* Dropdown Options */}
			{isOpen && (
				<div className="absolute mt-2 w-full p-[6px] bg-white border border-gray-100 rounded-md shadow-md max-h-48 overflow-y-auto z-10">
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option) => (
							<div
								key={option}
								className={`p-2 mb-1 rounded-[8px] flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-all 
                  ${selected === option ? "bg-gray-50 font-bold " : ""}`}
								onClick={() => handleSelect(option)}
							>
								{option} {selected === option && <Check className="w-4 h-4 text-black font-bold" />}
							</div>
						))
					) : (
						<p className="p-2 text-gray-500">No results found</p>
					)}
				</div>
			)}

			{error &&
				<>
					<div className="flex content-center items-center gap-1 p-1 rounded-[8px] bg-red-50 transition-all duration-300">
						<div className="flex">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.65737 10.0488C8.58831 6.4522 9.55378 4.65391 10.8786 4.191C11.6074 3.93633 12.3926 3.93633 13.1214 4.191C14.4462 4.65391 15.4117 6.4522 17.3426 10.0488C19.2736 13.6454 20.239 15.4437 19.9494 16.9089C19.7901 17.715 19.3975 18.4462 18.828 18.9976C17.7928 20 15.8619 20 12 20C8.13812 20 6.20718 20 5.17197 18.9976C4.60246 18.4462 4.20991 17.715 4.05058 16.9089C3.76096 15.4437 4.72643 13.6454 6.65737 10.0488Z" stroke="#BF435D" strokeWidth="1.6"/>
								<path d="M11.994 15.3687H12.0015" stroke="#BF435D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M12 12.8423L12 9.47386" stroke="#BF435D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
						<div className="font-normal text-[14px] text-red-500 leading-[22px]">
							{error}
						</div>
					</div>
				</>	
			}
		</div>
	);
};

export default Dropdown;
