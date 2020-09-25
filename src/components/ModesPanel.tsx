import React from "react";
import { MicrowaveButton } from './MicrowaveButton'
import { currentMicrowave } from '../models/CurrentMicrowave'
import { currentMode } from '../models/CurrentMode'
import { PubSubHook } from '../models/PubSubHook'
import { timer } from '../models/Timer'

export const ModesPanel = () => {
    let { value: microwave } = PubSubHook(currentMicrowave);
    let { setValue: setMode } = PubSubHook(currentMode);

    let rows: any[] = [];
    let currentRow: any[] = []
    rows.push(currentRow)

    let i = 0
    for (let mode of microwave.modes) {
        currentRow.push(
            <MicrowaveButton onClick={() => {
                setMode(mode);
                timer.start(mode);
            }}>
                <span>{mode.name}</span>
            </MicrowaveButton>
        )
        i++
        if (i === 3) {
            currentRow = [];
            rows.push(currentRow);
            i = 0;
        }
    }

    return <>
        {rows.map((item) => {
            return <div className="control-row">
                {item}
            </div>
        })}
    </>
}