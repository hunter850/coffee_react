import React from "react";
import Banner from "../../../images/frontpage/banner/banner-product.png";

function Carousel() {
    return (
        <>
            <div>
                <img className="banner-w" src={Banner} alt="" />
            </div>
            <h1>輪播牆</h1>
            <p>你好</p>
        </>
    );
}

export default Carousel;
