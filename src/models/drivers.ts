import { Microwave, MicrowaveInstance, MicroWaveType, Mode } from './types'
import * as modes from './modes'

export class BaseMicrowave implements Microwave, MicrowaveInstance {
    isOn: boolean = false;
    timer?: number;
    getState() {
        return {
            isOn: this.isOn,
            timer: this.timer,
            modes: this.getModes()
        }
    }

    getModes(): Mode[] {
        return []
    }

    setTimer(value: number) {
        this.timer = value;
    }

    start() {
        this.isOn = true;
    }

    stop() {
        this.isOn = false;
    }
}

let fireMicroWave: MicroWaveType = {
    name: 'fire',
    title: 'Fire',
    modes: [
        modes.cook,
        modes.timer
    ]
}

let daewooMicroWave: MicroWaveType = {
    name: 'daewoo',
    title: 'Daewoo',
    modes: [
        modes.cook,
        modes.timer,
        modes.clock,
        modes.popcorn,
        modes.beverage,
        modes.reheat,
        modes.defrost,
        modes.power,
    ]
}

let t1000MicroWave: MicroWaveType = {
    name: 't1000',
    title: 'T1000',
    modes: [
        modes.cook,
        modes.timer
    ]
}

export let microWaveTypes: MicroWaveType[] = [
    fireMicroWave,
    daewooMicroWave,
    t1000MicroWave
]

