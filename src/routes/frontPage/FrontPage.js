import { Fragment } from "react";
import NavBar from "../../component/NavBar";

const FrontPage = () => {
    const el = (
        <Fragment>
            <NavBar />
            <h2>首頁</h2>
        </Fragment>
    )

    return el;
}

export default FrontPage