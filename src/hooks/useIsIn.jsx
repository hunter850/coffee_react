import { useState, useEffect } from "react";

const useIsIn = (ref, num = 0) => {
    const [isIn, setIsIn] = useState(false);
    useEffect(() => {
        if (ref.current) {
            if (
                ref.current.getBoundingClientRect().top -
                    window.innerHeight +
                    num <=
                0
            ) {
                setIsIn(true);
            } else {
                setIsIn(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        function check() {
            if (ref.current) {
                if (
                    ref.current.getBoundingClientRect().top -
                        window.innerHeight +
                        num <=
                    0
                ) {
                    setIsIn(true);
                } else {
                    setIsIn(false);
                }
            }
        }
        window.addEventListener("scroll", check);
        return () => window.removeEventListener("scroll", check);
    }, [ref, num]);
    return isIn;
};

export default useIsIn;
