import { useCallback } from "react";
import { useControlData } from "../Contexts/StateProvider";

function useData(dataName) {
    const [state, dispatch] = useControlData();
    const changeDataSetter = useCallback((updateData) => {
        dispatch({ name: dataName, data: updateData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const deleteData = useCallback(() => {
        dispatch({ type: "DELETE", name: dataName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (dataName === undefined) {
        return [state, dispatch];
    }
    return [state[dataName], changeDataSetter, deleteData];
}

export default useData;
