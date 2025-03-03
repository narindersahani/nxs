import { useState } from "react";

const Checkbox = ({ name, label, checked, onChange, error }) => {
	const [isChecked, setIsChecked] = useState(checked || false);

	const handleChange = (e) => {
		const isCheckedNow = e.target.checked;
		setIsChecked(isCheckedNow);

		// Pass value to parent
		if (onChange) {
			onChange(name, isCheckedNow);
		}
	};

	return (
		<div className="w-full">
			<label className="flex items-center gap-2 cursor-pointer text-gray-600">
				<input
					type="checkbox"
					name={name}
					checked={isChecked}
					onChange={handleChange}
					className="hidden" // Hide default checkbox
				/>
				{/* Custom Checkbox UI */}
				<div
					className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all
						${isChecked ? "bg-gray-700 border-gray-700" : "border-gray-400"}`}
				>
					{isChecked && (
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					)}
				</div>
				<span className="text-gray-600">{label}</span>
			</label>

			{/* Show validation error from parent */}
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Checkbox;
