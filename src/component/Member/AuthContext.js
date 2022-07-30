import React from "react";

// 預設值
const AuthContext = React.createContext({
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
});

export default AuthContext;
