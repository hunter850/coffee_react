import gsap from "gsap";

const useGSAPCompute = () => {
    return function (
        toState,
        fromState,
        set,
        time = 0.5,
        easing = "power1.out"
    ) {
        if (
            Object.keys(toState).indexOf("opacity") >= 0 &&
            Object.keys(fromState).indexOf("opacity") === -1
        ) {
            fromState = { ...fromState, opacity: 1 };
        }
        if (
            Object.keys(toState).indexOf("display") >= 0 &&
            Object.keys(fromState).indexOf("display") === -1
        ) {
            fromState = { ...fromState, display: "block" };
        }
        if (
            Object.keys(toState).indexOf("transform") >= 0 &&
            Object.keys(fromState).indexOf("transform") === -1
        ) {
            fromState = { ...fromState, transform: "none" };
        }
        if (
            Object.keys(toState).indexOf("fontSize") >= 0 &&
            Object.keys(fromState).indexOf("fontSize") === -1
        ) {
            fromState = { ...fromState, fontSize: "16px" };
        }
        Object.keys(toState).forEach((k) => {
            if (fromState[k] === undefined) {
                fromState[k] = 0;
            }
        });
        const tempObj = { ...fromState };
        gsap.to(tempObj, { ...toState, duration: time, ease: easing });
        let start;
        function step(timestamp) {
            delete tempObj._gsap;
            if (!start) start = timestamp;
            const progress = timestamp - start;
            set(() => ({ ...tempObj }));
            if (progress < time * 1000) {
                window.requestAnimationFrame(step);
                return;
            }
            set(() => ({ ...fromState, ...toState }));
        }
        window.requestAnimationFrame(step);
    };
};

export default useGSAPCompute;
