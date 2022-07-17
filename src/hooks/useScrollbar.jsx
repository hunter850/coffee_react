import { useCallback } from "react";

const useScrollbar = () => {
    return [
        useCallback(() => {
            document.body.style.overflow = "hidden";
        }, []),
        useCallback(() => {
            document.body.style.overflow = "visible";
        }, []),
    ];
};

export default useScrollbar;
