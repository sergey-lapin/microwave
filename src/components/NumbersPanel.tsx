import React from "react";

export const NumbersPanel = ({ onStopClick, onStartClick }: { onStopClick: Function, onStartClick: Function }) => {
    return <>
        <div className="control-row no-border">
            <div className="button" onClick={() => {
                onStopClick()
            }}>
                <span>stop<br /><span className="smallText">cancel</span></span>
            </div>
            <div className="button" onClick={() => {
                onStartClick()
            }}>
                <span>start <br /><span className="smallText">+ 30 sec</span></span>
            </div>
        </div>
    </>
}