import { useCallback, useEffect, useRef } from "react";

const useTimeout = (callback, delay) => {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef();
    const start = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const step = useCallback(
        (timestamp) => {
            if (!start.current) {
                start.current = timestamp;
                timeoutRef.current = requestAnimationFrame(step);
                return;
            }
            const progress = timestamp - start.current;
            if (progress < delay) {
                timeoutRef.current = requestAnimationFrame(step);
                return;
            }
            callbackRef.current();
            start.current = null;
        },
        [delay]
    );
    const set = useCallback(() => {
        timeoutRef.current = requestAnimationFrame(step);
    }, [step]);

    const clear = useCallback(() => {
        timeoutRef.current && cancelAnimationFrame(timeoutRef.current);
        start.current = null;
    }, []);

    // useEffect(() => {
    //     set();
    //     return clear;
    // }, [delay, set, clear]);

    const restart = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    return [restart, clear];
};

export default useTimeout;
