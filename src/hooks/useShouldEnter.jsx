import { useState, useEffect } from "react";
import isEnter from "../js/isEnter";
import { throttle } from "lodash";

function useShouldEnter(ref, offsetStart, mode = "DOMPosition") {
    const [isIn, setIsIn] = useState(false);
    useEffect(() => {
        let start = offsetStart;
        if (typeof offsetStart === "function") {
            start = offsetStart(ref.current);
        }
        setIsIn(isEnter(ref.current, start, mode));
        function scrollHandler() {
            setIsIn((pre) => {
                // 若已進場 又向上捲 移出視窗外 則退場
                if (pre && !isEnter(ref.current, 0, mode)) return false;
                // 若未進場 則根據offset判斷DOM是否在視窗內決定是否進場
                if (isEnter(ref.current, start, mode)) return true;
                // 其餘狀況不改變狀態
                return pre;
            });
        }
        window.addEventListener("scroll", throttle(scrollHandler, 100));
        return () => {
            window.removeEventListener("scroll", throttle(scrollHandler, 100));
        };
    }, [offsetStart, ref, mode]);
    return isIn;
}

export default useShouldEnter;
