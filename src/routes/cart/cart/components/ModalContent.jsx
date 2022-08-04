import { Fragment, useCallback } from "react";
import useData from "../../../../hooks/useData";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { useNav } from "../../../../Contexts/NavProvider";
import Btn from "../../../../component/Item/Btn/Btn";
import axios from "axios";
import { getProduct, getFood } from "../../../../config/api-path";
import styles from "./css/modalContent.module.scss";

function ModalContent(props) {
    const { deleteId, setModalIsOpen } = props;
    const { modal_wrap, confirm_button, cancel_button } = styles;
    const { token } = useAuth();
    const [nowList] = useData("nowList");
    const [list, setList] = useData(nowList);
    const nowApiAddress = nowList === "productList" ? getProduct : getFood;
    const { getCount } = useNav();
    const deleteHandler = useCallback(() => {
        axios
            .delete(nowApiAddress, {
                params: {
                    data: deleteId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                // console.log(result.data);
                getCount();
            })
            .catch((result) => {
                console.log(result);
                alert(result.response.data.error.message);
            });
        setList(list.filter((item) => item.id !== deleteId));
        setModalIsOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteId, list, setList, setModalIsOpen, nowApiAddress]);
    const cancelHandler = () => {
        setModalIsOpen(false);
    };
    return (
        <Fragment>
            <p>您確定要刪除該商品嗎 ? </p>
            <div className={modal_wrap}>
                <Btn
                    className={confirm_button}
                    onClick={deleteHandler}
                    width="75px"
                >
                    確定
                </Btn>
                <Btn
                    onClick={cancelHandler}
                    className={cancel_button}
                    color="#253945"
                    backgroundColor="#fff"
                    width="75px"
                >
                    取消
                </Btn>
            </div>
        </Fragment>
    );
}

export default ModalContent;
