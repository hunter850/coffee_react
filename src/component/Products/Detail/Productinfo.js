import Btn from "../../Item/Btn/Btn";
import Tag from "../../Item/Tag/Tag";
import "./Productinfo.scss";
import axios from "axios";
import {
    couponDataGet,
    sendCartPost,
    addUserLike,
} from "../../../config/api-path";
import { useEffect, useState, useContext, useCallback } from "react";
import AuthContext from "../../Member/AuthContext";

function Productinfo(props) {
    // identify zone
    const { renderData, dataLoaded, productsCount, setproductsCount } = props;
    const [couponRender, setCouponRender] = useState([]);
    const [userLike, setUserLike] = useState([]);

    const Auth = useContext(AuthContext);

    // axios get
    let CouponData = [];
    const getCouponData = async () => {
        return axios
            .get(`${couponDataGet}/${renderData[0].products_sid}`)
            .then((res) => {
                const fetchCouponData = JSON.parse(JSON.stringify(res.data));
                CouponData = fetchCouponData;
            });
    };

    let UserLike = [];
    const getUserLike = async () => {
        return axios
            .get(`${addUserLike}/${renderData[0].products_sid}`)
            .then((res) => {
                const fetchUserLike = JSON.parse(JSON.stringify(res.data));
                UserLike = fetchUserLike;
            });
    };

    useEffect(() => {
        async function couponGetFunc() {
            if (renderData[0].products_sid) {
                await getCouponData();
                setCouponRender(CouponData);
                await getUserLike();
                console.log(UserLike);
                setUserLike(UserLike);
            }
        }
        couponGetFunc();
    }, [dataLoaded]);

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

    const addToUserLike = () => {
        // console.log("送資料~");
        return axios
            .post(`${addUserLike}/${renderData[0].products_sid}`, {
                member: Auth ? Auth : "沒東西",
            })
            .then((res) => {
                const fetchCartData = JSON.parse(JSON.stringify(res.data));
                console.log(fetchCartData);
            });
    };

    // function
    useEffect(() => {
        if (productsCount < 1) {
            setproductsCount(1);
        }
    }, [productsCount]);

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
                    <Tag
                        tagContext={`${renderData[0].products_name} 8折`}
                        tagBgc={"#b79973"}
                        tagPaddingX={"15px"}
                    />
                </li>
                <li>
                    <Tag
                        tagContext={"積分換優惠"}
                        tagBgc={"#b79973"}
                        tagPaddingX={"15px"}
                    />
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
                            setproductsCount(productsCount - 1);
                        }}
                    ></button>
                    <input
                        type="number"
                        className="inputStyle"
                        value={productsCount}
                        onChange={(e) => {
                            setproductsCount(e.target.value);
                        }}
                        oninput={(e) => {
                            e.replace(/[^\d]/g, "");
                        }}
                    />
                    <button
                        className="plusButtonStyle"
                        value={productsCount}
                        onClick={(e) => {
                            setproductsCount(productsCount + 1);
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
                    sendCart();
                }}
            />
            {dataLoaded ? (
                UserLike.products_sid === renderData[0].products_sid ? (
                    <Btn
                        width={"375px"}
                        backgroundColor={"#FCFAF7"}
                        color={"var(--BLUE)"}
                        children={"加入收藏"}
                        style={{ marginTop: "20px", marginBottom: "79px" }}
                        onClick={() => {
                            addToUserLike();
                        }}
                    />
                ) : (
                    <Btn
                        width={"375px"}
                        backgroundColor={"#FCFAF7"}
                        color={"var(--BLUE)"}
                        children={"加入收藏"}
                        style={{ marginTop: "20px", marginBottom: "79px" }}
                        onClick={() => {
                            addToUserLike();
                        }}
                    />
                )
            ) : (
                ""
            )}
        </div>
    );
    return el;
}

export default Productinfo;
