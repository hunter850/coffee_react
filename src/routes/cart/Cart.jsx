import { Fragment, useEffect, useState } from "react";
import useArray from "../../hooks/useArray";
import useClass from "../../hooks/useClass";
// import { useCart } from "./contexts/cartContext/CartProvider";
// import NavBar from "../../component/NavBar";
import FakeNav from "../../component/FakeNav";
import CartTab from "./CartTab";
import { Link } from "react-router-dom";
import { productData } from "./fakeData/productData";
import { productCouponData } from "./fakeData/productCouponData";
import { foodData } from "./fakeData/foodData.js";
import { foodCouponData } from "./fakeData/foodCouponData";
import bs_flex from "./css/bs_flex.module.scss";
import styles from "./css/cart.module.scss";

function Cart() {
    const { container, px_200 } = bs_flex;
    const { fake_body } = styles;
    const [showProduct, setShowProduct] = useState(true);
    const [selectedCouponId, setSelectedCouponId] = useState(-1);
    // const [checkData, setCheckData] = useCart("checkData");
    const c = useClass();
    const productList = useArray([]);
    const productCoupon = useArray([]);
    const foodList = useArray([]);
    const foodCoupon = useArray([]);
    useEffect(() => {
        // [{id:1, picture: "1.jpg", name: ["manba"], price: 240, quantity: 1}]
        setTimeout(() => {
            productList.cto(productData);
            // setCheckData({ ...checkData, cartList: productData });
            productCoupon.cto(productCouponData);
        }, 50);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setTimeout(() => {
            foodList.cto(foodData);
            foodCoupon.cto(foodCouponData);
        }, 50);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Fragment>
            <div className={fake_body}>
                {/* <NavBar /> */}
                <FakeNav />
                <div className={c(container, px_200)}>
                    <button onClick={() => setShowProduct(true)}>商品</button>
                    <button onClick={() => setShowProduct(false)}>餐點</button>
                    {showProduct ? (
                        <CartTab
                            cartList={productList}
                            coupons={productCoupon}
                            showProduct={showProduct}
                            selectedCouponId={selectedCouponId}
                            setSelectedCouponId={setSelectedCouponId}
                            listName={"productList"}
                        />
                    ) : (
                        <CartTab
                            cartList={foodList}
                            coupons={foodCoupon}
                            showProduct={showProduct}
                            selectedCouponId={selectedCouponId}
                            setSelectedCouponId={setSelectedCouponId}
                            listName={"foodList"}
                        />
                    )}
                </div>
                {/* <pre>{JSON.stringify(checkData, null, 4)}</pre> */}
                <Link to="/cart/creditcard">信用卡</Link>
            </div>
        </Fragment>
    );
}
export default Cart;
