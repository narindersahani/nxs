
import { useState } from "react";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="mb-2">
            {/* Accordion Header */}
            <button
                className="w-full cursor-pointer text-[#000] flex justify-between items-center py-[10px] text-left font-medium text-lg transition"
                onClick={onClick}
            >
                {title}
                <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#F4F4F6" />
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#DDDFE3" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5998 7.8C12.5998 7.35817 12.2416 7 11.7998 7C11.3579 7 10.9998 7.35817 10.9998 7.8V11L7.79976 11C7.35793 11 6.99976 11.3582 6.99976 11.8C6.99976 12.2418 7.35793 12.6 7.79976 12.6H10.9998V15.8C10.9998 16.2418 11.3579 16.6 11.7998 16.6C12.2416 16.6 12.5998 16.2418 12.5998 15.8V12.6L15.7998 12.6C16.2416 12.6 16.5998 12.2418 16.5998 11.8C16.5998 11.3582 16.2416 11 15.7998 11H12.5998V7.8Z" fill="#5D616C" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#F4F4F6" />
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#DDDFE3" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5998 7.8C12.5998 7.35817 12.2416 7 11.7998 7C11.3579 7 10.9998 7.35817 10.9998 7.8V11L7.79976 11C7.35793 11 6.99976 11.3582 6.99976 11.8C6.99976 12.2418 7.35793 12.6 7.79976 12.6H10.9998V15.8C10.9998 16.2418 11.3579 16.6 11.7998 16.6C12.2416 16.6 12.5998 16.2418 12.5998 15.8V12.6L15.7998 12.6C16.2416 12.6 16.5998 12.2418 16.5998 11.8C16.5998 11.3582 16.2416 11 15.7998 11H12.5998V7.8Z" fill="#5D616C" />
                        </svg>
                    )
                    }
                </span>
            </button>

            {/* Accordion Content */}
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 py-4" : "max-h-0"}`}>
                {content.map((item, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                        {item.type === "paragraph" && <p className="text-gray-700">{item.text}</p>}
                        {item.type === "list" && (
                            <ul className="list-disc list-inside text-gray-700">
                                {item.items.map((listItem, i) => (
                                    <li key={i}>{listItem}</li>
                                ))}
                            </ul>
                        )}
                        {item.type === "image" && (
                            <img src={item.src} alt={item.alt} className="mt-2 w-full max-w-xs hidden" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Accordion = () => {
    const items = [
        {
            title: "What is Tailwind CSS?",
            content: [
                { type: "paragraph", text: "Tailwind is a utility-first CSS framework." },
                { type: "paragraph", text: "It helps you build modern UI without writing custom CSS." },
                { type: "list", items: ["Fast styling", "Responsive design", "Customizable"] },
                { type: "image", src: "https://via.placeholder.com/300", alt: "Tailwind Example" },
            ],
        },
        {
            title: "Why use React with Tailwind?",
            content: [
                { type: "paragraph", text: "React and Tailwind work well together for styling components." },
                { type: "list", items: ["Utility classes", "Component reusability", "Minimal CSS files"] },
                { type: "image", src: "https://via.placeholder.com/300", alt: "React + Tailwind" },
            ],
        },
        {
            title: "Is Tailwind good for mobile apps?",
            content: [
                { type: "paragraph", text: "Yes! Tailwind is designed with mobile-first utilities." },
                { type: "list", items: ["Easy breakpoints", "Flexible layouts", "Optimized for speed"] },
                { type: "image", src: "https://via.placeholder.com/300", alt: "Mobile UI" },
            ],
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="max-w-lg mb-3">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
        </div>
    );
};

export default Accordion;


//if you want to keep open already open item 
// import { useState } from "react";

// const AccordionItem = ({ title, content, isOpen, onClick }) => {
//   return (
//     <div className="border-b border-gray-300">
//       {/* Accordion Header */}
//       <button
//         className="w-full flex justify-between items-center p-4 text-left font-medium text-lg bg-gray-100 hover:bg-gray-200 transition"
//         onClick={onClick}
//       >
//         {title}
//         <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
//           ▼
//         </span>
//       </button>

//       {/* Accordion Content */}
//       <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 p-4" : "max-h-0"}`}>
//         {content.map((item, index) => (
//           <div key={index} className="mb-2 last:mb-0">
//             {item.type === "paragraph" && <p className="text-gray-700">{item.text}</p>}
//             {item.type === "list" && (
//               <ul className="list-disc list-inside text-gray-700">
//                 {item.items.map((listItem, i) => (
//                   <li key={i}>{listItem}</li>
//                 ))}
//               </ul>
//             )}
//             {item.type === "image" && (
//               <img src={item.src} alt={item.alt} className="mt-2 rounded-lg shadow-md w-full max-w-xs" />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Accordion = () => {
//   const items = [
//     {
//       title: "What is Tailwind CSS?",
//       content: [
//         { type: "paragraph", text: "Tailwind is a utility-first CSS framework." },
//         { type: "list", items: ["Fast styling", "Responsive design", "Customizable"] },
//         { type: "image", src: "https://via.placeholder.com/300", alt: "Tailwind Example" },
//       ],
//     },
//     {
//       title: "Why use React with Tailwind?",
//       content: [
//         { type: "paragraph", text: "React and Tailwind work well together for styling components." },
//         { type: "list", items: ["Utility classes", "Component reusability", "Minimal CSS files"] },
//         { type: "image", src: "https://via.placeholder.com/300", alt: "React + Tailwind" },
//       ],
//     },
//     {
//       title: "Is Tailwind good for mobile apps?",
//       content: [
//         { type: "paragraph", text: "Yes! Tailwind is designed with mobile-first utilities." },
//         { type: "list", items: ["Easy breakpoints", "Flexible layouts", "Optimized for speed"] },
//         { type: "image", src: "https://via.placeholder.com/300", alt: "Mobile UI" },
//       ],
//     },
//   ];

//   const [openIndexes, setOpenIndexes] = useState([]);

//   const toggleItem = (index) => {
//     setOpenIndexes((prevIndexes) =>
//       prevIndexes.includes(index)
//         ? prevIndexes.filter((i) => i !== index) // Close if already open
//         : [...prevIndexes, index] // Open if closed
//     );
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-6 border border-gray-300 rounded-lg p-4">
//       {items.map((item, index) => (
//         <AccordionItem
//           key={index}
//           title={item.title}
//           content={item.content}
//           isOpen={openIndexes.includes(index)}
//           onClick={() => toggleItem(index)}
//         />
//       ))}
//     </div>
//   );
// };

// export default Accordion;
