import { useRef, useCallback, useEffect } from "react";

const useSetTimeout = () => {
    const flagRef = useRef(null);
    const canRunRef = useRef(true);
    useEffect(() => {
        return () => {
            if (flagRef !== null) {
                cancelAnimationFrame(flagRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [
        useCallback((callback, tick, start) => {
            canRunRef.current = true;
            (function step(timestamp) {
                if (canRunRef.current) {
                    if (!start) {
                        start = timestamp;
                        flagRef.current = window.requestAnimationFrame(step);
                        return;
                    }
                    const progress = timestamp - start;
                    if (progress < tick) {
                        flagRef.current = window.requestAnimationFrame(step);
                        return;
                    }
                    callback();
                }
            })();
        }, []),
        useCallback(() => {
            canRunRef.current = false;
            cancelAnimationFrame(flagRef.current);
        }, []),
    ];
};

export default useSetTimeout;
