/* eslint-disable prettier/prettier */
import "./MemberMenu.css";
import { NavLink,Link } from "react-router-dom";

function MemberMenu() {
    return (
        <>
            <div className="wrap-left">
                <div className="member-menu-wrap">
                    <Link className="member-menu" to="/member">會員中心</Link>
                    <NavLink className={({isActive})=>isActive?"nav-link-active":"member-menu"} to="/member/userinfo">編輯會員資料</NavLink>
                    <NavLink className={({isActive})=>isActive?"nav-link-active":"member-menu"} to="/member/orderhistory">歷史訂單</NavLink>
                    <div className="member-menu">分享記錄</div>
                    <div className="member-menu">我的點數</div>
                    <div className="member-menu">我的收藏</div>
                    <div className="member-menu">優惠券</div>
                </div>
            </div>
        </>
    );
}
export default MemberMenu;
