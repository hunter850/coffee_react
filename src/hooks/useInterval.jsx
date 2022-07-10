import { useCallback, useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef();
    const start = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        (function step(timestamp) {
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
            timeoutRef.current = requestAnimationFrame(step);
        })();
    }, [delay]);

    const clear = useCallback(() => {
        timeoutRef.current && cancelAnimationFrame(timeoutRef.current);
        start.current = null;
    }, []);

    // useEffect(() => {
    //     set();
    //     return clear;
    // }, [delay, set, clear]);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    return [reset, clear];
};

export default useInterval;
