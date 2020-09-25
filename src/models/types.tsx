export type Mode = {
    name: string
    color: ColorT,
    speed: number;
    timer: number;
    effect: SoundEffectT,
    ambient: SoundEffectT,
}

export type SoundEffectT = {
    type: 'effect' | 'ambient',
    name: string,
    url: string,
}

export type ColorT = 'red' | 'green'

export type MicroWaveType = {
    name: string,
    title: string,
    modes: Mode[]
}

export type MicrowaveState = {
    isOn: boolean;
    timer?: number;
    modes: Mode[];
}

export interface MicrowaveInstance {
    getModes(): Mode[];
}

export interface Microwave {
    getState(): MicrowaveState
    setTimer(value: number): void;
    start(): void;
    stop(): void;
}
