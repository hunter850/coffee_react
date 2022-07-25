import { Fragment } from "react";
import "./UserInfoMain.css";
import MemberMenu from "../MemberMenu/MemberMenu";

function UserInfo() {
    return (
        <>
            <div className="ui-wrap-main">
                <div className="ui-container">
                    <MemberMenu />
                    <div className="ui-wrap-right">
                        <div className="ui-title">編輯會員資料</div>
                        <div className="avatar"></div>
                        <div className="ui-info-wrap">
                            <div className="ui-info">
                                <div className="ui-info-title">姓名</div>
                                <input type="text" className="ui-field"/>
                            </div>
                            <div className="ui-info">
                                <div className="ui-info-title">暱稱</div>
                                <input type="text" className="ui-field"/>
                            </div>
                            <div className="ui-info">
                                <div className="ui-info-title">密碼</div>
                                <button className="ui-btn-password">變更密碼</button>
                            </div>
                            <div className="ui-info">
                                <div className="ui-info-title">帳號</div>
                                <input type="text" className="ui-field"/>
                            </div>
                            <div className="ui-info">
                                <div className="ui-info-title">生日</div>
                                <input type="text" className="ui-field"/>
                            </div>
                            <div className="ui-info">
                                <div className="ui-info-title">手機</div>
                                <input type="text" className="ui-field"/>
                            </div>
                            <div className="ui-info">
                                <div className="ui-info-title">信箱</div>
                                <input type="text" className="ui-field"/>
                            </div>
                            <div className="ui-info">
                                <div className="ui-info-title">地址</div>
                                <input type="text" className="ui-field"/>
                            </div>
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