import { Fragment } from "react";
import NavBar from "../../component/NavBar";

const Food = () => {
    const el = (
        <Fragment>
            <NavBar />
            <h2>點餐</h2>
        </Fragment>
    )

    return el;
}

export default Food