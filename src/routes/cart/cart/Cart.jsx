import { Fragment, useEffect } from "react";
import useData from "../../../hooks/useData";
import useClass from "../../../hooks/useClass";
import { Link } from "react-router-dom";
// import NavBar from "../../../component/NavBar";
import FakeNav from "../../../component/FakeNav";
import CartTab from "./components/CartTab";
import bs_flex from "../css/bs_flex.module.scss";
import styles from "./css/cart.module.scss";
import axios from "axios";
import { getProduct, getFood } from "../../../config/api-path";

function Cart() {
    const { container, px_200 } = bs_flex;
    const { fake_body } = styles;
    const c = useClass();
    // eslint-disable-next-line no-unused-vars
    const [nowList, setNowList] = useData("nowList");
    // eslint-disable-next-line no-unused-vars
    const [productList, setProductList] = useData("productList");
    // eslint-disable-next-line no-unused-vars
    const [foodList, setFoodList] = useData("foodList");
    useEffect(() => {
        axios.get(getProduct).then((result) => {
            setProductList(result.data);
        });
        axios.get(getFood).then((result) => {
            setFoodList(result.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
