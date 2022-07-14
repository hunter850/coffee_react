import { Fragment, useCallback } from "react";
import Btn from "../../../component/Item/Btn/Btn";

function ModalContent(props) {
    const { cartList, deleteId, setModalIsOpen } = props;
    const deleteHandler = useCallback(() => {
        cartList.cto(cartList.value.filter((item) => item.id !== deleteId));
        setModalIsOpen(false);
    }, [cartList, deleteId, setModalIsOpen]);
    const cancelHandler = useCallback(() => {
        setModalIsOpen(false);
    }, [setModalIsOpen]);
    return (
        <Fragment>
            <p>您確定要刪除該商品嗎 ? </p>
            <div style={{ marginTop: "12px", textAlign: "end" }}>
                <Btn
                    style={{ fontSize: "13px", marginRight: "4px" }}
                    onClick={deleteHandler}
                    width="75px"
                >
                    確定
                </Btn>
                <Btn
                    onClick={cancelHandler}
                    style={{ border: "1px solid #253945", fontSize: "13px" }}
                    color="#253945"
                    backgroundColor="white"
                    width="75px"
                >
                    取消
                </Btn>
            </div>
        </Fragment>
    );
}

export default ModalContent;
