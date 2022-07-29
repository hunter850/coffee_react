/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
import { set } from "lodash";
import { useState, useEffect, useRef,useContext } from "react";
import Modal from "../../../Modal/Modal";
import "./LoginMain.css";

import AuthContext from "../../AuthContext";

function LoginMain() {

    const {setAuth} = useContext(AuthContext);

    const [isLog, setIsLog] = useState(false);
    const [changeText, setChangeText] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loginSuccess,setLoginSuccess] = useState(false);
    const [signSuccess,setSignSuccess] = useState(false);

    const [welWidth, setWelWidth] = useState(0);
    const [fmWidth, setFmWidth] = useState(0);


    const welcomeWidth = useRef(null);
    const formWidth = useRef(null);


    // 掛載到頁面上執行一次
    useEffect(() => {
        
        function resizehandler (){
            setWelWidth(welcomeWidth.current.clientWidth)
            setFmWidth(formWidth.current.clientWidth)
        }
        window.addEventListener("resize", resizehandler);

        return ()=>  window.removeEventListener("resize", resizehandler);

    }, []);

    useEffect(() => {
            setWelWidth(welcomeWidth.current.clientWidth);
            setFmWidth(formWidth.current.clientWidth);
    }, []);


    const change = () =>{
        setIsLog(!isLog);
        setTimeout(()=>{
            setChangeText(!changeText);
        },300)
    }

    // 欄位輸入的值
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

    // 錯誤訊息提示
    const [nameErrors, setNameErrors] = useState('')
    const [accountErrors, setAccountErrors] = useState('')
    const [passwordErrors, setPasswordErrors] = useState('')


// --------------------- 處理登入 ---------------------

    const handleLoginIn = (event) => {
        event.preventDefault();


        if(!myform.member_account){
            setAccountErrors({...accountErrors,account:"請輸入正確帳號"})
        }else{
            setAccountErrors({...accountErrors,account:""});
        }


        if(!myform.member_password){
            setPasswordErrors({...passwordErrors,password:"請輸入正確密碼"})
        }else{
            setPasswordErrors({...passwordErrors,password:""});
        }

        if(myform.member_account && myform.member_password){
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
                localStorage.setItem('auth', JSON.stringify({...result.data, authorized: true}));
                setAuth({...result.data, authorized: true});
                setLoginSuccess(true);
            }
            setIsOpen(true);
        });
        }
    };


    // --------------------- 處理註冊 ---------------------

    const handleSignUp = (event) => {
        event.preventDefault();

        if(!myform.member_name){
            setNameErrors({...nameErrors, name:"請輸入正確格式"})
            return;
        }else{
            setNameErrors({...nameErrors,name:""});
        }

        if(!myform.member_account){
            setAccountErrors({...accountErrors,account:"請輸入正確帳號"})
            return;
        }else{
            setAccountErrors({...accountErrors,account:""});
        }

        if(!myform.member_password){
            setPasswordErrors({...passwordErrors,password:"請輸入正確密碼"})
            return;
        }else{
            setPasswordErrors({...passwordErrors,password:""});
        }

            fetch("http://localhost:3500/member/sign-up",{
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
                    setSignSuccess(true);
                } 
            });

        setIsOpen(true);
    };


    return (
        <>
            <div className="lg-wrapper">
                <div className={`lg-welcome ${isLog ? "fade":""}`} style={{transform : isLog ? `translate(${fmWidth}px)`:""}} ref={welcomeWidth}>
                    <h1 className="wel-title">{changeText ? "還沒有帳號嗎？" : "Welcome back !"}</h1>
                    <button className="lg-switch" onClick={change}>{isLog ? "註冊" : "登入"}</button>
                </div>
                <form name="form1" action="" className={`lg-form ${isLog ? "fade":""}`} style={{transform : isLog ? `translate(-${welWidth}px)`:""}} ref={formWidth}>
                    <h1 className="lg-form-title">{isLog ? "登入會員" : "註冊會員"}</h1>
                    <div className="lg-field-form">
                        <div className= {`lg-field-cont ${isLog ? "name-height":""}`}>
                            <input type="text" name="name" id="member_name" value={myform.member_name} onChange={changeFields} className="lg-field" placeholder="姓名" required/>
                            <p className="lg-field-err">{nameErrors.name}</p>
                            <div className="icon">
                                <i className="fa-solid fa-user"></i>
                            </div>
                        </div>

                        <div className="account lg-field-cont">
                            <input type="text" name="account" id="member_account" value={myform.member_account} onChange={changeFields} className="lg-field" placeholder="請輸入帳號" required/>
                            <p className="lg-field-err">{accountErrors.account}</p>
                            <div className="icon">
                                <i className="fa-solid fa-user-plus"></i>
                            </div>
                        </div>

                        <div className="password lg-field-cont">
                            <input type="password" name="password" id="member_password" value={myform.member_password} onChange={changeFields} className="lg-field" placeholder="請輸入密碼" required/>
                            <p className="lg-field-err">{passwordErrors.password}</p>
                            <div className="icon">
                                <i className="fa-solid fa-lock"></i>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={handleLoginIn} className="log-in" style={{display: isLog ? "block" : "none "}}>登入</button>
                    <button type="submit" onClick={handleSignUp} className="sign-up" style={{display: isLog ? "none" : "block "}}>註冊</button>
                    {/* <input className="sign-up" type="button" value="註冊" style={{display: change ? "block" : "none "}}/>
                    <input className="log-in" type="button" value="登入" style={{display: change ? "none" : "block "}} /> */}
                </form>
                <div className="particle"></div>

                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <Modal.Body>
                        <h1 style={{display: isLog ? "block" : "none "}}>{ loginSuccess ? "登入成功" : "請輸入正確帳密" }</h1>
                        <h1 style={{display: isLog ? "none" : "block "}}>{ signSuccess ? "註冊成功" : "已有重複帳號" }</h1>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}
export default LoginMain;
