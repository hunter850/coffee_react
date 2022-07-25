import React from "react";
import Banner from "../../../images/frontpage/banner/banner-product.png";
// import Slider from "react-slick";
import "./Carousel.css";

// function Carousel () {
//     render() {
//         // const settings = {
//         //     dots: true, //是否顯示小圖點索引
//         //     autoplay: true,
//         //     infinite: true,
//         //     speed: 500,
//         //     slidesToShow: 1,
//         //     slidesToScroll: 1,
//         };
//         return (
//         //     <div>
//         //         <h2> Single Item</h2>
//         //         <Slider {...settings}>
//         //             <div>
//         //                 <h3>1</h3>
//         //             </div>
//         //             <div>
//         //                 <h3>2</h3>
//         //             </div>
//         //             <div>
//         //                 <h3>3</h3>
//         //             </div>
//         //             <div>
//         //                 <h3>4</h3>
//         //             </div>
//         //             <div>
//         //                 <h3>5</h3>
//         //             </div>
//         //             <div>
//         //                 <h3>6</h3>
//         //             </div>
//         //         </Slider>
//         //     </div>
//         // );
//     }
// }

// export default Carousel;
function Carousel() {
    return (
        <>
            <div>
                <img className="banner-w" src={Banner} alt="" />
            </div>
        </>
    );
}

export default Carousel;