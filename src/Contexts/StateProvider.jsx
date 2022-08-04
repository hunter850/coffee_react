import React, { useContext, useReducer, useEffect } from "react";
import { useAuth } from "../component/Member/AuthContextProvider";
import { initData } from "./initData";
import produce from "immer";

const StateContext = React.createContext([]);
export function useControlData() {
    return useContext(StateContext);
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

function StateProvider(props) {
    const { children } = props;
    const { token } = useAuth();
    const [state, dispatch] = useReducer(reducer, initData);
    useEffect(() => {
        if (!token) {
            dispatch({ type: "RESET", name: "nowList" });
            dispatch({ type: "RESET", name: "productList" });
            dispatch({ type: "RESET", name: "foodList" });
            dispatch({ type: "RESET", name: "productCoupons" });
            dispatch({ type: "RESET", name: "foodCoupons" });
            dispatch({ type: "RESET", name: "selectedProductCouponId" });
            dispatch({ type: "RESET", name: "selectedFoodCouponId" });
        }
    }, [token]);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
}

export default StateProvider;
