import React from 'react';
import { soundEffects } from '../models/sounds';

export const AudioComponent = () => {
    return (
        <div style={{}}>
            {Object.entries(soundEffects).map(([_, val]) => {
                return <div>
                    <audio id={val.name}><source src={val.url} /></audio>
                </div>
            })}
        </div>
    );
}
