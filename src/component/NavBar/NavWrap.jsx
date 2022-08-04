import React, { useCallback, useState, useContext } from "react";
import { useAuth } from "../Member/AuthContextProvider";
import axios from "axios";
import { getCartCount } from "../../config/api-path";

export const CountContext = React.createContext();

export function useGetCart() {
    return useContext(CountContext);
}

function NavWrap(props) {
    const { children } = props;
    const [count, setCount] = useState(0);
    const { token } = useAuth();
    const getCount = useCallback(() => {
        axios
            .get(getCartCount, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCount(res.data.cartTotalCount);
                // console.log(res.data.cartTotalCount);
            });
    }, [token]);

    return (
        <CountContext.Provider value={{ getCount, count }}>
            {children}
        </CountContext.Provider>
    );
}

export default NavWrap;
