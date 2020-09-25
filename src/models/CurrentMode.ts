import { PubSub } from './PubSubHook'
import { Mode } from './types'

export class CurrentMode implements PubSub<Mode | undefined> {
    listeners: Function[] = [];
    _value: Mode | undefined;

    get value(): Mode | undefined {
        return this._value
    }

    setValue(value: Mode) {
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

export const currentMode = new CurrentMode();