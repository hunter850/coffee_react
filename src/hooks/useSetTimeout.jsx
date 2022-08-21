import { useRef, useCallback, useEffect } from "react";

const useSetTimeout = () => {
    const flagRef = useRef(null);
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
            (function step(timestamp) {
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
            })();
        }, []),
        useCallback(() => {
            cancelAnimationFrame(flagRef.current);
        }, []),
    ];
};

export default useSetTimeout;
