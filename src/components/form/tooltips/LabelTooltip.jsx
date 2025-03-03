import React, { useState } from "react";
import Tooltip from "../../Tooltip";

const LabelTooltip = ({ id, content, openTooltip, setOpenTooltip }) => {
    return (
      <Tooltip
        id={id}
        content={content}
        isOpen={openTooltip === id}
        setOpenTooltip={setOpenTooltip}
        position="right"
      >
        <button className="p-0 m-0 flex">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9Z" stroke="#8C92A2" strokeWidth="1.6"/>
            <path d="M9.19502 12.5556V9.00007C9.19502 8.62295 9.19502 8.43439 9.07786 8.31723C8.9607 8.20007 8.77214 8.20007 8.39502 8.20007" stroke="#8C92A2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.99447 5.79993H9.00166" stroke="#8C92A2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </Tooltip>
    );
  };
  
  export default LabelTooltip;
