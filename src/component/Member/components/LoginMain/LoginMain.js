/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
import { useState, useEffect, useRef } from "react";
import "./LoginMain.css";

function LoginMain() {

    const [change, setChange] = useState(false);

    const welcomeWidth = useRef(null);
    const formWidth = useRef(null);


    // 掛載到頁面上執行一次
    useEffect(() => {
        window.addEventListener("resize", () => {
            welcomeWidth = welcomeWidth.current.clientWidth;
            formWidth = formWidth.current.clientWidth;
        });
    }, []);

// --------------------- 處理登入 ---------------------

    const [myform, setMyform] = useState({
        member_name: "",
        member_account: "",
        member_password: "",
    });

    // input的值
    const changeFields = (event) => {
        const id = event.target.id;
        const val = event.target.value;
        console.log({ id, val });
        setMyform({ ...myform, [id]: val });
    };


    const handleLoginIn = (event) => {
        event.preventDefault();

        // TODO: 欄位檢查

        fetch("http://localhost:3500/member/login",{
            method: "POST",
            body: JSON.stringify(myform),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((r) => r.json())
        .then((result) => {
            console.log(result);
            if(result.success){
                // localStorage.setItem('auth', JSON.stringify(result.data));
                alert('登入成功');
            } else {
                alert('帳密錯誤');
            }
        });
    };


    // --------------------- 處理註冊 ---------------------

    const handleSignUp = (event) => {
        event.preventDefault();

        fetch("http://localhost:3500/member/sign-up",{
            method: "POST",
            body: JSON.stringify(myform),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((r) => r.json())
        .then((result) => {

            if(result.success){
                alert('註冊成功');
            } else {
                alert('失敗');
            }
        });

    
    };


    return (
        <>
            <div className="lg-wrapper">
                <div className={`lg-welcome ${change ? "fade":""}`} style={{transform : change ? `translate(${formWidth.current.clientWidth}px)`:""}} ref={welcomeWidth}>
                    <h1 className="wel-title">{change ? "還沒有帳號嗎？" : "Welcome back !"}</h1>
                    <button className="lg-switch" onClick={()=>{setChange(!change)}}>{change ? "註冊" : "登入"}</button>
                </div>
                <form name="form1" action="" className={`lg-form ${change ? "fade":""}`} style={{transform : change ? `translate(-${welcomeWidth.current.clientWidth}px)`:""}} ref={formWidth}>
                    <h1 className="lg-form-title">{change ? "登入會員" : "註冊會員"}</h1>
                    <div className="lg-field-form">
                        <div className= {`name lg-field-cont ${change ? "name-height":""}`}>
                            <input type="text" name="name" id="member_name" value={myform.name} onChange={changeFields} className="lg-field" placeholder="姓名" />
                            <div className="icon">
                                <i className="fa-solid fa-user"></i>
                            </div>
                        </div>

                        <div className="account lg-field-cont">
                            <input type="text" name="account" id="member_account" value={myform.member_account} onChange={changeFields} className="lg-field" placeholder="請輸入帳號" />
                            <div className="icon">
                                <i className="fa-solid fa-user-plus"></i>
                            </div>
                        </div>

                        <div className="password lg-field-cont">
                            <input type="password" name="password" id="member_password" value={myform.password} onChange={changeFields} className="lg-field" placeholder="請輸入密碼" />
                            <div className="icon">
                                <i className="fa-solid fa-lock"></i>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={handleLoginIn} className="log-in" style={{display: change ? "block" : "none "}}>登入</button>
                    <button type="submit" onClick={handleSignUp} className="sign-up" style={{display: change ? "none" : "block "}}>註冊</button>
                    {/* <input className="sign-up" type="button" value="註冊" style={{display: change ? "block" : "none "}}/>
                    <input className="log-in" type="button" value="登入" style={{display: change ? "none" : "block "}} /> */}
                </form>
                <div className="particle"></div>
            </div>
        </>
    );
}
export default LoginMain;
