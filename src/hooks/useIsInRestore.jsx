import { useState, useEffect } from "react";

const useIsInRestore = (ref, num = 0) => {
    const [isIn, setIsIn] = useState(false);
    const [isOut, setIsOut] = useState(true);
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
            if (
                ref.current.getBoundingClientRect().top - window.innerHeight <=
                0
            ) {
                setIsOut(false);
            } else {
                setIsOut(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        function checkIsOut() {
            if (
                ref.current.getBoundingClientRect().top - window.innerHeight <=
                0
            ) {
                setIsOut(false);
            } else {
                setIsOut(true);
            }
        }
        window.addEventListener("scroll", checkIsOut);
        return () => window.removeEventListener("scroll", checkIsOut);
    }, [ref, num]);
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
                    if (isOut) {
                        setIsIn(false);
                    }
                }
            }
        }
        window.addEventListener("scroll", check);
        return () => window.removeEventListener("scroll", check);
    }, [ref, num, isOut]);
    return isIn;
};

export default useIsInRestore;
