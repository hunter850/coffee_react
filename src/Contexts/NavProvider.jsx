import React, { useContext, useCallback, useState } from "react";
import { useAuth } from "../component/Member/AuthContextProvider";
import { getCartCount } from "../config/api-path";
import axios from "axios";

const NavContext = React.createContext();

export function useNav() {
    return useContext(NavContext);
}

function NavProvider(props) {
    const { children } = props;
    const [count, setCount] = useState(0);
    const [shouldCover, setShouldCover] = useState(false);
    const { token } = useAuth();
    const getCount = useCallback(() => {
        if (token) {
            axios
                .get(getCartCount, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setCount(res.data.cartTotalCount);
                    // console.log(res.data.cartTotalCount);
                })
                .catch((error) => {
                    setCount(0);
                    // console.log(error);
                });
        }
    }, [token]);
    const handleLogout = useCallback(() => {
        setCount(0);
    }, []);
    return (
        <NavContext.Provider
            value={{
                count,
                getCount,
                handleLogout,
                shouldCover,
                setShouldCover,
            }}
        >
            {children}
        </NavContext.Provider>
    );
}

export default NavProvider;
