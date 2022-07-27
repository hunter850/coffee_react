import { useCallback } from "react";
// import { cloneDeep } from "lodash";

function useClass() {
    return useCallback((...ar) => {
        // const tempArray = cloneDeep(ar);
        const outputArray = [];
        ar.forEach((item) => {
            if (typeof item === "string") {
                outputArray.push(item);
                return;
            }
            if (Array.isArray(item)) {
                item.forEach((str) => {
                    if (typeof str === "string") outputArray.push(str);
                });
                return;
            }
            if (typeof item === "object") {
                for (let i in item) {
                    if (!!item[i] === true) {
                        outputArray.push(i);
                    }
                }
                return;
            }
            return;
        });
        return outputArray.join(" ");
    }, []);
}

export default useClass;
