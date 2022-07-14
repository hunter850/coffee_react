import { Fragment, useEffect, useState, useMemo } from "react";
import { useStyleChange } from "../../Contexts/SuperProvider";
import useArray from "../../hooks/useArray";
import NavBar from "../../component/NavBar";
import CartTab from "./CartTab";
import coffee_bean from "../../images/cart/coffee_bean.svg";
import cup_cofffee from "../../images/cart/cup_cofffee.svg";

function Cart() {
    const breakPoint = useStyleChange();
    const [showProduct, setShowProduct] = useState(true);
    const productList = useArray([]);
    const foodList = useArray([]);
    const styles = useMemo(() => {
        if (breakPoint === 1) {
            return {};
        } else {
            return {
                fakeBody: {
                    backgroundColor: "var(--CREAM)",
                },
            };
        }
    }, [breakPoint]);
    useEffect(() => {
        setTimeout(() => {
            productList.cto([
                {
                    id: 0,
                    picture: coffee_bean,
                    name: "藍山豆",
                    price: 250,
                    quantity: 2,
                },
                {
                    id: 1,
                    picture: coffee_bean,
                    name: "哥倫比亞豆",
                    price: 260,
                    quantity: 1,
                },
                {
                    id: 2,
                    picture: coffee_bean,
                    name: "巴西豆",
                    price: 120,
                    quantity: 3,
                },
                {
                    id: 3,
                    picture: coffee_bean,
                    name: "曼特寧豆",
                    price: 130,
                    quantity: 1,
                },
            ]);
        }, 50);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setTimeout(() => {
            foodList.cto([
                {
                    id: 0,
                    picture: cup_cofffee,
                    name: "咖啡拿鐵",
                    price: 120,
                    quantity: 1,
                },
                {
                    id: 1,
                    picture: cup_cofffee,
                    name: "美式咖啡",
                    price: 100,
                    quantity: 2,
                },
                {
                    id: 2,
                    picture: cup_cofffee,
                    name: "義式咖啡",
                    price: 100,
                    quantity: 1,
                },
                {
                    id: 3,
                    picture: cup_cofffee,
                    name: "摩卡咖啡",
                    price: 130,
                    quantity: 3,
                },
            ]);
        }, 50);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Fragment>
            <div style={styles.fakeBody}>
                <NavBar />
                <button onClick={() => setShowProduct(true)}>商品</button>
                <button onClick={() => setShowProduct(false)}>餐點</button>
                {showProduct ? (
                    <CartTab cartList={productList} />
                ) : (
                    <CartTab cartList={foodList} />
                )}
            </div>
        </Fragment>
    );
}
export default Cart;
