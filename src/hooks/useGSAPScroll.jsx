import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

const useGSAPScroll = () => {
    gsap.registerPlugin(ScrollToPlugin);
    return function (position, time = 1, easing = "power1.out") {
        gsap.to(window, {
            duration: time,
            scrollTo: { y: position },
            ease: easing,
        });
    };
};

export default useGSAPScroll;
