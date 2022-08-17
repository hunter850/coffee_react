import React, { useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    return useContext(AuthContext);
}

export const authOrigin = {
    authorized: false,
    sid: "",
    account: "",
    token: "",
    name: "",
    nickname: "",
    birthday: "",
    mobile: "",
    address: "",
    mail: "",
    level: "",
    avatar: "",
};

function AuthContextProvider({ children }) {
    const localAuthStr = localStorage.getItem("auth");

    // const unAuthState = {
    //     authorized: false,
    //     sid: " ",
    //     account: " ",
    //     token: " ",
    //     name: " ",
    //     birthday: " ",
    //     mobile: " ",
    //     address: " ",
    //     mail: " ",
    //     level: " ",
    //     avatar: " ",
    // };

    let localAuth = authOrigin;

    // let localAuth = { ...unAuthState };

    const [auth, setAuth] = useState(localAuth);
    // console.log(auth);
    // 用有沒有 auth 判斷是否為登入狀態，把 authorized 設為 true 表示已登入
    if (localAuthStr) {
        try {
            localAuth = JSON.parse(localAuthStr);
            if (localAuth.account && localAuth.token) {
                localAuth = { ...localAuth, authorized: true };
                // console.log(localAuth);
            }
        } catch (ex) { }
    }

    // const navigate = useNavigate();

    // 清除localStorage
    // const logout = () => {
    //     localStorage.removeItem("auth");
    //     setAuth({ ...unAuthState });
    //     navigate("/");
    // };

    return (
        <>
            <AuthContext.Provider value={{ ...localAuth, setAuth, auth }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export default AuthContextProvider;
