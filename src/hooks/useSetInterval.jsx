import { useRef } from "react";

const useSetInterval = () => {
    const animationRef = useRef(null);

    return [
        function interval(cb, time) {
            let start;
            (function step(timestamp) {
                if (!start) {
                    start = timestamp;
                    animationRef.current = window.requestAnimationFrame(step);
                    return;
                }
                const progress = timestamp - start;
                if (progress < time) {
                    animationRef.current = window.requestAnimationFrame(step);
                    return;
                }
                cb();
                interval(cb, time);
            })();
        },
        function () {
            cancelAnimationFrame(animationRef.current);
        },
    ];
};

export default useSetInterval;
