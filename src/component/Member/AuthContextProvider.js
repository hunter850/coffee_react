import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

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

    let localAuth = {
        authorized: false,
        sid: " ",
        account: " ",
        token: " ",
        name: " ",
        birthday: " ",
        mobile: " ",
        address: " ",
        mail: " ",
        level: " ",
        avatar: " ",
    };

    // let localAuth = { ...unAuthState };

    const [auth, setAuth] = useState(localAuth);

    // 用有沒有 auth 判斷是否為登入狀態，把 authorized 設為 true 表示已登入
    if (localAuthStr) {
        try {
            localAuth = JSON.parse(localAuthStr);
            if (localAuth.account && localAuth.token) {
                localAuth = { ...localAuth, authorized: true };
                console.log(localAuth);
            }
        } catch (ex) {}
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
            <AuthContext.Provider value={{ ...localAuth, setAuth }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export default AuthContextProvider;
