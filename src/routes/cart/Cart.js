import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import { useStyleChange } from "../../Contexts/SuperProvider";

function Cart() {
    const nowStyle = useStyleChange();

    return (
        <Fragment>
            <NavBar />
            <h1>{nowStyle}</h1>
        </Fragment>
    );
}

export default Cart;
