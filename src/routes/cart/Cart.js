import { useEffect, useState, useMemo } from "react";
import { useStyleChange } from "../../Contexts/SuperProvider";
import useArray from "../../hooks/useArray";
import NavBar from "../../component/NavBar";
import GoodsHeader from "./components/GoodsHeader";
import GoodsList from "./components/GoodsList";
import TotalHeader from "./components/TotalHeader";
import TotalBord from "./components/TotalBord";
import Modal from "../../component/Modal/Modal";
import ModalContent from "./components/ModalContent";
import coffee_bean from "../../images/cart/coffee_bean.svg";

function Cart() {
    // useStyleChange();若window.innerWidth <= 375 回傳 1 反之回傳 0
    const breakPoint = useStyleChange();
    const [deleteId, setDeleteId] = useState(-1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const cartList = useArray([]);
    const styles = useMemo(() => {
        if (breakPoint === 1) {
            return {};
        } else {
            return {
                fakeBody: {
                    backgroundColor: "var(--CREAM)",
                },
                cartContainer: {
                    width: "100%",
                    padding: "0px 200px",
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "1440px",
                    margin: "48px auto 0px",
                    backgroundColor: "var(--CREAM)",
                    outline: "1px solid red",
                },
                listWrap: {
                    width: "71.63%",
                },
                totalWrap: {
                    width: "25%",
                },
            };
        }
    }, [breakPoint]);
    useEffect(() => {
        setTimeout(() => {
            cartList.cto([
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

    return (
        <div style={styles.fakeBody}>
            <NavBar />
            <div style={styles.cartContainer}>
                <div style={styles.listWrap}>
                    {cartList.clength() >= 1 && <GoodsHeader />}
                    <GoodsList
                        cartList={cartList}
                        setDeleteId={setDeleteId}
                        setModalIsOpen={setModalIsOpen}
                    />
                </div>
                <div style={styles.totalWrap}>
                    <TotalHeader />
                    <TotalBord />
                </div>
            </div>
            <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
                <ModalContent
                    cartList={cartList}
                    deleteId={deleteId}
                    setModalIsOpen={setModalIsOpen}
                />
            </Modal>
        </div>
    );
}

export default Cart;
