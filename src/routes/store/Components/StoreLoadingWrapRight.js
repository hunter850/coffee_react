import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Box4 = styled.div`
    ${
        "" /* background: url("../../../images/Coupon/Shop01Photo.png") no-repeat !important; */
    }
`;
const Box5 = styled.div`
    ${"" /* background-color: tomato !important; */}
`;
const Box6 = styled.div`
    ${
        "" /* background: url("../../../images/Coupon/Shop03Photo.png") no-repeat !important; */
    }
`;

const StoreLoadingWrapRight = styled(Slider)`
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

export { StoreLoadingWrapRight, Box4, Box5, Box6 };
