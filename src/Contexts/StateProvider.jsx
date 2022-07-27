import React, { useContext, useReducer } from "react";
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
    const [state, dispatch] = useReducer(reducer, initData);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
}

export default StateProvider;
