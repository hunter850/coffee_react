import { useState, useEffect } from "react";
import isInWindow from "../js/isInWindow";
import { throttle } from "lodash";

function useShouldEnterBothSides(ref, offsetStart, offsetEnd) {
    const [isIn, setIsIn] = useState(false);
    useEffect(() => {
        let start = offsetStart;
        let end = offsetEnd;
        if (typeof offsetStart === "function") {
            start = offsetStart(ref.current);
        }
        if (typeof offsetEnd === "function") {
            end = offsetEnd(ref.current);
        }
        setIsIn(isInWindow(ref.current, start, end));
        function scrollHandler() {
            setIsIn((pre) => {
                // 若已進場 又移出視窗外 則退場
                if (pre && !isInWindow(ref.current)) return false;
                // 若未進場 則根據offset判斷DOM是否在視窗內決定是否進場
                if (isInWindow(ref.current, start, end)) return true;
                // 其餘狀況不改變狀態
                return pre;
            });
        }
        window.addEventListener("scroll", throttle(scrollHandler, 100));
        return () => {
            window.removeEventListener("scroll", throttle(scrollHandler, 100));
        };
    }, [offsetStart, offsetEnd, ref]);
    return isIn;
}

export default useShouldEnterBothSides;
