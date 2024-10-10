import React from "react";

export default function ConfigContent({ children }) {
    return(
        <div className="bg-[rgba(49,78,89,0.2)] rounded-b-[20px] h-[70%] overflow-hidden">
            {children}
        </div>
    )
}