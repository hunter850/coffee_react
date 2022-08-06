import { useState, useEffect, useRef } from "react";

const useIsInRestore = (ref, num = 0) => {
    const [isIn, setIsIn] = useState(false);
    const [isOut, setIsOut] = useState(true);
    const isOutMounted = useRef(false);
    const isInMounted = useRef(false);
    const [isOutListened, setIsOutListened] = useState(false);
    const [isInListened, setIsInListened] = useState(false);
    useEffect(() => {
        if (ref.current) {
            if (
                ref.current.offsetTop -
                    window.pageYOffset -
                    window.innerHeight +
                    num <=
                0
            ) {
                setIsIn(true);
            } else {
                setIsIn(false);
            }
            if (
                ref.current.offsetTop -
                    window.pageYOffset -
                    window.innerHeight <=
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
                ref.current.offsetTop -
                    window.pageYOffset -
                    window.innerHeight <=
                0
            ) {
                setIsOut(false);
            } else {
                setIsOut(true);
            }
        }
        if (isOutMounted.current) {
            window.addEventListener("scroll", checkIsOut);
        } else {
            isOutMounted.current = true;
            setIsOutListened(!isOutListened);
        }
        return () => window.removeEventListener("scroll", checkIsOut);
    }, [ref, num, isOutListened]);
    useEffect(() => {
        function check() {
            if (ref.current) {
                if (
                    ref.current.offsetTop -
                        window.pageYOffset -
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
        if (isInMounted.current) {
            window.addEventListener("scroll", check);
        } else {
            isInMounted.current = true;
            setIsInListened(!isInListened);
        }
        return () => window.removeEventListener("scroll", check);
    }, [ref, num, isOut, isInListened]);
    return isIn;
};

export default useIsInRestore;
