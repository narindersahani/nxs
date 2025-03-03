import React, { useState } from "react";
import AlertBox from "./AlertBox";
import Button from './Buttons';
import Accordion from './Accordion';
import Card from './Card';
import LabelTooltip from "./form/tooltips/LabelTooltip";
import RadioGroup from "./form/radios/RadioGroup";
import Dropdown from "./form/Dropdown";
import RadioTwo from "./form/radios/RadioTwo";
import TextInput from "./form/TextInput";
import catIcon from '../assets/cat-icon.svg';
import dogIcon from '../assets/dog-icon.svg';
const MultiStepForm = () => {
    const CustomSVG = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12Z" stroke="#8C92A2" strokeWidth="1.6" />
            <path d="M12.1951 15.5556V12.0001C12.1951 11.6229 12.1951 11.4344 12.078 11.3172C11.9608 11.2001 11.7723 11.2001 11.3951 11.2001" stroke="#8C92A2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.9942 8.79993H12.0014" stroke="#8C92A2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    const [openTooltip, setOpenTooltip] = useState(null);
    const [step, setStep] = useState(1); // Current step
    const [formData, setFormData] = useState({
        petName: "",
        petGender:"",
        size:"",
        year:null,
        month:null,
        whatBreedYourPet:"",
        petAge: "",
        petBreed: "",
        petSize: "",
        petChipped: "",
        petVaccinations: "",
        petNeutered: "",
        petCost: "",
        preExistingConditions: "",
        coverType: "",
        longTermTreatment: "",
        ongoingCosts: "",
    });

    const [errors, setErrors] = useState({}); // Track validation errors

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Special handling for petName to allow only letters and spaces
        if (name === "petName") {
            const isValid = /^[A-Za-z\s]*$/.test(value); // Check if the input contains only letters and spaces
            if (isValid) {
                setFormData({ ...formData, [name]: value });
            }
            // Clear errors when the user starts typing
            if (errors[name]) {
                setErrors({ ...errors, [name]: "" });
            }
        } 
        
        else {
            // For other fields, update the state normally
            setFormData({ ...formData, [name]: value });
            // Clear errors when the user starts typing
            if (errors[name]) {
                setErrors({ ...errors, [name]: "" });
            }
        }
    };

   
    const validateInput = (name, value) => {
		if (!value.trim()) return "This field is required!";
		if (value.length < 3) return "Must be at least 3 characters!";
		return "";
	};
    
    //TextInput event
	const handleInputChange = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Validate in real-time when empty
		if (value.trim() === "") {
			setErrors((prev) => ({ ...prev, [name]: "This field is required!" }));
		}
        else {
			setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when typing
		}
 
	};

	const handleBlur = (name, value) => {
		const errorMsg = validateInput(name, value);
		setErrors((prev) => ({ ...prev, [name]: errorMsg }));
	};


    //Handle radion option
    const handleRadioChange = (name, value) => {
        console.log(name);
        console.log(value);
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error on select
    };

   
      
    //Handle dropdown
    const handleSelect = (name, value) => {
        // setFormData({ ...formData, [name]: value });
        // setErrors({ ...formData, [name]: "" }); // Clear error

        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user selects
    };


    // Validate form inputs for the current step
    const validateStep = () => {
        const newErrors = {};

        if (step === 1) {
            // Validate petName (text only, no numbers or special characters)
            if (!formData.petName.trim()) {
                newErrors.petName = "This field is required";
            } else if (!/^[A-Za-z\s]+$/.test(formData.petName)) {
                newErrors.petName = "Pet name should only contain letters and spaces";
            }

            if (!formData.petGender) {
                newErrors.petGender = "Please select a gender 2";
            }
            if (!formData.size) {
                newErrors.size = "Please select ";

                console.log(newErrors.size);
            }
            
            if (!formData.year) {
                newErrors.year = "Please select Year";
            }
            if (!formData.month) {
                newErrors.month = "Please select Month";
            }
            if (!formData.whatBreedYourPet) {
                newErrors.whatBreedYourPet = "What breed is your pet?";
            }
            // if (!formData.petAge.trim()) newErrors.petAge = "Pet age is required";
            if (!formData.petBreed) newErrors.petBreed = "Please select a breed";
            // if (!formData.petSize) newErrors.petSize = "Please select a size";
            if (!formData.petChipped) newErrors.petChipped = "Please specify if your pet is chipped";
            if (!formData.petVaccinations) newErrors.petVaccinations = "Please specify vaccination status";
            if (!formData.petNeutered) newErrors.petNeutered = "Please specify if your pet is neutered/spayed";
            if (!formData.petCost) newErrors.petCost = "Please specify the cost";
            // if (!formData.preExistingConditions) newErrors.preExistingConditions = "Please specify pre-existing conditions";
            
        }

        if (step === 2) {
            if (!formData.coverType) newErrors.coverType = "Please select a cover type";
            if (!formData.longTermTreatment) newErrors.longTermTreatment = "Please specify long-term treatment preference";
            if (!formData.ongoingCosts) newErrors.ongoingCosts = "Please specify ongoing costs preference";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Go to the next step
    const nextStep = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    // Go to the previous step
    const prevStep = () => setStep(step - 1);

    
    
    const sizeOptions = [
        { id: "small", label: "Small", subtext: "Up to 10 kg", showIcon: false, icon: catIcon },
        { id: "medium", label: "Medium", subtext: "10 – 20 kg", showIcon: false, icon: dogIcon },
        { id: "large", label: "Large", subtext: "Over 20 kg", showIcon: false, icon: dogIcon },

    ];

    const genderOption = [
        { id: "dog", label: "Dog", showIcon: true, icon: catIcon },
        { id: "cat", label: "Cat", showIcon: true, icon: dogIcon },
    ];


    
    // Render the form based on the current step
    const renderFormStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div className="mb-6">
                            <div className="mb-4">
                                <RadioTwo
                                    options={genderOption}
                                    name="petGender"
                                    selectedValue={formData.petGender}
                                    onChange={(value) => handleRadioChange("petGender", value)}
                                    showIcons={true}
                                    //errorMessage="Please select a pet"
                                    errorMessage={errors.petGender}
                                    isError={errors.petGender} // Pass error state to component
                                    labelCLass="w-[136px] radio-elm-center text-center"
                                    iconClass="mx-auto"
                                    subTextClass="class"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4">
                                <label className="block font-[600]">What's your pet name?</label>
                                
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="petName"
                                    name="petName"
                                    value={formData.petName}
                                    onChange={handleChange}
                                    placeholder="eg. Snuffles"
                                    className={`placeholder:text-gray-400 input-focus autofill:bg-white autofill:text-black outline-0 bg-white border-gray-200 border-1 rounded-md px-4 py-3 font-[500] w-full ${errors.petName ? "border-red border-2" : ""
                                        }`}
                                />
                            </div>
                            
                            {errors.petName && 
                                <div className="flex content-center items-center gap-1 p-1 rounded-[8px] bg-red-50 transition-all duration-300">
                                    <div className="flex">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.65737 10.0488C8.58831 6.4522 9.55378 4.65391 10.8786 4.191C11.6074 3.93633 12.3926 3.93633 13.1214 4.191C14.4462 4.65391 15.4117 6.4522 17.3426 10.0488C19.2736 13.6454 20.239 15.4437 19.9494 16.9089C19.7901 17.715 19.3975 18.4462 18.828 18.9976C17.7928 20 15.8619 20 12 20C8.13812 20 6.20718 20 5.17197 18.9976C4.60246 18.4462 4.20991 17.715 4.05058 16.9089C3.76096 15.4437 4.72643 13.6454 6.65737 10.0488Z" stroke="#BF435D" strokeWidth="1.6"/>
                                            <path d="M11.994 15.3687H12.0015" stroke="#BF435D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 12.8423L12 9.47386" stroke="#BF435D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="font-normal text-[14px] text-red-500 leading-[22px]">
                                        {errors.petName}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4">
                                <label className="block font-[600]">Is your pet a boy or a girl?</label>
                            </div>
                            <div className="mb-4">
                                <RadioGroup
                                    name="petGender"
                                    options={[
                                    { label: "Boy", value: "boy" },
                                    { label: "Girl", value: "girl" },
                                    ]}
                                    selectedValue={formData.petGender}
                                    onChange={(value) => handleRadioChange("petGender", value)}
                                    error={errors.petGender}
                                />
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4">
                                <label className="block font-[600]">How old is your pet?</label>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="">
                                    <Dropdown
                                        options={[2024, 2025, 2026, 2027, 2028]}
                                        placeholder="Year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleSelect}
                                        error={errors.year}
                                    />
                                </div>
                                <div className="">
                                    <Dropdown
                                        options={[2024, 2025, 2026, 2027, 2028]}
                                        placeholder="Month"
                                        name="month"
                                        value={formData.month}
                                        onChange={handleSelect}
                                        showIcons={false}
                                        error={errors.month}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4 relative">
                                <label className="block font-[600]">What breed is your pet?</label>
                                <LabelTooltip 
                                    id="tooltip-breed" 
                                    content="<div><b>Pedigree</b> - both parents are the same breed</div>
                                            <div><b>Cross</b> - both parents are different breeds, if you unsure select dominant breed.</div>
                                            <div><b>Mixed</b> - both parents are more than two different breeds.</div>
                                            Select 'pedigree' if your cat's parents are both the same breed. If you're not sure what breed they are (or if they're a mix of several different breeds), select 'moggie'." 
                                    openTooltip={openTooltip} 
                                    setOpenTooltip={setOpenTooltip} 
                                />
                            </div>
                            <div className="mb-4">
                                <RadioGroup
                                    name="whatBreedYourPet"
                                    options={[
                                    { label: "Pedigree", value: "pedigree" },
                                    { label: "Crossbreed", value: "crossbreed" },
                                    { label: "Mixed Breed", value: "mixed-breed" },
                                    { label: "I don't know", value: "no" },
                                    ]}
                                    selectedValue={formData.whatBreedYourPet}
                                    onChange={(value) => handleRadioChange("whatBreedYourPet", value)}
                                    error={errors.whatBreedYourPet}
                                />
                            </div>
                            <div className="mb-4">
                                <Dropdown
                                    options={["Bengal", "Devon Rex", "Sphynx Cat", "Burmese European", "Scottish Fold"]}
                                    placeholder="Enter breed"
                                    name="petBreed"
                                    value={formData.petBreed}
                                    onChange={handleSelect}
                                    error={errors.petBreed}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4">
                                <label className="block font-[600]">What size will your pet be when fully grown? </label>
                            </div>
                            <div className="mb-4">
                                <RadioTwo
                                    options={sizeOptions}
                                    name="size"
                                    selectedValue={formData.size}
                                    onChange={(value) => handleRadioChange("size", value)}
                                    showIcons={true}
                                    //errorMessage="Please select a pet"
                                    errorMessage={errors.size}
                                    isError={errors.size} // Pass error state to component
                                    labelCLass="w-100"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4 relative">
                                <label className="block font-[600]">Has your pet been chipped?</label>
                                <LabelTooltip 
                                    id="tooltip-chipped" 
                                    content="<b>A microchip</b> is a small implant placed under the skin of an animal and contains a unique identification number. Microchips are commonly used to help identify pets if they become lost or stolen." 
                                    openTooltip={openTooltip} 
                                    setOpenTooltip={setOpenTooltip} 
                                />
                            </div>
                            
                            <div className="mb-4">
                                <RadioGroup
                                    name="petChipped"
                                    options={[
                                        { label: "Yes", value: "yes" },
                                        { label: "No", value: "no" },
                                    ]}
                                    selectedValue={formData.petChipped}
                                    onChange={(value) => handleRadioChange("petChipped", value)}
                                    error={errors.petChipped}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4 relative">
                                <label className="block font-[600]">Are your pet's vaccinations up to date?</label>
                                <LabelTooltip 
                                    id="tooltip-vacc" 
                                    content={`Although pets <b>do not need to be vaccinated in order to be insured</b>, if your pet happens to suffer from an illness which could have been prevented by the administration of a "routine" vaccine then the insurer may refuse to pay the claim. It's important to read the terms and conditions carefully.`} 
                                    openTooltip={openTooltip} 
                                    setOpenTooltip={setOpenTooltip} 
                                />
                            </div>
                            <div className="mb-4">
                                <RadioGroup
                                    name="petVaccinations"
                                    options={[
                                        { label: "Yes", value: "yes" },
                                        { label: "No", value: "no" },
                                    ]}
                                    selectedValue={formData.petVaccinations}
                                    onChange={(value) => handleRadioChange("petVaccinations", value)}
                                    error={errors.petVaccinations}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4 relative">
                                <label className="block font-[600]">Has your pet been neutered/sprayed?</label>
                                <LabelTooltip 
                                    id="tooltip-neuter" 
                                    content={`<b>Neutering / spaying</b> is the process of removing your pet's ability to reproduce. This procedure is carried out by a vet, usually when the animal is young.`} 
                                    openTooltip={openTooltip} 
                                    setOpenTooltip={setOpenTooltip} 
                                />
                            </div>
                            <div className="mb-4">
                                <RadioGroup
                                    name="petNeutered"
                                    options={[
                                        { label: "Yes", value: "yes" },
                                        { label: "No", value: "no" },
                                    ]}
                                    selectedValue={formData.petNeutered}
                                    onChange={(value) => handleRadioChange("petNeutered", value)}
                                    error={errors.petNeutered}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-4 relative">
                                <label className="block font-[600]">How much did you pay or donate for your pet?</label>
                                <LabelTooltip 
                                    id="tooltip-hmpay" 
                                    content={`<b>Neutering / spaying</b> is the process of removing your pet's ability to reproduce. This procedure is carried out by a vet, usually when the animal is young.`} 
                                    openTooltip={openTooltip} 
                                    setOpenTooltip={setOpenTooltip} 
                                />
                            </div>
                            <TextInput
                                name="petCost"
                                value={formData.petCost}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                error={errors.petCost}
                                allowOnly="number"
                                icon={
                                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.00009 2C5.21883 2 3.60009 3.6394 3.60009 5.88889C3.60009 8.1384 5.21883 9.7778 7.00009 9.7778H8.56933C9.12162 9.7778 9.56932 10.2255 9.56932 10.7778C9.56932 11.3301 9.12162 11.7778 8.56933 11.7778H6.1761C5.70289 12.9104 5.12988 14.0387 4.45176 15.0349C4.22446 15.3688 3.98201 15.6929 3.72381 16H10.4946C10.4981 15.9999 10.5065 15.9997 10.5194 15.9991C10.5454 15.9979 10.5891 15.9951 10.6469 15.9891C10.7636 15.977 10.9317 15.9523 11.1241 15.9024C11.5189 15.8 11.9523 15.6089 12.2802 15.2688C12.6636 14.8713 13.2967 14.8598 13.6942 15.2431C14.0918 15.6265 14.1033 16.2595 13.7199 16.6571C13.0479 17.3541 12.2312 17.6815 11.626 17.8384C11.3184 17.9181 11.0491 17.9582 10.8532 17.9785C10.7313 17.993 10.567 17.9989 10.5001 18H1.00009C0.539063 18 0.137783 17.6848 0.028563 17.2369C-0.080656 16.789 0.130493 16.3245 0.539783 16.1122C1.33734 15.6987 2.09893 14.9372 2.79843 13.9095C3.23707 13.2651 3.63516 12.5398 3.99044 11.7778H1.00009C0.447813 11.7778 9.69823e-05 11.3301 9.69823e-05 10.7778C9.69823e-05 10.2255 0.447813 9.7778 1.00009 9.7778H2.94465C2.10044 8.7256 1.60009 7.3517 1.60009 5.88889C1.60009 2.73826 3.92126 0 7.00009 0C10.0789 0 12.4001 2.73826 12.4001 5.88889C12.4001 6.44117 11.9524 6.88889 11.4001 6.88889C10.8478 6.88889 10.4001 6.44117 10.4001 5.88889C10.4001 3.6394 8.78136 2 7.00009 2Z" fill="#8C92A2"/>
                                    </svg>
                                }
                                onBlur={() => handleBlur("petCost", formData.petCost)}
                            />
                        </div>
                        {/* 
                        <div>
                            <label className="block">Is your pet a boy or a girl?</label>
                            
                            <select
                                name="petGender"
                                value={formData.petGender}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.petGender ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Boy">Boy</option>
                                <option value="Girl">Girl</option>
                            </select>
                            {errors.petGender && <p className="text-red-500 text-sm">{errors.petGender}</p>}
                        </div>
                        <div>
                            <label className="block">How old is your pet?</label>
                            <input
                                type="text"
                                name="petAge"
                                value={formData.petAge}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.petAge ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.petAge && <p className="text-red-500 text-sm">{errors.petAge}</p>}
                        </div>
                        <div>
                            <label className="block">What breed is your pet?</label>
                            <select
                                name="petBreed"
                                value={formData.petBreed}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.petBreed ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Pedigree">Pedigree</option>
                                <option value="Crossbreed">Crossbreed</option>
                                <option value="Mixed Breed">Mixed Breed</option>
                                <option value="Don’t know">Don’t know</option>
                            </select>
                            {errors.petBreed && <p className="text-red-500 text-sm">{errors.petBreed}</p>}
                        </div>
                        <div>
                            <label className="block">What size will your pet be when fully grown?</label>
                            <select
                                name="petSize"
                                value={formData.petSize}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.petSize ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Small">Small (Up to 10 kg)</option>
                                <option value="Medium">Medium (10 - 20 kg)</option>
                                <option value="Large">Large (Over 20 kg)</option>
                            </select>
                            {errors.petSize && <p className="text-red-500 text-sm">{errors.petSize}</p>}
                        </div>
                        <div>
                            <label className="block">Has your pet been chipped?</label>
                            <select
                                name="petChipped"
                                value={formData.petChipped}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.petChipped ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {errors.petChipped && <p className="text-red-500 text-sm">{errors.petChipped}</p>}
                        </div>
                        <div>
                            <label className="block">Are your pet’s vaccinations up to date?</label>
                            <select
                                name="petVaccinations"
                                value={formData.petVaccinations}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.petVaccinations ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {errors.petVaccinations && <p className="text-red-500 text-sm">{errors.petVaccinations}</p>}
                        </div>
                        <div>
                            <label className="block">Has your pet been neutered/spayed?</label>
                            <select
                                name="petNeutered"
                                value={formData.petNeutered}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.petNeutered ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {errors.petNeutered && <p className="text-red-500 text-sm">{errors.petNeutered}</p>}
                        </div>
                        <div>
                            <label className="block">How much did you pay or donate for your pet?</label>
                            <input
                                type="text"
                                name="petCost"
                                value={formData.petCost}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.petCost ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.petCost && <p className="text-red-500 text-sm">{errors.petCost}</p>}
                        </div>
                        <div>
                            <label className="block">Do you want to cover any pre-existing medical conditions for your pet?</label>
                            <select
                                name="preExistingConditions"
                                value={formData.preExistingConditions}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.preExistingConditions ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {errors.preExistingConditions && <p className="text-red-500 text-sm">{errors.preExistingConditions}</p>}
                        </div> */}
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Your Policy</h2>
                        <div>
                            <label className="block">What would you like to cover your pet for?</label>
                            <select
                                name="coverType"
                                value={formData.coverType}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.coverType ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Accidents only">Accidents only</option>
                                <option value="Accidents and illnesses">Accidents and illnesses</option>
                            </select>
                            {errors.coverType && <p className="text-red-500 text-sm">{errors.coverType}</p>}
                        </div>
                        <div>
                            <label className="block">If your pet became ill, would you want to cover vet fees for treatments lasting longer than a year?</label>
                            <select
                                name="longTermTreatment"
                                value={formData.longTermTreatment}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.longTermTreatment ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {errors.longTermTreatment && <p className="text-red-500 text-sm">{errors.longTermTreatment}</p>}
                        </div>
                        <div>
                            <label className="block">Would you like your pet’s treatment to be covered every year for as long as care is needed?</label>
                            <select
                                name="ongoingCosts"
                                value={formData.ongoingCosts}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded ${errors.ongoingCosts ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {errors.ongoingCosts && <p className="text-red-500 text-sm">{errors.ongoingCosts}</p>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Your Summary</h2>
                        <p>Pet Name: {formData.petName}</p>
                        <p>Pet Gender: {formData.petGender}</p>
                        <p>Pet Age: {formData.petAge}</p>
                        <p>Pet Breed: {formData.petBreed}</p>
                        <p>Pet Size: {formData.petSize}</p>
                        <p>Pet Chipped: {formData.petChipped}</p>
                        <p>Pet Vaccinations: {formData.petVaccinations}</p>
                        <p>Pet Neutered/Spayed: {formData.petNeutered}</p>
                        <p>Pet Cost: {formData.petCost}</p>
                        <p>Pre-existing Conditions: {formData.preExistingConditions}</p>
                        <p>Cover Type: {formData.coverType}</p>
                        <p>Long Term Treatment: {formData.longTermTreatment}</p>
                        <p>Ongoing Costs: {formData.ongoingCosts}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className='main-content flex-1 pt-[32px] lg:pt-[64px]'>
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-10 gap-8 xl:gap-[80px]">
                        {/* <div className="bg-red-500 text-white col-span-3 p-4">1</div> */}
                        <div className="col-span-7">
                            <div className="grid grid-cols-1 lg:grid-cols-11 lg:gap-[24px]">
                                <div className="col-span-3">
                                    {/* Progress Tabs */}
                                    <div className="flex items-center text-[16px] flex-col justify-center w-max">
                                        {/* Step 1 */}
                                        <div className="flex items-center flex-col relative">
                                            <div className="absolute top-1 left-full ml-4 w-max">
                                                <h6 className={`font-[500 ${step === 1
                                                        ? "text-black" // Current step
                                                        : step > 1
                                                            ? "text-[#0D7270]" // Completed step
                                                            : "text-gray-400" // Default step
                                                    }`}
                                                >Your pet</h6>
                                            </div>
                                            <div className={`w-7 h-7 shrink-0 mx-[-1px] border-[3px]  flex items-center justify-center rounded-full ${step === 1
                                                        ? "border-[#C7D2E5] bg-primary" // Current step
                                                        : step > 1
                                                            ? "border-[#CFE3E2] bg-[#0D7270]" // Completed step
                                                            : "bg-gray-200 border-[#C7D2E5]" // Default step
                                                    }`}
                                            >
                                                {step === 1 ? (
                                                    <>
                                                        <span className="w-[10px] h-[10px] bg-white rounded-full transition-all ease-in-out duration-1000"></span>
                                                    </>
                                                ) : step > 1 ? (
                                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="13" cy="13" r="11.5" fill="#0D7270" stroke="#0D7270" strokeWidth="3" />
                                                        <path d="M9.25 12.5L12.0625 15.5L16.75 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                ) : (
                                                    <>
                                                        <span className="w-[10px] h-[10px] bg-white rounded-full transition-all ease-in-out duration-1000"></span>
                                                    </>
                                                )}
                                            </div>
                                            {step === 1 ? (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            ) : step > 1 ? (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            )}
                                        </div>
                                        {/* Step 2 */}
                                        <div className="flex items-center flex-col relative">
                                            <div className="absolute top-1 left-full ml-4 w-max">
                                                <h6 className={`font-[500 ${step === 2
                                                        ? "text-black" // Current step
                                                        : step > 2
                                                            ? "text-[#0D7270]" // Completed step
                                                            : "text-gray-400" // Default step
                                                    }`}
                                                >Your policy</h6>
                                            </div>
                                            <div className={`w-7 h-7 shrink-0 mx-[-1px] border-[3px]  flex items-center justify-center rounded-full ${step === 2
                                                        ? "border-[#C7D2E5] bg-primary" // Current step
                                                        : step > 2
                                                            ? "border-[#CFE3E2] bg-[#0D7270]" // Completed step
                                                            : "bg-gray-200 border-[#C7D2E5]" // Default step
                                                    }`}
                                            >
                                                {step === 2 ? (
                                                    <>
                                                        <span className="w-[10px] h-[10px] bg-white rounded-full transition-all ease-in-out duration-1000"></span>
                                                    </>
                                                ) : step > 2 ? (
                                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="13" cy="13" r="11.5" fill="#0D7270" stroke="#0D7270" strokeWidth="3" />
                                                        <path d="M9.25 12.5L12.0625 15.5L16.75 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                ) : (
                                                    <>
                                                        <span className="w-[10px] h-[10px] bg-white rounded-full transition-all ease-in-out duration-1000"></span>
                                                    </>
                                                )}
                                            </div>
                                            {step === 2 ? (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            ) : step > 2 ? (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            )}
                                        </div>
                                        {/* Step 3 */}
                                        <div className="flex items-center flex-col relative">
                                            <div className="absolute top-1 left-full ml-4 w-max">
                                                <h6 className={`font-[500 ${step === 3
                                                        ? "text-black" // Current step
                                                        : step > 3
                                                            ? "text-[#0D7270]" // Completed step
                                                            : "text-gray-400" // Default step
                                                    }`}
                                                >Your details</h6>
                                            </div>
                                            <div className={`w-7 h-7 shrink-0 mx-[-1px] border-[3px]  flex items-center justify-center rounded-full ${step === 3
                                                        ? "border-[#C7D2E5] bg-primary" // Current step
                                                        : step > 3
                                                            ? "border-[#CFE3E2] bg-[#0D7270]" // Completed step
                                                            : "bg-gray-200 border-[#C7D2E5]" // Default step
                                                    }`}
                                            >
                                                {step === 3 ? (
                                                    <>
                                                        <span className="w-[10px] h-[10px] bg-white rounded-full transition-all ease-in-out duration-1000"></span>
                                                    </>
                                                ) : step > 3 ? (
                                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="13" cy="13" r="11.5" fill="#0D7270" stroke="#0D7270" strokeWidth="3" />
                                                        <path d="M9.25 12.5L12.0625 15.5L16.75 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                ) : (
                                                    <>
                                                        <span className="w-[10px] h-[10px] bg-white rounded-full transition-all ease-in-out duration-1000"></span>
                                                    </>
                                                )}
                                            </div>
                                            {step === 3 ? (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            ) : step > 3 ? (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            )}
                                        </div>
                                        {/* Step 4 */}
                                        <div className="flex items-center flex-col relative">
                                            <div className="absolute top-1 left-full ml-4 w-max">
                                                <h6 className={`font-[500 ${step === 4
                                                        ? "text-black" // Current step
                                                        : step > 4
                                                            ? "text-[#0D7270]" // Completed step
                                                            : "text-gray-400" // Default step
                                                    }`}
                                                >Your summary</h6>
                                            </div>
                                            <div className={`w-7 h-7 shrink-0 mx-[-1px] border-[3px]  flex items-center justify-center rounded-full ${step === 4
                                                        ? "border-[#C7D2E5] bg-primary" // Current step
                                                        : step > 4
                                                            ? "border-[#CFE3E2] bg-[#0D7270]" // Completed step
                                                            : "bg-gray-200 border-[#C7D2E5]" // Default step
                                                    }`}
                                            >
                                                {step === 4 ? (
                                                    <>
                                                        <span className="w-[10px] h-[10px] bg-white rounded-full transition-all ease-in-out duration-1000"></span>
                                                    </>
                                                ) : step > 4 ? (
                                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="13" cy="13" r="11.5" fill="#0D7270" stroke="#0D7270" strokeWidth="3" />
                                                        <path d="M9.25 12.5L12.0625 15.5L16.75 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                ) : (
                                                    <>
                                                        <span className="w-[10px] h-[10px] bg-white rounded-full transition-all ease-in-out duration-1000"></span>
                                                    </>
                                                )}
                                            </div>
                                            {/* {step === 3 ? (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            ) : step > 3 ? (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-0.5 h-[20px] bg-[#C7D2E5]"></div>
                                                </>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-8">
                                    <AlertBox type="info" title="Honesty is the best policy">
                                        <p>
                                            Pet insurance is designed to cover unforeseen events in the future, not existing issues. This means it won’t provide coverage for pre-existing conditions, including known medical issues, illnesses, or injuries your pet already has. For coverage of conditions your pet is already dealing with, you’ll need to reach out to a specialist provider.
                                        </p>
                                    </AlertBox>
                                    {/* Form Content */}
                                    <div className="StepForm">
                                        {renderFormStep()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <Card
                                cardImage={CustomSVG} // Pass SVG function
                                title="Lower prices often mean low-quality coverage"
                                // contentImage="https://via.placeholder.com/250"
                                cardContent={[
                                    "Pet insurance policies are varied and designed to meet different needs. It's crucial to review and understand the specifics of your policy."
                                ]}
                                // listItems={["Mars Exploration", "Moon Base", "Satellite Technology"]}
                                link="https://www.nasa.gov"
                            />
                            <Accordion />
                        </div>
                    </div>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className="footer py-4">
                <div className="container">
                    <div className="flex justify-between">
                        {/* {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="bg-gray-500 text-white p-2 rounded"
                            >
                                Back
                            </button>
                        )}
                        {step < 3 && (
                            <button
                                onClick={nextStep}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Continue
                            </button>
                        )}
                        {step === 3 && (
                            <button
                                onClick={() => alert("Form Submitted!")}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Submit
                            </button>
                        )} */}
                        <div>
                            {step > 1 ? (
                                <Button
                                    onClick={prevStep}
                                    variant="secondary"
                                    className=" cursor-pointer "
                                >
                                    Back
                                </Button>
                            ) : (
                                <Button
                                    disabled
                                    variant="secondary"
                                    className="disabled:opacity-50 cursor-auto"
                                >
                                    Back
                                </Button>
                            )}
                        </div>
                        <div>
                            <Button onClick={nextStep} variant="primary" className="w-[160px] cursor-pointer">
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultiStepForm;