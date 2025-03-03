import React from "react";
import Button from "./Buttons";
const Card = ({ cardImage: CardImage, title, cardContent, contentImage, listItems, link }) => {
    
    return (
        <div className="bg-white rounded-[16px] p-[18px] border mb-[24px] border-gray-200 max-w-sm">
            {/* Card SVG Image (as JSX) */}
            {CardImage && (
                <div className="mb-2">
                    <CardImage /> {/* Render the passed SVG function */}
                </div>
            )}

            {/* Title */}
            <h2 className="text-xl font-bold mb-2">{title}</h2>

            {cardContent.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
            {/* Content Image */}
            {contentImage && (
                <img
                    src={contentImage}
                    alt="Content"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                />
            )}

            {/* List Content */}
            {/* <ul className="text-gray-600 list-disc list-inside space-y-2 mb-4">
                {listItems.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul> */}

            {/* Button */}
            <Button as="a" href={link} target="_blank" variant="secondary" className="w-[215px]">
                Cover types explained
            </Button>
        </div>
    );
};

export default Card;

