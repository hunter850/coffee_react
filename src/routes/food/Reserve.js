import { Fragment } from "react";
// import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import "./Reserve.css";
import NavBar from "../../component/NavBar/NavBar";

function Reserve() {
    return (
        <Fragment>
            <NavBar />
            <Path pathObj={{ path: ["．訂位"] }} />
            <div className="container">
                {/* <div className="reserve"> */}

                {/* </div> */}
            </div>
        </Fragment>
    );
}

export default Reserve;
