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
            <Btn onClick={deleteHandler}>確定</Btn>
            <Btn
                onClick={cancelHandler}
                style={{ border: "1px solid #253945" }}
                color="#253945"
                backgroundColor="white"
            >
                取消
            </Btn>
        </Fragment>
    );
}

export default ModalContent;
