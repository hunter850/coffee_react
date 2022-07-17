import { useCallback } from "react";

const useToggleScroll = () => {
    return useCallback(() => {
        if (getComputedStyle(document.body).overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, []);
};

export default useToggleScroll;
