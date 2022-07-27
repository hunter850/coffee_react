/* eslint-disable prettier/prettier */
import { Fragment } from "react";
import { useState, useEffect } from "react";
import "./UserInfoMain.css";
import MemberMenu from "../MemberMenu/MemberMenu";
import UserList from "./UserList";

import axios from "axios";

function UserInfo() {

    const [list, setList] = useState([]);

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
                                            }}/>
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
        </>
    );
}

export default UserInfo;