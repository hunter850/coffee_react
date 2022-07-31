import { Fragment, useCallback, useMemo } from "react";
import useData from "../../../../hooks/useData";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import Btn from "../../../../component/Item/Btn/Btn";
import axios from "axios";
import { getProduct, getFood } from "../../../../config/api-path";

function ModalContent(props) {
    const { deleteId, setModalIsOpen } = props;
    const { token } = useAuth();
    const [nowList] = useData("nowList");
    const [list, setList] = useData(nowList);
    const nowApiAddress = useMemo(() => {
        return nowList === "productList" ? getProduct : getFood;
    }, [nowList]);
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
            .then((result) => console.log(result.data))
            .catch((result) => {
                console.log(result);
                alert(result.response.data.error.message);
            });
        setList(list.filter((item) => item.id !== deleteId));
        setModalIsOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteId, list, setList, setModalIsOpen, nowApiAddress]);
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
