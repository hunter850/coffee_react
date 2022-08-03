import Btn from "../../Item/Btn/Btn";
import Tag from "../../Item/Tag/Tag";
import "./Productinfo.scss";
import axios from "axios";
import {
    sendCartPost,
    addUserLike,
    UserLikeDel,
} from "../../../config/api-path";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../../Member/AuthContext";
import Modal from "../../Modal/Modal";
import { Link } from "react-router-dom";

function Productinfo(props) {
    // identify zone
    const { renderData, dataLoaded, productsCount, setProductsCount } = props;

    const [userLike, setUserLike] = useState([]);
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [checkLike, setCheckLike] = useState(false);
    const [btnContext, setBtnContext] = useState("未加入收藏");
    const [isOpen, setIsOpen] = useState(false);

    const Auth = useContext(AuthContext);

    // axios get

    let userLikeData = [];
    const getUserLike = async () => {
        return axios
            .get(`${addUserLike}/${renderData[0].products_sid}`)
            .then((res) => {
                const fetchUserLike = JSON.parse(JSON.stringify(res.data));
                userLikeData = fetchUserLike;
                setUserLike(userLikeData);
                console.log("userLikeData", userLikeData);
                setInfoLoaded(true);
            });
    };

    useEffect(() => {
        getUserLike();
        console.log("renderData", renderData);
    }, [dataLoaded]);

    useEffect(() => {
        if (infoLoaded) {
            if (
                userLike.rows
                    .map((v, i) => {
                        return v.member_sid;
                    })
                    .indexOf(Auth.sid) >= 0
            ) {
                setCheckLike(true);
            } else {
                setCheckLike(false);
            }
        }
    }, [infoLoaded]);

    // axios post

    const sendCart = () => {
        // console.log("送資料~");
        return axios
            .post(`${sendCartPost}/${renderData[0].products_sid}`, {
                ...renderData,
                quantity: productsCount,
                member: Auth ? Auth : "沒東西",
            })
            .then((res) => {
                const fetchCartData = JSON.parse(JSON.stringify(res.data));
                console.log(fetchCartData);
            });
    };

    const sendUserLike = () => {
        // console.log("送資料~");
        setCheckLike(true);
        return axios
            .post(`${addUserLike}/${renderData[0].products_sid}`, {
                member: Auth ? Auth : "沒會員",
            })
            .then((res) => {
                const fetchCartData = JSON.parse(JSON.stringify(res.data));
                console.log("fetchCartData", fetchCartData);
            });
    };

    // axios delete
    const delUserLike = () => {
        // console.log("執行刪除");
        setCheckLike(false);
        return axios
            .post(`${UserLikeDel}/${renderData[0].products_sid}`, {
                member: Auth ? Auth : "沒會員",
            })
            .then((res) => {
                const fetchCartData = JSON.parse(JSON.stringify(res.data));
                console.log("fetchCartData", fetchCartData);
            });
    };

    // function
    useEffect(() => {
        if (productsCount < 1) {
            setProductsCount(1);
        }
    }, [productsCount]);

    useEffect(() => {
        if (checkLike === false) {
            setBtnContext("未加入收藏");
        } else {
            setBtnContext("已加入收藏");
        }
    }, [checkLike]);

    const el = (
        <div className="productInfo">
            <h2 className="title-font">
                {dataLoaded ? renderData[0].products_name : ""}
            </h2>
            <p
                className="productIntro"
                contentEditable="true"
                dangerouslySetInnerHTML={{
                    __html: dataLoaded ? renderData[0].products_intro : "錯誤",
                }}
            ></p>
            <ul className="tagArea">
                <li>
                    <Link to="/getcoupon">
                        <Tag
                            tagContext={"遊戲拿優惠"}
                            tagBgc={"#b79973"}
                            tagPaddingX={"15px"}
                            divClassName={"getgame"}
                        />
                    </Link>
                </li>
                <li>
                    <Link to="/member">
                        <Tag
                            tagContext={"積分換優惠"}
                            tagBgc={"#b79973"}
                            tagPaddingX={"15px"}
                            divClassName={"getscore"}
                        />
                    </Link>
                </li>
            </ul>
            <h5>${dataLoaded ? renderData[0].products_price : ""}元</h5>
            <div className="productsCount">
                <h6>購入數</h6>
                <div className="buttonWrap">
                    <button
                        className="minusButtonStyle"
                        value={productsCount}
                        onClick={(e) => {
                            setProductsCount(productsCount - 1);
                        }}
                    ></button>
                    <input
                        type="number"
                        className="inputStyle"
                        value={productsCount}
                        onChange={(e) => {
                            setProductsCount(e.target.value);
                        }}
                    />
                    <button
                        className="plusButtonStyle"
                        value={productsCount}
                        onClick={(e) => {
                            setProductsCount(productsCount + 1);
                        }}
                    ></button>
                </div>
            </div>
            <Btn
                width={"375px"}
                backgroundColor={"var(--BLUE)"}
                color={"#FFF"}
                children={"加入購物車"}
                style={{ marginTop: "30px" }}
                onClick={() => {
                    if (Auth.authorized) {
                        sendCart();
                    } else {
                        setIsOpen(true);
                        // alert("請先登入會員");
                    }
                }}
            />
            {infoLoaded ? (
                <Btn
                    width={"375px"}
                    backgroundColor={"#FCFAF7"}
                    color={"var(--BLUE)"}
                    children={btnContext}
                    style={{ marginTop: "20px", marginBottom: "79px" }}
                    onClick={() => {
                        if (Auth.authorized) {
                            if (checkLike) {
                                console.log("要刪除");
                                delUserLike();
                            } else {
                                console.log("要加入");
                                sendUserLike();
                            }
                        } else {
                            // alert("請先登入會員");
                            console.log(Auth);
                            setIsOpen(true);
                        }
                    }}
                />
            ) : (
                ""
            )}
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Link
                    to="/member/login"
                    style={{
                        textDecoration: "none",
                        color: "var(--BLUE)",
                        padding: "40px",
                    }}
                >
                    <h4>請先登入會員</h4>
                </Link>
            </Modal>
        </div>
    );
    return el;
}

export default Productinfo;
