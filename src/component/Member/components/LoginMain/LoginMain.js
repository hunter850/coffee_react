/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
import { set } from "lodash";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../../../Contexts/NavProvider";
import Modal from "../../../Modal/Modal";
import { login, signUp, doVerification } from "../../../../config/api-path";
import "./LoginMain.css";
import loading from "../../../../images/member/coffee_loading.png";

import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

import AuthContext from "../../AuthContext";

function LoginMain() {

    const { setAuth } = useContext(AuthContext);

    const [notLog, setNotLog] = useState(false);
    const [changeText, setChangeText] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [signSuccess, setSignSuccess] = useState(false);
    const [isverify, setIsVerify] = useState(false);
    const [canStart, setCanStart] = useState(false);
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [eyeIsOpen, setEyeIsOpen] = useState(false);

    const [welWidth, setWelWidth] = useState(0);
    const [fmWidth, setFmWidth] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const welcomeWidth = useRef(null);
    const formWidth = useRef(null);

    const navigate = useNavigate();
    const { getCount } = useNav();

    // 掛載到頁面上執行一次
    useEffect(() => {
        function resizehandler() {
            setWelWidth(welcomeWidth.current.clientWidth);
            setFmWidth(formWidth.current.clientWidth);
        }
        window.addEventListener("resize", resizehandler);

        return () => window.removeEventListener("resize", resizehandler);

    }, []);

    useEffect(() => {
        setWelWidth(welcomeWidth.current.clientWidth);
        setFmWidth(formWidth.current.clientWidth);
    }, []);

    const change = () => {
        setNotLog(!notLog);

        setMyform({
            member_name: "",
            member_account: "",
            member_password: "",
            member_mail: "",
        });

        setNameErrors("");
        setAccountErrors("");
        setPasswordErrors("");
        setMailError("");

        setTimeout(() => {
            setChangeText(!changeText);
        }, 300);
    };

    // 欄位輸入的值
    const [myform, setMyform] = useState({
        member_name: "",
        member_account: "",
        member_password: "",
        member_mail: "",
    });

    const [myVerify, setMyVerify] = useState({
        verification: "",
        member_account: "",
    });

    // input的值
    const changeFields = (event) => {
        const id = event.target.id;
        const val = event.target.value;
        // console.log({ id, val });
        setMyform({ ...myform, [id]: val });
    };

    const getVerify = (event) => {
        const name = event.target.name;
        const val = event.target.value;
        // console.log({ name, val });
        setMyVerify({ ...myVerify, [name]: val });
    };

    // 自動填表
    const autoSignUp = (e) => {
        e.preventDefault();
        setMyform({ ...myform, member_name: "KohiLing", member_account: "cafe0824", member_password: "cafe123", member_mail: "mfee26coffee@gmail.com" });
    };

    // 錯誤訊息提示
    const [nameErrors, setNameErrors] = useState('');
    const [accountErrors, setAccountErrors] = useState('');
    const [passwordErrors, setPasswordErrors] = useState('');
    const [mailError, setMailError] = useState("");
    const mail_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;
    const [verifyError, setVerifyError] = useState('');

    // --------------------- 處理登入 ---------------------

    const handleLoginIn = (event) => {
        event.preventDefault();

        let isPass = true;

        if (myform.member_account === "") {
            setAccountErrors({ ...accountErrors, account: "請輸入正確帳號" });
            isPass = false;
        } else {
            setAccountErrors("");
        }
        if (myform.member_password === "") {
            setPasswordErrors({ ...passwordErrors, password: "請輸入正確密碼" });
            isPass = false;
        } else {
            setPasswordErrors("");
        }

        if (isPass) {
            fetch(login, {
                method: "POST",
                body: JSON.stringify(myform),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((r) => r.json())
                .then((result) => {

                    // console.log(result);

                    if (!result.success) {
                        setLoginSuccess(false);
                        setIsOpen(true);
                        return;
                    }

                    if (result.verify === "") {
                        setVerifySuccess(false);
                        setCanStart(true);
                        return;
                    }

                    if (result.success) {

                        localStorage.setItem('auth', JSON.stringify({ ...result.data, authorized: true}));
                        setAuth({ ...result.data, authorized: true});

                        setTimeout(() => {
                            setIsLoading(true);
                            // console.log(1);
                        }, 0);
        
                        setTimeout(() => {
                            getCount();
                            navigate("/member", {replace: false})
                            // console.log(2);
                        }, 2300);
                        setLoginSuccess(true);
                    }
                    // setIsOpen(true);
                });
        }
    };

    // --------------------- 處理註冊 ---------------------

    const handleSignUp = (event) => {
        event.preventDefault();

        // 欄位檢查
        let isPass = true;

        if (!myform.member_name) {
            setNameErrors({ ...nameErrors, name: "請輸入正確姓名" });
            isPass = false;
        } else {
            setNameErrors("");
        }
        if (!myform.member_account) {
            setAccountErrors({ ...accountErrors, account: "請輸入正確帳號" });
            isPass = false;
        } else {
            setAccountErrors("");
        }
        if (!myform.member_password) {
            setPasswordErrors({ ...passwordErrors, password: "請輸入正確密碼" });
            isPass = false;
        } else {
            setPasswordErrors("");
        }
        if (!myform.member_mail || !mail_re.test(myform.member_mail)) {
            setMailError({ ...mailError, mail: "信箱格式錯誤" });
            isPass = false;
        } else {
            setMailError("");
        }

        if (isPass) {
            fetch(signUp, {
                method: "POST",
                body: JSON.stringify(myform),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((r) => r.json())
                .then((result) => {
                    // console.log(result);
                    if (result.success) {
                        setSignSuccess(true);
                        setTimeout(() => {
                            setIsVerify(true);
                            setIsOpen(false);
                        }, 500);
                    }
                    setIsOpen(true);
                });
        }

    };

    // --------------------- 處理驗證 ---------------------
    const handleVerify = (e) => {
        e.preventDefault();

        fetch(doVerification, {
            method: "POST",
            body: JSON.stringify(myVerify),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => r.json())
            .then((result) => {
                // console.log(result);
                if (!result.success) {
                    setVerifyError("錯誤！請重新再試！");
                } else {
                    setVerifySuccess(true);
                    setIsVerify(false);
                    setCanStart(true);
                    setTimeout(() => {
                        setCanStart(false);
                    }, 1500);
                }
            });

    };

    const handleVerification = (e) => {
        e.preventDefault();
        // todo：重新寄信
        setIsVerify(true);
    };

    // --------------------- 看不看得到密碼 ---------------------
    const eyeOpen = () => {
        setEyeIsOpen(!eyeIsOpen);
    };


    return (
        <>
            <div className="login-wrap">
                <div className={isLoading ? "lg-mask-white" : ""}>
                    <div className={isLoading ? "lg-mask" : ""}></div>
                    {
                        isLoading ? <img src={loading} alt="" className="lg-coffee-cup" /> : ""
                    }
                </div>
                <div className="lg-wrapper">
                    <div className="lg-welcome" style={{ transform: notLog ? `translate(${fmWidth}px)` : "" }} ref={welcomeWidth}>
                        <h1 className="wel-title">{changeText ? "Welcome back !" : "還沒有帳號嗎？"}</h1>
                        <button className="lg-switch" onClick={change}>{notLog ? "登入" : "註冊"}</button>
                    </div>
                    <form name="form1" action="" className={`lg-form ${notLog ? "fade" : ""}`} style={{ transform: notLog ? `translate(-${welWidth}px)` : "" }} ref={formWidth} onChange={changeFields}>
                        <h1 className={`${notLog ? "sign-form-title" : "lg-form-title"}`}>{notLog ? "註冊會員" : "登入會員"}</h1>
                        <div className={`${notLog ? "sign-field-form" : "lg-field-form"}`}>
                            <div className="lg-field-wrap">
                                <div className={`${notLog ? "name-open" : "name-close"}`}>
                                    <input type="text" name="name" id="member_name" value={myform.member_name} onChange={changeFields} className={`lg-field ${notLog ? "name-open" : "name-close"}`} placeholder="姓名" autoComplete="off" />
                                    <div className={`lg-icon ${notLog ? "icon-open" : "icon-close"}`}>
                                        <FaUser />
                                    </div>
                                </div>
                                <p className="lg-field-err" style={{ display: notLog ? "flex" : "none" }}>{nameErrors.name}</p>
                            </div>

                            <div className="lg-field-wrap">
                                <div className="account lg-field-cont">
                                    <input type="text" name="account" id="member_account" value={myform.member_account} onChange={changeFields} className="lg-field" placeholder="請輸入帳號" autoComplete="off" />
                                    <div className="lg-icon">
                                        <FaUserPlus size={'1.15rem'} />
                                    </div>
                                </div>
                                <p className="lg-field-err">{accountErrors.account}</p>
                            </div>

                            <div className="lg-field-wrap">
                                <div className="password lg-field-cont">
                                    <input type={eyeIsOpen ? "text" : "password"} name="password" id="member_password" value={myform.member_password} onChange={changeFields} className="lg-field" placeholder="請輸入密碼" autoComplete="off" />
                                    <div className="lg-icon-eye" onClick={eyeOpen}>
                                        {eyeIsOpen ? <FaEye size={'0.95rem'} /> : <FaEyeSlash size={'0.95rem'} />}
                                    </div>
                                    <div className="lg-icon">
                                        <FaLock />
                                    </div>
                                </div>
                                <p className="lg-field-err">{passwordErrors.password}</p>
                            </div>

                            <div className="lg-field-wrap">
                                <div className={`${notLog ? "mail-open" : "mail-close"}`}>
                                    <input type="text" name="mail" id="member_mail" value={myform.member_mail} onChange={changeFields} className={`lg-field ${notLog ? "mail-open" : "mail-close"}`} placeholder="請輸入信箱" autoComplete="off" />
                                    <div className={`lg-icon ${notLog ? "icon-open" : "icon-close"}`}>
                                        <MdEmail size={"1.05rem"} />
                                    </div>
                                </div>
                                <p className="lg-field-err" style={{ display: notLog ? "flex" : "none" }}>{mailError.mail}</p>
                            </div>
                        </div>
                        <div className="submit-btn-wrap">
                            <button type="submit" onClick={handleSignUp} className="log-in" style={{ display: notLog ? "block" : "none " }}>註冊</button>
                            <button type="submit" onClick={handleVerification} className="login-verification" style={{ display: notLog ? "block" : "none " }}>重新寄送驗證碼</button>
                        </div>
                        <button type="submit" onClick={handleLoginIn} className="sign-up" style={{ display: notLog ? "none" : "block " }}>登入</button>
                        <button type="button" onClick={autoSignUp} style={{ border: "none", padding: "15px", cursor: "pointer", backgroundColor: "transparent" }}></button>
                    </form>
                    <div className="particle"></div>
                </div>

                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <Modal.Body className="lg-msg-wrap">
                        <div>
                            <div className="lg-msg" style={{ display: notLog ? "none" : "flex " }}>
                                {
                                    loginSuccess ? <FaCheckCircle size={'1.4rem'} style={{ "marginRight": "15px", "marginTop": "5px" }} /> : <FaTimesCircle size={'1.4rem'} style={{ "marginRight": "15px", "marginTop": "5px" }} />
                                }
                                {loginSuccess ? "登入成功" : "請輸入正確帳密"}
                            </div>
                        </div>
                        <div>
                            <div className="lg-msg" style={{ display: notLog ? "flex" : "none " }}>
                                {
                                    signSuccess ? <FaCheckCircle size={'1.4rem'} style={{ "marginRight": "15px", "marginTop": "5px" }} /> : <FaTimesCircle size={'1.4rem'} style={{ "marginRight": "15px", "marginTop": "5px" }} />
                                }
                                {signSuccess ? "註冊成功！" : "已有重複帳號"}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal isOpen={isverify} setIsOpen={setIsVerify}>
                    <Modal.Body>
                        <form name="form2" className="verify">
                            <div className="verify-h1">驗證碼已寄至您的信箱！</div>
                            <div className="verify-wrap">
                                <div className="verify-check">
                                    <div className="verify-info-check">
                                        <label className="verify-account-title">請輸入帳號</label>
                                        <input
                                            type="text"
                                            className="verify-field"
                                            name="member_account"
                                            value={myVerify.member_account}
                                            onChange={getVerify}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="verify-info-check">
                                        <label className="verify-title">請輸入驗證碼</label>
                                        <input
                                            type="text"
                                            className="verify-field"
                                            name="verification"
                                            value={myVerify.verification}
                                            onChange={getVerify}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <p className="verify-field-err">{verifyError}</p>
                                </div>
                                <button type="submit" className="verify-btn" onClick={handleVerify}>送出確認</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

            <Modal isOpen={canStart} setIsOpen={setCanStart}>
                <Modal.Body className="lg-msg-wrap">
                    <div className="lg-msg">
                        {verifySuccess ? <FaCheckCircle size={'1.4rem'} style={{ "marginRight": "15px", "marginTop": "5px" }} /> : <FaTimesCircle size={'1.4rem'} style={{ "marginRight": "15px", "marginTop": "5px" }} />}
                        {verifySuccess ? "帳號開通！" : "帳號未開通"}
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}
export default LoginMain;
