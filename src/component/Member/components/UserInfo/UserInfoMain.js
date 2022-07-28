/* eslint-disable prettier/prettier */
import { Fragment } from "react";
import { useState,useContext,useEffect } from "react";
import "./UserInfoMain.css";
import MemberMenu from "../MemberMenu/MemberMenu";
import UserList from "./UserList";

import Modal from "../../../Modal/Modal";

import axios from "axios";
import AuthContext from "../../AuthContext";

function UserInfo() {

    const [list, setList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const getUserData = async () => {

        const response = await axios.get("http://localhost:3500/member/api/user-list");
        setList(response.data);
    }

    useEffect(() => {
        getUserData();
    },[]);

    // Object.values( )，把物件直接轉成陣列，才能使用陣列的方法
    const avatar = Object.values(list).map((v,i)=>v.avatar);
    console.log(avatar);

    // --------------------- 拿到變更密碼欄位的值 ---------------------

    const member_password = Object.values(list).map((v,i)=>v.member_password);

    const [ editPass, setEditPass ] = useState({
        member_password: member_password,
        new_password: "",
        confirm_password:"",
    });
    const editPassword = (e)=>{
        setEditPass({ ...editPass, [e.target.name]: e.target.value });
        console.log( e.target.name,e.target.value);
    }

    // --------------------- 送出修改密碼 ---------------------

    // 先比對新密碼兩次都打正確，再送到後端比對舊密碼是否正確，正確就修改成功！

    const { authorized, sid, account, token } = useContext(AuthContext);
    console.log(token);

    const confirmPassword = async (e)=>{
        e.preventDefault();

        if( editPass.member_password ==="" && editPass.new_password ==="" && editPass.confirm_password ===""){
            // todo:錯誤訊息提示，欄位必填
            alert("欄位必填")
            return;
        }
        if( editPass.new_password === editPass.confirm_password){
            
            await fetch("http://localhost:3500/member/api/edit-password",{
                    method: "POST",
                    body: JSON.stringify(editPass),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
                .then((r) => r.json())
                .then((result) => {
                    console.log(result);
                    if(result.success){
                        alert("修改成功");
                    } 
                });
        }else{
            alert("失敗")
        }
    }

    // useEffect(()=>{
    //     confirmPassword();
    // },[editPass]);

    return (
        <>
            <div className="ui-wrap-main">
                <div className="ui-container">
                    <MemberMenu />
                    <div className="ui-wrap-right">
                        <div className="ui-title">編輯會員資料</div>
                        <img src={``} alt="" className="avatar"></img>
                        <div className="ui-info-wrap">
                            {
                                list.map( (v, i) => {
                                    return (
                                        <div key={v.member_sid}>
                                            <UserList list={{
                                                member_name: v.member_name,
                                                member_nickname: v.member_nickname,
                                                member_account: v.member_account,
                                                member_birthday: v.member_birthday,
                                                member_mobile: v.member_mobile,
                                                member_address: v.member_address,
                                                member_mail: v.member_mail,
                                            }}
                                            isOpen = {isOpen}
                                            setIsOpen = {setIsOpen}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <div className="ui-btn-wrap">
                                <button className="ui-btn">取消</button>
                                <button className="ui-btn ui-btn-active">保存</button>
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
                                <div className="ed-Pass-title">請輸入舊密碼</div>
                                <input type="text" className="ed-Pass-field" name="member_password" value={editPass.member_password} onChange={editPassword}/>
                            </div>
                            <div className="ed-Pass">
                                <div className="ed-Pass-title">請輸入新密碼</div>
                                <input type="text" className="ed-Pass-field" name="new_password" value={editPass.new_password} onChange={editPassword}/>
                            </div>
                            <div className="ed-Pass">
                                <div className="ed-Pass-title">請確認新密碼</div>
                                <input type="text" className="ed-Pass-field" name="confirm_password" value={editPass.confirm_password} onChange={editPassword}/>
                            </div>
                        </div>
                        <div className="ed-Pass-btn-wrap">
                                <button className="ui-btn">取消</button>
                                <button type="submit" className="ui-btn ui-btn-active" onClick={confirmPassword}>修改</button>
                        </div>
                    </form>
                </Modal.Body>
        </Modal>    
        </>
    );
}

export default UserInfo;