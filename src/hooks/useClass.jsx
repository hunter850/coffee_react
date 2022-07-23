import { useCallback } from "react";

function useClass() {
    return useCallback((...ar) => {
        return ar.join(" ");
    }, []);
}

export default useClass;
