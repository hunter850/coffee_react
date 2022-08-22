import { useCallback } from "react";

function useClass() {
    return useCallback((...ar) => {
        return ar
            .map((item) => {
                if (typeof item === "string") {
                    return item;
                }
                if (Array.isArray(item)) {
                    return item
                        .filter((value) => {
                            if (typeof value === "string" && value !== "")
                                return true;
                            return false;
                        })
                        .join(" ");
                }
                if (typeof item === "object") {
                    return Object.keys(item)
                        .filter((value) => {
                            if (!!item[value] === true && value) return true;
                            return false;
                        })
                        .join(" ");
                }
                return "";
            })
            .filter((value) => value !== "")
            .join(" ")
            .replace(/ +/g, " ")
            .trim();
    }, []);
}

export default useClass;
