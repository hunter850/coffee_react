import NavBar from "../../component/NavBar/NavBar";
import "./css/GetCoupon.css";
import React from "react";
import CouponHandle from "./Components/CouponHandle";
import { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "../../component/Member/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal/Modal";
import ChatBot from "../../component/Bot/ChatBot";


function Getcoupon() {
    const { token } = useAuth();
    // ========
    let navigate = useNavigate();


    const segColors = [
        "#CCA375",
        "#FCFAF7",
        "#CCA375",
        "#FCFAF7",
        "#CCA375",
        "#FCFAF7",
        "#CCA375",
        "#FCFAF7",
        "#CCA375",
        "#FCFAF7",
    ];
    const myRefname = useRef(null);
    const [couponHandle, setCouponHandle] = useState(null);
    const [couponHandle2, setCouponHandle2] = useState(
        <>
            <CouponHandle
                segments={[
                    "焦糖瑪奇朵折30元",
                    "咖啡拿鐵5折",
                    "卡布奇諾5折",
                    "義式摩卡75折",
                    "耶加雪菲75折",
                    "宇治奶茶8折",
                    "精選曼巴咖啡組8折",
                    "黃金曼特寧組9折",
                    "購物優惠券9折",
                ]}
                segColors={segColors}
                onFinished={(winner) => onFinished(winner)}
                primaryColor="#56411C"
                contrastColor="#73605F"
                buttonText=""
                lightColor="#FFFFFF"
                darkColor="#000"
                darkTranparentColor="rgba(0,0,0,0.4)"
                isOnlyOnce={true}
                size={290}
                upDuration={100}
                downDuration={1000}
            />
        </>
    );
    const [couponHandle3, setCouponHandle3] = useState(null);

    const [init, setInit] = useState(false);
    if (!init) {
        fetch("http://localhost:3500/SendCoupon/api", {
            method: "GET",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => r.json())
            .then((result) => {
                // console.log(result);
                let couponArray = result.rows;
                const segments = couponArray.map((v, i) => {
                    return v.coupon_name;
                });
                setInit(true);
                setCouponHandle(
                    <>
                        <CouponHandle
                            segments={segments}
                            segColors={segColors}
                            // winningSegment={segments[2]}
                            onFinished={(winner) => onFinished(winner)}
                            primaryColor="#56411C"
                            contrastColor="#73605F"
                            buttonText=""
                            lightColor="#FFFFFF"
                            darkColor="#000"
                            darkTranparentColor="rgba(0,0,0,0.4)"
                            isOnlyOnce={true}
                            size={290}
                            upDuration={100}
                            downDuration={1000}
                        />
                    </>
                );
                setCouponHandle2(null);
            });
    }

    const onFinished = (winner) => {
        //console.log(winner);
    };

    const [isOpen, setIsOpen] = useState(false);

    const SendCoupon = (event) => {
        fetch("http://localhost:3500/SendCoupon/api-lottery-result", {
            method: "GET",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => r.json())
            .then((result) => {
                let couponArray = result.rows;
                const segments = couponArray.map((v, i) => {
                    return v.coupon_name;
                });
                let lotteryResult = result.lotteryResult;
                let alreadyTaken = result.error;
                if (alreadyTaken) {
                    setIsOpen(true);
                    return;
                }
                setCouponHandle3(
                    <>
                        <CouponHandle
                            segments={segments}
                            segColors={segColors}
                            winningSegment={lotteryResult.coupon_name}
                            onFinished={(winner) => onFinished(winner)}
                            primaryColor="#56411C"
                            contrastColor="#73605F"
                            buttonText=""
                            lightColor="#FFFFFF"
                            darkColor="#000"
                            darkTranparentColor="rgba(0,0,0,0.4)"
                            isOnlyOnce={true}
                            size={290}
                            upDuration={100}
                            downDuration={1000}
                        />
                    </>
                );
                setCouponHandle(null);
                setGetItem(null);
                setTimeout(() => document.querySelector("canvas").click());
            });
    };

    const [GetItem, setGetItem] = useState(
        <>
            <div className="HideLunchLogo"></div>
            <button className="GetResultBtn" onClick={SendCoupon}></button>
        </>
    );

    useEffect(() => {
        
        if (!token) {
            alert("請先登入");
            navigate("/member/login");
            return;
        }
    }, []);
    return (
        <>
            <NavBar />
            <div className="CouponHandleContainer">
                {couponHandle}
                {couponHandle2}
                {couponHandle3}
                {GetItem}
                <ChatBot />
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <Modal.Header></Modal.Header>
                    <Modal.Body style={{ padding: "24px 36px" }}>
                        今天抽過囉~~ 大專加油
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default Getcoupon;
