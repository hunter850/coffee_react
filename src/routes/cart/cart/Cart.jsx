import { Fragment, useEffect, useRef, useState } from "react";
import useData from "../../../hooks/useData";
import useClass from "../../../hooks/useClass";
import { useAuth } from "../../../component/Member/AuthContextProvider";
import useDebounce from "../../../hooks/useDebounce";
import { useNav } from "../../../Contexts/NavProvider";
import { Link } from "react-router-dom";
import NavBar from "../../../component/NavBar/NavBar";
import CartTab from "./components/CartTab";
import ChatBot from "../../../component/Bot/ChatBot";
import bs_flex from "../css/bs_flex.module.scss";
import styles from "./css/cart.module.scss";
import axios from "axios";
import { differenceWith, isEqual } from "lodash";
import {
    getProduct,
    getFood,
    getProductCoupon,
    getFoodCoupon,
} from "../../../config/api-path";

function Cart() {
    const { container, px_200 } = bs_flex;
    const { fake_body, cart_tab_wrap, tab_button_group, tab_button } = styles;
    const [inlineStyles, setInlineStyles] = useState({});
    const productRef = useRef([]);
    const foodRef = useRef([]);
    const buttonGroupRef = useRef(null);
    const c = useClass();
    const [nowList, setNowList] = useData("nowList");
    const [productList, setProductList, resetProduct] = useData("productList");
    const [foodList, setFoodList, resetFood] = useData("foodList");
    const [, setProductCoupons, resetProductCoupon] = useData("productCoupons");
    const [, setFoodCoupons, resetFoodCoupon] = useData("foodCoupons");
    const { token } = useAuth();
    const { getCount } = useNav();
    useDebounce(
        () => {
            // mount時的[]不做任何fetch
            if (productRef.current.length === 0) return;
            // 陣列長度改變執行delete
            if (productRef.current.length > productList.length) return;
            // 改變過的物件放入changedDatas陣列
            const changedDatas = differenceWith(
                productList,
                productRef.current,
                isEqual
            );
            // 有改變的物件才發fetch執行put
            if (changedDatas.length >= 1) {
                axios
                    .put(
                        getProduct,
                        {
                            data: changedDatas,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then(() => {
                        // console.log(result.data);
                        getCount();
                    })
                    .catch((result) => {
                        console.log(result);
                        // alert(result.response.data.error.message);
                    });
            }
        },
        1000,
        [productRef.current, productList]
    );
    // 幾秒後才把現在的值紀錄為前一次
    useDebounce(
        () => {
            productRef.current = productList;
        },
        1000,
        [productList]
    );
    useDebounce(
        () => {
            // mount時的[]不做任何fetch
            if (foodRef.current.length === 0) return;
            // 陣列長度改變執行delete
            if (foodRef.current.length > foodList.length) return;
            // 改變過的物件放入changedDatas陣列
            const changedDatas = differenceWith(
                foodList,
                foodRef.current,
                isEqual
            );
            // 有改變的物件才發fetch執行put
            if (changedDatas.length >= 1) {
                axios
                    .put(
                        getFood,
                        {
                            data: changedDatas,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    // .then((result) => {
                    //     console.log(result.data);
                    // })
                    .catch((result) => {
                        console.log(result);
                        alert(result.response.data.error.message);
                    });
            }
        },
        1000,
        [foodRef.current, foodList]
    );
    // 幾秒後才把現在的值紀錄為前一次
    useDebounce(
        () => {
            foodRef.current = foodList;
        },
        1000,
        [foodList]
    );

    // didMount fetch 商品 餐點 的資料
    useEffect(() => {
        resetProduct();
        resetFood();
        resetProductCoupon();
        resetFoodCoupon();
        if (!token) {
            alert("請先登入");
            return;
        }
        // 設定localStorage
        localStorage.setItem("nowList", nowList);
        // fetch 商品
        axios
            .get(getProduct, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setProductList(result.data);
            })
            .catch((error) => {
                console.log(error);
                resetProduct();
            });
        // fetch 餐點
        axios
            .get(getFood, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setFoodList(result.data);
            })
            .catch((error) => {
                console.log(error);
                resetFood();
            });
        // fetch 商品優惠卷
        axios
            .get(getProductCoupon, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setProductCoupons(result.data);
            })
            .catch((error) => {
                console.log(error);
                resetProductCoupon();
            });
        // fetch 餐點優惠卷
        axios
            .get(getFoodCoupon, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setFoodCoupons(result.data);
            })
            .catch((error) => {
                console.log(error);
                resetFoodCoupon();
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const productClicked = () => {
        localStorage.setItem("nowList", "productList");
        setNowList("productList");
    };
    const foodClicked = () => {
        localStorage.setItem("nowList", "foodList");
        setNowList("foodList");
    };
    useEffect(() => {
        function adjustButtonPosition() {
            const buttonHeight = getComputedStyle(buttonGroupRef.current).height;
            setInlineStyles({
                ...inlineStyles,
                tab: { top: "-" + buttonHeight },
            });
        }
        adjustButtonPosition();
        window.addEventListener("resize", adjustButtonPosition);
        return window.removeEventListener("resize", adjustButtonPosition);
    }, []);
    return (
        <Fragment>
            <div className={fake_body}>
                <NavBar />
                <div className={c(container, px_200)}>
                    <div className={cart_tab_wrap}>
                        <div
                            className={tab_button_group}
                            ref={buttonGroupRef}
                            style={inlineStyles.tab}
                        >
                            <button
                                onClick={productClicked}
                                className={tab_button}
                            >
                                商品
                            </button>
                            <button
                                onClick={foodClicked}
                                className={tab_button}
                            >
                                餐點
                            </button>
                        </div>
                        <CartTab />
                    </div>
                </div>
            </div>
            <Link to="/cart/creditcard">信用卡</Link>
            <Link to="/cart/form">表單</Link>
            <ChatBot />
        </Fragment>
    );
}

export default Cart;
