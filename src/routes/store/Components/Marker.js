import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: #000;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    cursor: ${(props) => (props.onClick ? "pointer" : "default")};
    &:hover {
        z-index: 1;
    }
`;

//const Marker = ({ text, onClick }) => <Wrapper alt={text} onClick={onClick} />;
const Marker = ({
    text,
    onClick,
    storeName,
    storeRoad,
    storeBlock,
    storePhoto,
    storeBus,
}) => {
    const [ShopPhotoOpen, setShopPhotoOpen] = useState(false);
    const [theShopPhotoImg, setTheShopPhotoImg] = useState(null);

    useEffect(() => {
        if (ShopPhotoOpen) {
            setTheShopPhotoImg(
                <>
                    <a
                        href={`https://ebus.gov.taipei/Stop/RoutesOfStop?Stopid=${storeBus}`}
                        className="theShopPhoto"
                    >
                        <img
                            src={require(`../../../images/Coupon/${storePhoto}`)}
                            alt=""
                        />
                        <div className="busTitle"><p>查看分店最近公車動態?</p></div>
                    </a>
                    
                </>
            );
        } else {
            setTheShopPhotoImg(null);
        }
    }, [ShopPhotoOpen]);
    return (
        <>
            {theShopPhotoImg}
            <div
                className="commentTip"
                onClick={() => setShopPhotoOpen(!ShopPhotoOpen)}
            >
                <div>{storeName}</div>
                <div>{storeRoad}</div>
                <div>{storeBlock}</div>
            </div>
            <Wrapper className="questionMark" alt={text} onClick={onClick} />;
        </>
    );
};

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};

export default Marker;
