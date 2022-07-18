import { useState, useMemo, Fragment } from "react";
import { useStyleChange } from "../../Contexts/SuperProvider";
import GoodsHeader from "./components/GoodsHeader";
import GoodsList from "./components/GoodsList";
import TotalHeader from "./components/TotalHeader";
import TotalBord from "./components/TotalBord";
import Modal from "../../component/Modal/Modal";
import ModalContent from "./components/ModalContent";

function CartTab(props) {
    const { cartList, coupons } = props;
    // useStyleChange();若window.innerWidth <= 375 回傳 1 反之回傳 0
    const breakPoint = useStyleChange();
    const [deleteId, setDeleteId] = useState(-1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
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
                modalBody: {
                    padding: "24px 36px",
                },
            };
        }
    }, [breakPoint]);

    return (
        <Fragment>
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
                    <TotalHeader coupons={coupons} />
                    <TotalBord />
                </div>
            </div>
            <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
                <Modal.Body style={styles.modalBody}>
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
