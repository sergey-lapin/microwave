import { PubSub } from './PubSubHook'
import { MicroWaveType } from './types'
import { microWaveTypes } from './drivers';

export class CurrentMicrowave implements PubSub<MicroWaveType> {
    listeners: Function[] = [];
    _value: MicroWaveType = microWaveTypes[0];

    get value(): MicroWaveType {
        return this._value
    }

    setValue(value: MicroWaveType) {
        this._value = value;
        this.notifyAll();
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
}

export const currentMicrowave = new CurrentMicrowave();