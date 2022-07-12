import { Fragment } from "react";
import { useStyleChange } from "../../Contexts/SuperProvider";
import NavBar from "../../component/NavBar";
import GoodsList from "./components/GoodsList";

function Cart() {
    // useStyleChange();若window.innerWidth <= 375 回傳 1 反之回傳 0
    const nowStyle = useStyleChange();

    return (
        <Fragment>
            <NavBar />
            <h1>{nowStyle}</h1>
            <GoodsList />
        </Fragment>
    );
}

export default Cart;
