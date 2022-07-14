import { Fragment, useEffect, useState, useMemo } from "react";
import { useStyleChange } from "../../Contexts/SuperProvider";
import useArray from "../../hooks/useArray";
import NavBar from "../../component/NavBar";
import GoodsHeader from "./components/GoodsHeader";
import GoodsList from "./components/GoodsList";
import TotalBord from "./components/TotalBord";
import Modal from "../../component/Modal/Modal";
import ModalContent from "./components/ModalContent";

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
                listWrap: {
                    width: "71.63%",
                },
                totalWrap: {
                    width: "28.37%",
                },
            };
        }
    }, [breakPoint]);
    useEffect(() => {
        setTimeout(() => {
            cartList.cto([
                {
                    id: 0,
                    picture:
                        "https://cdn.pixabay.com/photo/2019/02/25/04/06/coffee-4018874_960_720.jpg",
                    name: "藍山豆",
                    price: 250,
                    quantity: 2,
                },
                {
                    id: 1,
                    picture:
                        "https://cdn.pixabay.com/photo/2019/02/25/04/06/coffee-4018874_960_720.jpg",
                    name: "哥倫比亞豆",
                    price: 260,
                    quantity: 1,
                },
                {
                    id: 2,
                    picture:
                        "https://cdn.pixabay.com/photo/2019/02/25/04/06/coffee-4018874_960_720.jpg",
                    name: "巴西豆",
                    price: 120,
                    quantity: 3,
                },
                {
                    id: 3,
                    picture:
                        "https://cdn.pixabay.com/photo/2019/02/25/04/06/coffee-4018874_960_720.jpg",
                    name: "曼特寧豆",
                    price: 130,
                    quantity: 1,
                },
            ]);
        }, 50);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <NavBar />
            <h1>{breakPoint}</h1>
            <div>
                <div>
                    <GoodsHeader />
                    <GoodsList
                        cartList={cartList}
                        setDeleteId={setDeleteId}
                        setModalIsOpen={setModalIsOpen}
                    />
                </div>
                <div>
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
        </Fragment>
    );
}

export default Cart;
