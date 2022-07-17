import { Fragment, useState, react } from "react";
import NavBar from "../../component/NavBar";
import "./FrontPage.css";

function FrontPage() {
    return (
        <Fragment>
            <NavBar />
            <h2 className="color">首頁</h2>
        </Fragment>
    );
}

export default FrontPage;
