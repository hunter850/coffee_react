import { useCallback } from "react";

const useSetNow = () => {
    return useCallback((cb) => {
        let start;
        let ani;
        (function step(timestamp) {
            if (!start) {
                start = timestamp;
                ani = window.requestAnimationFrame(step);
                return;
            }
            const progress = timestamp - start;
            if (progress < 20) {
                window.requestAnimationFrame(step);
                return;
            }
            cb();
            cancelAnimationFrame(ani);
        })();
    }, []);
};

export default useSetNow;
