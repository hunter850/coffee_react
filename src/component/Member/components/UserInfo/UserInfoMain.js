/* eslint-disable prettier/prettier */
import { useState, useContext, useEffect, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./UserInfoMain.css";
import MemberMenu from "../MemberMenu/MemberMenu";
import UserList from "./UserList";
import { getUserData,editUserData,editPasswordAPI,uploadAvatar } from "../../../../config/api-path";

import Modal from "../../../Modal/Modal";

import axios from "axios";
import AuthContext from "../../AuthContext";

import { AiFillPicture } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

import { useAuth } from "../../AuthContextProvider";
import { set } from "lodash";

function UserInfo() {
    const { authorized, sid, token, name, nickname, birthday, mobile, address, mail, avatar } = useContext(AuthContext);
    // const { token } = useAuth();

    const [list, setList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editSuccess,setEditSuccess] =useState(false);

    // 欄位輸入的值(把onChange事件的狀態提升到這層)
    const [userList, setUserList] = useState({
        member_name: name ? name :"",
        member_nickname: nickname ? nickname:"",
        member_birthday: birthday ? birthday:"",
        member_mobile: mobile ? mobile:"",
        member_address: address ? address:"",
        member_mail: mail ? mail:"",
    });
    // const getUserData = () => {
    //     axios
    //         .get("http://localhost:3500/member/api/user-list", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((response) => {
    //             setList(response.data);
    //         });

    //     // const response = await axios.get("http://localhost:3500/member/api/user-list");
    //     // setList(response.data);
    // };

    const [ avatarField,setAvatarField ] = useState("");

    useEffect(() => {
        axios
            .get(getUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setList(response.data);
                // console.log(response.data);
                setAvatarField(response.data[0].avatar);
                // console.log(avatarField);
            });
    }, [avatarField,token]);

    // Object.values( )，把物件直接轉成陣列，才能使用陣列的方法
    // const avatar = Object.values(list).map((v, i) => v.avatar);
    // console.log(avatar);

    // --------------------- 編輯會員資料 ---------------------
    
    const handleEditUserList = (e)=>{
        fetch(editUserData,{
                method: "POST",
                body: JSON.stringify(userList),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
        })
        .then((r) => r.json())
        .then((result) => {
            console.log(result.data);
            if (result.success) {
                setUserList(result.data);
                setEditSuccess(true);
            }else{
                // alert("編輯失敗")
                setEditSuccess(false);
            }
        });
    }

    // --------------------- 拿到變更密碼欄位的值 ---------------------

    const member_password = Object.values(list).map(
        (v, i) => v.member_password
    );

    const [passErrors, setPassErrors] = useState('')
    const [newPassErrors, setNewPassErrors] = useState('')
    const [confirmErrors, setConfirmErrors] = useState('')

    const [editPass, setEditPass] = useState({
        member_password: "",
        new_password: "",
        confirm_password: "",
    });
    const editPassword = (e) => {
        setEditPass({ ...editPass, [e.target.name]: e.target.value });
        console.log(e.target.name, e.target.value);
    };

    // --------------------- 送出修改密碼 ---------------------

    const confirmPassword = async (e) => {
        e.preventDefault();

        if(!editPass.member_password){
            setPassErrors({...passErrors, member_password:"欄位必填！"})
            return;
        }else{
            setPassErrors({...passErrors,member_password:""});
        }

        if(!editPass.new_password){
            setNewPassErrors({...newPassErrors,new_password:"欄位必填！"})
            return;
        }else{
            setNewPassErrors({...newPassErrors,new_password:""});
        }

        if(!editPass.confirm_password){
            setConfirmErrors({...confirmErrors,confirm_password:"欄位必填！"})
            return;
        }else{
            setConfirmErrors({...confirmErrors,confirm_password:""});
        }

        // if ( editPass.member_password === "" || editPass.new_password === "" || editPass.confirm_password === "") {
        //     alert("欄位必填");
        //     return;
        // }

        // 先比對新密碼兩次都打正確，再送到後端比對舊密碼是否正確，正確就修改成功！
        if (editPass.new_password === editPass.confirm_password) {
            await fetch(editPasswordAPI, {
                method: "POST",
                body: JSON.stringify(editPass),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((r) => r.json())
                .then((result) => {
                    console.log(result);
                    if (result.success) {
                        alert("修改成功");
                    }else{
                        alert(`${result.error}`)
                    }
                });
        } else {
            alert("新密碼輸入錯誤")
        }
    };

    // 取消的按鈕
    const navigate = useNavigate();

    const cancel = (e)=>{
        e.preventDefault();
        navigate("/member");
    }

    const passCancel = (e)=>{
        e.preventDefault();
        setIsOpen(false);
    }

    // --------------------- 頭貼預覽 ---------------------

    const [selectedFile, setSelectedFile] = useState(null);

    const avatarFile = useRef();

    // 模擬點擊隱藏的 input
    const uploadFile = () => {
        avatarFile.current.click();
    };

    useEffect(() => {

        if (!selectedFile) {
            setAvatarField("");
            return;
        }
        const avatarUrl = URL.createObjectURL(selectedFile);
        // console.log(avatarUrl);
        setAvatarField(avatarUrl);

        // 當元件unmounted時清除記憶體
        return () => URL.revokeObjectURL(avatarUrl);
        
    }, [selectedFile]);

    // onChange時把選擇的照片設成setSelectedFile
    const changeAvatar = (e) => {
        const file = e.target.files[0];
        console.log(file);
    
        if (file) {
            setSelectedFile(file);

        } else {
            setSelectedFile(null);
        }
    }

    // 把頭貼存進資料庫
    useEffect(() => {
        if (selectedFile) {
            const fd = new FormData();
            fd.append("avatar", selectedFile);
            fetch(uploadAvatar, {
                method: "POST",
                body: fd,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((r) => r.json())
                .then((result) => {
                    console.log(result);
                });
        }
    }, [selectedFile]);

    return (
        <>
            <div className="ui-wrap-main">
                <div className="ui-container">
                    <MemberMenu />
                    <div className="ui-wrap-right">
                        <div className="ui-title">編輯會員資料</div>
                        <div className="avatar" onClick={uploadFile} onChange={changeAvatar} style={{ backgroundImage: `url(http://localhost:3500/avatar/${avatarField})`,backgroundRepeat: 'no-repeat',backgroundPosition: 'center',backgroundSize: 'cover',}}>
                            {/* <AiFillPicture size={'1.5em'} style={{"margin":"10"+"px"}}/> */}
                            <input type="file" name="avatar" style={{ display: "none" }} ref={avatarFile}/>
                        </div>
                        <div className="ui-info-wrap">
                            {list.map((v, i) => {
                                return (
                                    <div key={v.member_sid}>
                                        <UserList
                                            list={{
                                                member_name: v.member_name,
                                                member_nickname: v.member_nickname,
                                                member_account: v.member_account,
                                                member_birthday: v.member_birthday,
                                                member_mobile: v.member_mobile,
                                                member_address: v.member_address,
                                                member_mail: v.member_mail,
                                            }}
                                            userList={userList}
                                            setUserList={setUserList}
                                            isOpen={isOpen}
                                            setIsOpen={setIsOpen}
                                        />
                                    </div>
                                );
                            })}
                            <div className="ui-btn-wrap">
                                <button type="submit" className="ui-btn" onClick={cancel}>取消</button>
                                <button type="submit" className="ui-btn ui-btn-active" onClick={handleEditUserList}>保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Modal.Body>
                    <form name="editPassword" className="editPassword">
                        <div className="ed-Pass-h1">修改您的密碼</div>
                        <div className="ed-Pass-wrap">
                            <div className="ed-Pass">
                                <label className="ed-Pass-title">請輸入舊密碼</label>
                                <input
                                    type="text"
                                    className="ed-Pass-field"
                                    name="member_password"
                                    value={editPass.member_password}
                                    onChange={editPassword}
                                />
                                <p className="ed-Pass-field-err">{passErrors.member_password}</p>
                            </div>
                            <div className="ed-Pass">
                                <label className="ed-Pass-title">請輸入新密碼</label>
                                <input
                                    type="text"
                                    className="ed-Pass-field"
                                    name="new_password"
                                    value={editPass.new_password}
                                    onChange={editPassword}
                                />
                                <p className="ed-Pass-field-err">{newPassErrors.new_password}</p>
                            </div>
                            <div className="ed-Pass">
                                <label className="ed-Pass-title">請確認新密碼</label>
                                <input
                                    type="text"
                                    className="ed-Pass-field"
                                    name="confirm_password"
                                    value={editPass.confirm_password}
                                    onChange={editPassword}
                                />
                                <p className="ed-Pass-field-err">{confirmErrors.confirm_password}</p>
                            </div>
                        </div>
                        <div className="ed-Pass-btn-wrap">
                            <button type="submit" className="ui-btn" onClick={passCancel}>取消</button>
                            <button
                                type="submit"
                                className="ui-btn ui-btn-active"
                                onClick={confirmPassword}
                            >
                                修改
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal isOpen={editSuccess} setIsOpen={setEditSuccess}>
                <Modal.Body>
                    <div className="edit-msg-wrap">
                        <div className="edit-msg">
                        <FaCheckCircle size={'1.4rem'} style={{"marginRight":"15px","marginTop":"5px"}}/>{ editSuccess ? "修改成功" : "編輯失敗" }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserInfo;
