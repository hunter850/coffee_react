import { Fragment, useState } from "react";
import useData from "../../../../hooks/useData";
// eslint-disable-next-line no-unused-vars
import Modal from "../../../../component/Modal/Modal";
import ModalContent from "./ModalContent";
import GoodsHeader from "./GoodsHeader";
import GoodsList from "./GoodsList";
import styles from "./css/cartTab.module.scss";

function CartTab() {
    const { cart_container, list_wrap, total_wrap, modal_body } = styles;
    const [deleteId, setDeleteId] = useState(-1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nowList] = useData("nowList");
    const [list] = useData(nowList);
    return (
        <Fragment>
            <div className={cart_container}>
                <div className={list_wrap}>
                    {list.length >= 1 && <GoodsHeader />}
                    <GoodsList
                        setDeleteId={setDeleteId}
                        setModalIsOpen={setModalIsOpen}
                    />
                </div>
                <div className={total_wrap}></div>
            </div>
            <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
                <Modal.Body className={modal_body}>
                    <ModalContent
                        deleteId={deleteId}
                        setModalIsOpen={setModalIsOpen}
                    />
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}

export default CartTab;
