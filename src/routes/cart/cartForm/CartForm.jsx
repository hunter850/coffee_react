import { Fragment, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../component/Member/AuthContextProvider";
import useClass from "../../../hooks/useClass";
import useData from "../../../hooks/useData";
import NavBar from "../../../component/NavBar/NavBar";
import PersonalInfoForm from "./components/PersonalInfoForm";
import TotalHeader from "../cart/components/TotalHeader";
import TotalBord from "../cart/components/TotalBord";
import styles from "./css/cartForm.module.scss";
import bs_flex from "../css/bs_flex.module.scss";
import axios from "axios";
import {
    getProduct,
    getFood,
    getProductCoupon,
    getFoodCoupon,
} from "../../../config/api-path";

function CartForm() {
    const { form_container, total_wrap } = styles;
    const { container, px_200 } = bs_flex;
    const c = useClass();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        payWay: "",
        deliverWay: "",
        address: "",
    });
    const confirmHandler = useCallback(() => {
        console.log(formData);
    }, [formData]);
    const [, setnowList] = useData("nowList");
    const [, setProductList, resetProduct] = useData("productList");
    const [, setFoodList, resetFood] = useData("foodList");
    const [, setProductCoupons, resetProductCoupon] = useData("productCoupons");
    const [, setFoodCoupons, resetFoodCoupon] = useData("foodCoupons");
    const { token } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        resetProduct();
        resetFood();
        resetProductCoupon();
        resetFoodCoupon();
        if (!token) {
            alert("請先登入");
            return;
        }
        // 讀localStorage決定nowList
        const localNowList = localStorage.getItem("nowList");
        if (localNowList === "productList" || localNowList === "foodList") {
            setnowList(localNowList);
        } else {
            alert("您未於購物車選擇結帳商品");
            navigate("/cart", { replace: false });
        }
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
    return (
        <Fragment>
            <NavBar />
            <div className={c(container, px_200)}>
                <div className={form_container}>
                    <PersonalInfoForm
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <div className={total_wrap}>
                        <TotalHeader />
                        <TotalBord confirmHandler={confirmHandler} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CartForm;
