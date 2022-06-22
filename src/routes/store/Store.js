import { Fragment } from "react";
import NavBar from "../../component/NavBar";

const Store = () => {
    const el = (
        <Fragment>
            <NavBar />
            <h2>店家資訊</h2>
        </Fragment>
    )

    return el;
}

export default Store