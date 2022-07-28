import { useState, Fragment } from "react";
import GoodsHeader from "./components/GoodsHeader";
import GoodsList from "./components/GoodsList";
import TotalHeader from "./components/TotalHeader";
import TotalBord from "./components/TotalBord";
import Modal from "../../component/Modal/Modal";
import ModalContent from "./components/ModalContent";
import styles from "./css/cartTab.module.scss";
import useData from "../../hooks/useData";

function CartTab(props) {
    const {
        cartList,
        coupons,
        showProduct,
        selectedCouponId,
        setSelectedCouponId,
        listName,
    } = props;
    const { cart_container, list_wrap, total_wrap, modal_body } = styles;
    const [deleteId, setDeleteId] = useState(-1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [list, setList] = useData(listName);

    return (
        <Fragment>
            <pre>{JSON.stringify(list, null, 4)}</pre>
            <div className={cart_container}>
                <div className={list_wrap}>
                    {cartList.clength() >= 1 && (
                        <GoodsHeader showProduct={showProduct} />
                    )}
                    <GoodsList
                        cartList={cartList}
                        setDeleteId={setDeleteId}
                        setModalIsOpen={setModalIsOpen}
                    />
                </div>
                <div className={total_wrap}>
                    <TotalHeader
                        coupons={coupons}
                        selectedCouponId={selectedCouponId}
                        setSelectedCouponId={setSelectedCouponId}
                    />
                    <TotalBord />
                </div>
            </div>
            <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
                <Modal.Body className={modal_body}>
                    <ModalContent
                        cartList={cartList}
                        deleteId={deleteId}
                        setModalIsOpen={setModalIsOpen}
                    />
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}

export default CartTab;
