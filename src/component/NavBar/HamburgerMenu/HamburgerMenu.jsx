import "./HamburgerMenu.scss";
import { Link } from "react-router-dom";
function HamburgerMenu() {
    return (
        <>
            <div className="HamburgerMenu">
                <div className="HamburgerMenu-wrap">
                    <div>
                        <Link to="/">首頁</Link>
                    </div>
                    <div>
                        <Link to="/store">店家資訊</Link>
                    </div>
                    <div>
                        <Link to="/products">商品</Link>
                    </div>
                    <div>
                        <Link to="/food">點餐</Link>
                    </div>
                    <div>
                        <Link to="/reserve">訂位</Link>
                    </div>
                    <div>
                        <Link to="/course">課程</Link>
                    </div>
                    <div>
                        <Link to="/sharing">分享牆</Link>
                    </div>
                    <div>
                        <Link to="/getcoupon">遊戲</Link>
                    </div>
                    <div>
                        <Link to="/member">會員中心</Link>
                    </div>
                    <div>
                        <Link to="/cart">購物車</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HamburgerMenu;
