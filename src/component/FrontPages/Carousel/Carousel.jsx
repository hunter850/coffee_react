import React from "react";
import Banner from "../../../images/frontpage/banner/banner-product.png";
import './Carousel.css'

function Carousel() {
    return (
        <>
            <div>
                <img className="banner-w" src={Banner} alt="" />
            </div>
            {/* <h2 className="titletext">我是測試</h2> */}
        </>
    );
}

export default Carousel;
