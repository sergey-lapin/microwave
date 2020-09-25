import React from "react";
import './MicrowaveButton.css'

export const MicrowaveButton = ({ children, onClick }: { children: any, onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) }) => {
    return <div className="button" onClick={onClick}>
        {children}
    </div>
}