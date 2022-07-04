const useSetAnimation = () => {
    return function(cb, time) {
        let start;
        (function step(timestamp) {
            if (!start) {
                start = timestamp;
                window.requestAnimationFrame(step);
                return;
            }
            const progress = timestamp - start;
            if(progress < time) {
                window.requestAnimationFrame(step);
                return;
            }
            cb();
        })();
    }
}

export default useSetAnimation