import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Box1 = styled.div`
    ${
        "" /* background: url("../../../images/Coupon/Shop01Photo.png") no-repeat !important; */
    }
`;
const Box2 = styled.div`
    ${"" /* background-color: tomato !important; */}
`;
const Box3 = styled.div`
    ${
        "" /* background: url("../../../images/Coupon/Shop03Photo.png") no-repeat !important; */
    }
`;

const StoreLoadingWrapLeft = styled(Slider)`
    .slick-slide {
        background-color: #ccc;
    }
    .slick-slide div {
        outline: none;
        width: 100%;
        margin: 0 auto;
        height: 700px;
    }
`;

export { StoreLoadingWrapLeft, Box1, Box2, Box3 };
