import { Fragment } from "react";
import useData from "../../../../hooks/useData";
import GoodsHeader from "./GoodsHeader";
import styles from "./css/cartTab.module.scss";

function CartTab() {
    const { cart_container, list_wrap, total_wrap, modal_body } = styles;
    const [nowList] = useData("nowList");
    const [list] = useData(nowList);
    return (
        <Fragment>
            <div className={cart_container}>
                <div className={list_wrap}>
                    {list.length >= 1 && <GoodsHeader />}
                </div>
                <div className={total_wrap}></div>
            </div>
        </Fragment>
    );
}

export default CartTab;
