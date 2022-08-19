import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../../../hooks/useData";
import useClass from "../../../hooks/useClass";
import { useAuth } from "../../../component/Member/AuthContextProvider";
import useDebounce from "../../../hooks/useDebounce";
import { useNav } from "../../../Contexts/NavProvider";
import NavBar from "../../../component/NavBar/NavBar";
import CartTab from "./components/CartTab";
import ChatBot from "../../../component/Bot/ChatBot";
import Modal from "../../../component/Modal/Modal";
import Btn from "../../../component/Item/Btn/Btn";
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
    const {
        fake_body,
        cart_tab_wrap,
        tab_button_group,
        tab_button_basic,
        tab_active,
        cart_bot,
        modal_text,
        modal_button_wrap,
        modal_confirm,
    } = styles;
    const [inlineStyles, setInlineStyles] = useState({});
    const [show, setShow] = useState(false);
    const [showProductButton, setShowProductButton] = useState(true);
    const [showFoodButton, setShowFoodButton] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [alertText, setalertText] = useState("請先登入");
    const productRef = useRef([]);
    const foodRef = useRef([]);
    const mountRef = useRef(false);
    const buttonGroupRef = useRef(null);
    const navigate = useNavigate();
    const c = useClass();
    const [nowList, setNowList] = useData("nowList");
    const [productList, setProductList, resetProduct] = useData("productList");
    const [foodList, setFoodList, resetFood] = useData("foodList");
    const [, setProductCoupons, resetProductCoupon] = useData("productCoupons");
    const [, setFoodCoupons, resetFoodCoupon] = useData("foodCoupons");
    const { token } = useAuth();
    const { getCount } = useNav();
    const productClicked = useCallback(() => {
        localStorage.setItem("nowList", "productList");
        setNowList("productList");
    }, [setNowList]);
    const foodClicked = useCallback(() => {
        localStorage.setItem("nowList", "foodList");
        setNowList("foodList");
    }, [setNowList]);
    const shouldRelocate = useCallback(
        (productList, foodList) => {
            if (Array.isArray(productList) && Array.isArray(foodList)) {
                if (productList.length < 1 && foodList.length >= 1) {
                    foodClicked();
                    setShowProductButton(false);
                }
                if (foodList.length < 1 && productList.length >= 1) {
                    productClicked();
                    setShowFoodButton(false);
                }
                if (productList.length < 1 && foodList.length < 1) {
                    // alert("購物車無商品");
                    // navigate("/", { replace: false });
                    setalertText("購物車無商品");
                    setShow(false);
                    setIsOpen(true);
                }
            }
        },
        [foodClicked, productClicked]
    );
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
        resetProductCoupon();
        resetFoodCoupon();
        if (!token) {
            setalertText("請先登入");
            setIsOpen(true);
            // alert("請先登入");
            return;
        }
        // 設定localStorage
        localStorage.setItem("nowList", nowList);
        // fetch 商品
        const productFetch = axios.get(getProduct, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // fetch 餐點
        const foodFetch = axios.get(getFood, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        Promise.all([productFetch, foodFetch])
            .then((result) => {
                const [productResult, foodResult] = result;
                shouldRelocate(productResult.data, foodResult.data);
                if (productResult.data.length <= 0) {
                    setShowProductButton(false);
                }
                if (foodResult.data.length <= 0) {
                    setShowFoodButton(false);
                }
                if (
                    productResult.data.length <= 0 &&
                    foodResult.data.length <= 0
                ) {
                    return;
                }
                setShow(true);
                setProductList(productResult.data);
                setFoodList(foodResult.data);
            })
            .catch((error) => {
                console.log(error);
                resetFood();
                resetProduct();
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

    useEffect(() => {
        function adjustButtonPosition() {
            const buttonHeight = getComputedStyle(
                buttonGroupRef.current
            ).height;
            setInlineStyles({
                ...inlineStyles,
                tab: { top: "-" + buttonHeight },
            });
        }
        adjustButtonPosition();
        window.addEventListener("resize", adjustButtonPosition);
        return window.removeEventListener("resize", adjustButtonPosition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        // 第一次進購物車時 陣列長度皆小於等於0且mountRef為false 模仿didMount 將mounRef.current改為true
        if (
            productList.length <= 0 &&
            foodList.length <= 0 &&
            mountRef.current === false
        ) {
            mountRef.current = true;
        } else if (mountRef.current === false) {
            // 回上一頁因為不再fetch所以陣列長度不一定小於0 故要再判斷mountRef來決定didMount
            mountRef.current = true;
        } else {
            shouldRelocate(productList, foodList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productList, foodList]);
    return (
        <Fragment>
            <div className={fake_body}>
                <NavBar />
                <div
                    className={c(container, px_200)}
                    style={{ opacity: show ? 1 : 0 }}
                >
                    <div className={cart_tab_wrap}>
                        <div
                            className={tab_button_group}
                            ref={buttonGroupRef}
                            style={inlineStyles.tab}
                        >
                            <button
                                onClick={productClicked}
                                className={c(tab_button_basic, {
                                    [tab_active]: nowList === "productList",
                                })}
                                style={{
                                    display: showProductButton
                                        ? "block"
                                        : "none",
                                }}
                            >
                                商品
                            </button>
                            <button
                                onClick={foodClicked}
                                className={c(tab_button_basic, {
                                    [tab_active]: nowList === "foodList",
                                })}
                                style={{
                                    display: showFoodButton ? "block" : "none",
                                }}
                            >
                                餐點
                            </button>
                        </div>
                        <CartTab />
                    </div>
                </div>
            </div>
            <ChatBot className={cart_bot} />
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeAble={false}
                closeButton={false}
            >
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <h4 className={modal_text}>{alertText}</h4>
                    <div className={modal_button_wrap}>
                        <Btn
                            className={modal_confirm}
                            onClick={() =>
                                navigate(
                                    `${
                                        alertText === "請先登入"
                                            ? "/member/login"
                                            : "/"
                                    }`,
                                    { replace: true }
                                )
                            }
                        >
                            確認
                        </Btn>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default Cart;
