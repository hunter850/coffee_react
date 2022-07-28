import { useCallback } from "react";
import { useControlData } from "../Contexts/StateProvider";

function useData(dataName) {
    const [state, dispatch] = useControlData();
    const changeDataSetter = useCallback(
        (updateData) => {
            if (typeof updateData === "function") {
                dispatch({ type: "PRE", name: dataName, data: updateData });
                return;
            }
            dispatch({ name: dataName, data: updateData });
        },
        [dataName, dispatch]
    );
    const resetData = useCallback(() => {
        dispatch({ type: "RESET", name: dataName });
    }, [dataName, dispatch]);
    if (dataName === undefined) {
        return [state, dispatch];
    }
    return [state[dataName], changeDataSetter, resetData];
}

export default useData;
