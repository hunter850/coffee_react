import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import "./navBar.css"

const NavBar = () => {
// =============================================
    const memberListyle = {
        position: "relative"
    }

    const memberUlStyle = {
        listStyleType: "none",
        padding: "0px",
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        display: "none"
    }
    const [memberDisplay, setMemberDisplay] = useState(memberUlStyle);
    const memberLi = useRef(null);

    const closeMember = () => {
        setMemberDisplay(pre => ({...pre, display: "none"}));
    }

    useEffect(() => {
        const memLiHeight = memberLi.current.getBoundingClientRect().height;
        // console.log(memLiHeight);
        setMemberDisplay(pre => ({...pre, top: memLiHeight + "px"}))
        window.addEventListener("click", closeMember);
    }, []);

    const clickHandler  = (event) => {
        event.stopPropagation();
    }

    const displayHandler = (event) => {
        event.stopPropagation();
        setMemberDisplay(pre => {
            if(pre.display === "none") {
                return {...pre, display: "block"};
            } else {
                return {...pre, display: "none"};
            }
        })
    }
    // =================================
    const gameListyle = {
        position: "relative"
    }

    const gameUlStyle = {
        listStyleType: "none",
        padding: "0px",
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        display: "none"
    }
    const [gameDisplay, setGameDisplay] = useState(gameUlStyle);
    const gameLi = useRef(null);

    const closeGame = () => {
        setGameDisplay(pre => ({...pre, display: "none"}));
    }

    useEffect(() => {
        const gameLiHeight = gameLi.current.getBoundingClientRect().height;
        // console.log(memLiHeight);
        setGameDisplay(pre => ({...pre, top: gameLiHeight + "px"}))
        window.addEventListener("click", closeGame);
    }, []);

    const clickHandler2  = (event) => {
        event.stopPropagation();
    }

    const displayHandler2 = (event) => {
        event.stopPropagation();
        setGameDisplay(pre => {
            if(pre.display === "none") {
                return {...pre, display: "block"};
            } else {
                return {...pre, display: "none"};
            }
        })
    }
// =====================
    const el = (
        <header>
            <h1>0 + B !</h1>
            <nav className="navbar">    
                <ul className="navUl">
                    <li><Link to="/">首頁</Link></li>
                    <li><Link to="/store">店家資訊</Link></li>
                    <li><Link to="/goods">商品</Link></li>
                    <li><Link to="/food">點餐</Link></li>
                    <li><Link to="/lesson">課程</Link></li>
                    <li><Link to="/sharing">分享牆</Link></li>
                    {/* <li><Link to="/game">遊戲</Link></li> */}
                    <li className="gameLi" style={gameListyle} ref={gameLi}>
                        <button onClick={displayHandler2}>遊戲</button>
                        <ul className="gameUl" style={gameDisplay} onClick={clickHandler2}>
                            <li><Link to="/getpoint">獲得積分</Link></li>
                            <li><Link to="/getcoupon">獲得優惠券</Link></li>
                        </ul>
                    </li>

                    <li className="memberLi" style={memberListyle} ref={memberLi}>
                        <button onClick={displayHandler}>會員</button>
                        <ul className="memberUl" style={memberDisplay} onClick={clickHandler}>
                            <li><Link to="/member">會員中心</Link></li>
                            <li><Link to="/points">會員積分</Link></li>
                            <li><Link to="/coupon">優惠卷</Link></li>
                        </ul>
                        
                    </li>
                    <li><Link to="/cart">購物車</Link></li>
                </ul> 
            </nav>
        </header>
    );

    return el;
}

export default NavBar