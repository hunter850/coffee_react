import React, { useContext, useReducer, useCallback } from "react";
import { initData } from "./initData";
import produce from "immer";

const StateContext = React.createContext([]);

export function useCartData() {
    return useContext(StateContext);
}

export function useCart(dataName) {
    const [state, dispatch] = useContext(StateContext);
    const dataSetter = useCallback((updateData) => {
        if (typeof updateData === "function") {
            dispatch({ type: "PRE", name: dataName, data: updateData });
            return;
        }
        dispatch({ name: dataName, data: updateData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const resetData = useCallback(() => {
        dispatch({ type: "RESET", name: dataName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (dataName === undefined) {
        return [state, dispatch];
    }
    return [state[dataName], dataSetter, resetData];
}

const reducer = produce((draft, action) => {
    if (action.type === undefined) action.type = "POST";
    switch (action.type) {
        case "POST":
            draft[action.name] = action.data;
            break;
        case "PRE":
            draft[action.name] = action.data(draft[action.name]);
            break;
        case "RESET":
            draft[action.name] = initData[action.name];
            break;
        case "DELETE":
            delete draft[action.name];
            break;
        default:
            break;
    }
});

function CartProvider(props) {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initData);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
}

export default CartProvider;
