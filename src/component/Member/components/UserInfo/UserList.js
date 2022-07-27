/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserInfoMain.css";

function UserList({list}) {

    const { member_name, member_nickname, member_account, member_birthday, member_mobile, member_address, member_mail } = list;

    // 欄位輸入的值
    const [userList, setUserList] = useState({
        member_name: member_name,
        member_nickname: member_nickname,
        member_account: member_account,
    });

    const changeFields = (event) => {
        const name = event.target.name;
        const val = event.target.value;
        console.log({ name, val });
        setUserList({ ...userList, [name]: val });
    };

    return (
        <>
        <form name="form" action="">
            <div className="ui-info">
                <div className="ui-info-title">姓名</div>
                <input type="text" className="ui-field" name="member_name" value={userList.member_name} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">暱稱</div>
                <input type="text" className="ui-field" value={member_nickname} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">密碼</div>
                <button className="ui-btn-password">變更密碼</button>
            </div>
            <div className="ui-info">
                <div className="ui-info-title">帳號</div>
                <input type="text" className="ui-field" value={member_account} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">生日</div>
                <input type="date" className="ui-field" value={member_birthday.split("T")[0]}  onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">手機</div>
                <input type="text" className="ui-field" value={member_mobile} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">地址</div>
                <input type="text" className="ui-field" value={member_address} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">信箱</div>
                <input type="text" className="ui-field" value={member_mail} onChange={changeFields} />
            </div>
        </form>
        </>
    );
}

export default UserList;
