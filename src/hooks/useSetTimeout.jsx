import { useRef } from "react";

const useSetTimeout = () => {
    const animationRef = useRef(null);

    return [
        function (cb, time) {
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
            })();
        },
        function () {
            cancelAnimationFrame(animationRef.current);
        },
    ];
};

export default useSetTimeout;
