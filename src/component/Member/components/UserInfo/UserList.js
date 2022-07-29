/* eslint-disable prettier/prettier */
import { useState} from "react";
import { Link } from "react-router-dom";
import "./UserInfoMain.css";

function UserList({list,isOpen,setIsOpen}) {

    const { member_name, member_nickname, member_account, member_password, member_birthday, member_mobile, member_address, member_mail } = list;

    console.log(list);
    // 欄位輸入的值
    const [userList, setUserList] = useState({
        member_name: member_name ? member_name :"",
        member_nickname: member_nickname ? member_nickname:"",
        member_account: member_account ? member_account:"",
        member_birthday: member_birthday ? member_birthday:"",
        member_mobile: member_mobile ? member_mobile:"",
        member_address: member_address ? member_address:"",
        member_mail: member_mail ? member_mail:"",
    });

    const changeFields = (event) => {
        setUserList({ ...userList, [event.target.name]: event.target.value });
    };

    // --------------------- 處理變更密碼 ---------------------

    const handlePasswordEdit = async (e)=>{
        e.preventDefault();

        setIsOpen(true);
    }
    return (
        <>
        <form name="form" action="">
            <div className="ui-info">
                <div className="ui-info-title">姓名</div>
                <input type="text" className="ui-field" name="member_name" value={userList.member_name} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">暱稱</div>
                <input type="text" className="ui-field" name="member_nickname" value={userList.member_nickname} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">密碼</div>
                <button type="submit" className="ui-btn-password" onClick={handlePasswordEdit}>變更密碼</button>
            </div>
            <div className="ui-info">
                <div className="ui-info-title">帳號</div>
                <input type="text" className="ui-field" name="member_account" value={userList.member_account} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">生日</div>
                <input type="date" className="ui-field" name="member_birthday" value={userList.member_birthday !== null ? userList.member_birthday.split("T")[0] : "" } onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">手機</div>
                <input type="text" className="ui-field" name="member_mobile" value={userList.member_mobile} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">地址</div>
                <input type="text" className="ui-field" name="member_address" value={userList.member_address} onChange={changeFields} />
            </div>
            <div className="ui-info">
                <div className="ui-info-title">信箱</div>
                <input type="text" className="ui-field" name="member_mail" value={userList.member_mail} onChange={changeFields} />
            </div>
        </form>
        </>
    );
}

export default UserList;