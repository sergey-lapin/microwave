import React from "react";

export interface PubSub<T> {
    readonly value: T;
    setValue(a: T): void;
    subscribe(cb: Function): void;
    unsubscribe(cb: Function): void;
}

export function PubSubHook<T>(pubSub: PubSub<T>): { value: T, setValue: (a: T) => void } {
    let [value, setValue] = React.useState<T>(pubSub.value);

    let handler = (newValue: T) => {
        setValue(newValue)
    }

    React.useLayoutEffect(() => {
        pubSub.setValue(value);
    }, [value])

    React.useEffect(() => {
        pubSub.subscribe(handler)
        return () => {
            pubSub.unsubscribe(handler);
        }
    }, []);

    return { value, setValue: handler };
}