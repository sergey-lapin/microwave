import { PubSub } from './PubSubHook'
import { dingEffect, fireAmbient } from './sounds'
import { Mode } from './types'

export class Timer implements PubSub<number> {
    on: boolean;
    timerValue: number;
    interval: any;
    listeners: Function[] = [];
    ambient: HTMLAudioElement | null = null;

    constructor() {
        this.on = false;
        this.timerValue = 0;
    }

    get isOn() {
        return true;
    }

    get value() {
        return this.timerValue;
    }

    setValue = (seconds: number) => {
        this.timerValue = seconds;
        this.notifyAll();
    }

    private minusOne = () => {
        if (this.timerValue === 0) {
            this.stop();
            return
        }

        this.setValue(this.timerValue - 1);
    }

    private add30Seconds = () => {
        this.setValue(this.timerValue + 30)
    }

    private notifyAll() {
        for (let listener of this.listeners) {
            listener(this.value)
        }
    }

    subscribe(cb: Function) {
        this.listeners.push(cb);
    }

    unsubscribe(cb: Function) {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] === cb) {
                this.listeners.splice(0, i);
            }
        }
    }

    removeAmbient() {
        if (this.ambient) {
            this.ambient.pause();
            this.ambient.currentTime = 0;
            this.ambient.removeEventListener("ended", this.onAmbientEnded);
            this.ambient = null;
        }
    }

    onAmbientEnded = () => {
        if (this.ambient) {
            this.ambient.play();
        }
    }

    clean() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.removeAmbient();
    }

    start = (mode?: Mode) => {
        this.clean();

        this.interval = setInterval(this.minusOne, 1000);
        if (mode) {
            this.removeAmbient();
            this.ambient = new Audio(mode.ambient.url);
            this.ambient.play();
            this.ambient.addEventListener("ended", this.onAmbientEnded);

            this.setValue(mode.timer)
        } else {
            this.removeAmbient();
            this.ambient = new Audio(fireAmbient.url);
            this.ambient.play();
            this.ambient.addEventListener("ended", this.onAmbientEnded);
            this.add30Seconds();
        }

        this.on = true;
    }

    stop = () => {
        this.clean();

        this.setValue(0);
        this.on = false;

        let audio = new Audio(dingEffect.url);
        audio.play();
    }
}

export const timer = new Timer();