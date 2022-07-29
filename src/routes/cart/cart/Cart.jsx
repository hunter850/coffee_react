import { Fragment, useEffect } from "react";
import useData from "../../../hooks/useData";
import useClass from "../../../hooks/useClass";
import { useAuth } from "../../../component/Member/AuthContextProvider";
import useLog from "../../../hooks/useLog";
import { Link } from "react-router-dom";
// import NavBar from "../../../component/NavBar";
import FakeNav from "../../../component/FakeNav";
import CartTab from "./components/CartTab";
import bs_flex from "../css/bs_flex.module.scss";
import styles from "./css/cart.module.scss";
import axios from "axios";
import {
    getProduct,
    getFood,
    getProductCoupon,
    getFoodCoupon,
} from "../../../config/api-path";

function Cart() {
    const { container, px_200 } = bs_flex;
    const { fake_body } = styles;
    const c = useClass();
    const [, setNowList] = useData("nowList");
    const [, setProductList] = useData("productList");
    const [, setFoodList] = useData("foodList");
    const [productCoupons, setProductCoupons] = useData("productCoupons");
    const [foodCoupons, setFoodCoupons] = useData("foodCoupons");
    useLog(productCoupons);
    useLog(foodCoupons);
    const { token, sid } = useAuth();
    useEffect(() => {
        if (!token) {
            alert("請先登入");
            return;
        }
        axios
            .get(getProduct, {
                params: {
                    sid,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setProductList(result.data);
            })
            .catch((error) => console.log(error));
        axios
            .get(getFood, {
                params: {
                    sid,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setFoodList(result.data);
            })
            .catch((error) => console.log(error));
        axios
            .get(getProductCoupon, {
                params: {
                    sid,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setProductCoupons(result.data);
            })
            .catch((error) => console.log(error));
        axios
            .get(getFoodCoupon, {
                params: {
                    sid,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setFoodCoupons(result.data);
            })
            .catch((error) => console.log(error));
    }, [
        setFoodList,
        setProductList,
        setProductCoupons,
        setFoodCoupons,
        token,
        sid,
    ]);
    return (
        <Fragment>
            <div className={fake_body}>
                <FakeNav />
                <div className={c(container, px_200)}>
                    <button onClick={() => setNowList("productList")}>
                        商品
                    </button>
                    <button onClick={() => setNowList("foodList")}>餐點</button>
                    <CartTab />
                </div>
            </div>
            <Link to="/cart/creditcard">信用卡</Link>
        </Fragment>
    );
}

export default Cart;
