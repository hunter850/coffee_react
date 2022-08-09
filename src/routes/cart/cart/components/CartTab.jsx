import { Fragment, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../../../../hooks/useData";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Modal from "../../../../component/Modal/Modal";
import ModalContent from "./ModalContent";
import GoodsHeader from "./GoodsHeader";
import GoodsList from "./GoodsList";
import TotalHeader from "./TotalHeader";
import TotalBord from "./TotalBord";
import styles from "./css/cartTab.module.scss";

function CartTab() {
    const { cart_container, list_wrap, total_wrap, modal_body } = styles;
    const [deleteId, setDeleteId] = useState(-1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nowList] = useData("nowList");
    const [list] = useData(nowList);
    const navigate = useNavigate();
    const confirmHandler = useCallback(() => {
        navigate("/cart/form", { replace: false });
    }, [navigate]);
    return (
        <Fragment>
            <div className={cart_container}>
                <div className={list_wrap}>
                    {list.length >= 1 && <GoodsHeader />}
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={nowList}
                            timeout={250}
                            classNames="tab-fade"
                            appear={false}
                        >
                            {nowList === "productList" ? (
                                <GoodsList
                                    setDeleteId={setDeleteId}
                                    setModalIsOpen={setModalIsOpen}
                                    listName={"productList"}
                                />
                            ) : (
                                <GoodsList
                                    setDeleteId={setDeleteId}
                                    setModalIsOpen={setModalIsOpen}
                                    listName={"foodList"}
                                />
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                </div>
                <div className={total_wrap}>
                    <TotalHeader />
                    <TotalBord confirmHandler={confirmHandler} />
                </div>
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
