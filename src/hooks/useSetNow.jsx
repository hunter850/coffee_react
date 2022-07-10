const useSetNow = () => {
    return function (cb) {
        let start;
        let ani;
        (function step(timestamp) {
            if (!start) {
                start = timestamp;
                ani = window.requestAnimationFrame(step);
                return;
            }
            cb();
            cancelAnimationFrame(ani);
        })();
    };
};

export default useSetNow;
