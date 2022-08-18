import { Fragment, useState, useCallback, useEffect } from "react";
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
import transitionStyles from "../../css/transition_group_animation.module.scss";

function CartTab() {
    const { cart_container, list_wrap, total_wrap, modal_body } = styles;
    const { tab_fade } = transitionStyles;
    const [deleteId, setDeleteId] = useState(-1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [bordTop, setBordTop] = useState(0);
    const [, setPriceInfo] = useState({
        total: 0,
        discount: 0,
    });
    const [nowList] = useData("nowList");
    const [list] = useData(nowList);
    const navigate = useNavigate();
    const confirmHandler = useCallback(() => {
        localStorage.setItem("nowList", nowList);
        localStorage.setItem("selectedCouponId", nowList);
        navigate("/cart/form", { replace: false });
    }, [navigate, nowList]);
    useEffect(() => {
        function scrollHandler() {
            if (window.scrollY <= 60) {
                setBordTop(0);
            } else {
                setBordTop(window.scrollY - 60);
            }
        }
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);
    return (
        <Fragment>
            <div className={cart_container}>
                <div className={list_wrap}>
                    {list.length >= 1 && <GoodsHeader />}
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={nowList}
                            timeout={250}
                            classNames={tab_fade}
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
                <div className={total_wrap} style={{ top: `${bordTop}px` }}>
                    <TotalHeader />
                    <TotalBord
                        confirmHandler={confirmHandler}
                        setPriceInfo={setPriceInfo}
                    />
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
