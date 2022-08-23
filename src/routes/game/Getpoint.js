import { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../component/Member/AuthContextProvider";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";
import React from "react";
import Modal from "../../component/Modal/Modal";
import Btn from "../../component/Item/Btn/Btn";
// import "./css/Getpoint.css";
import "./css/Getpoint.scss";
import SnakeGame from "./Components/SnakeGame";
import AlertItem from "./AlertItem/AlertItem";
import axios from "axios";
import ChatBot from "../../component/Bot/ChatBot";
import PacmanLoader from "react-spinners/PacmanLoader";
import GameBGM from "../../images/Coupon/GameBGM.mp3";
import useSound from "use-sound";
// import sounds from "../../images/Coupon/yisell_sound_201404102304403674_88366.mp3";
function Getpoint() {
    const [isOpen1, setIsOpen1] = useState(true);
    const [play, { stop }] = useSound(GameBGM, {
        volume: 0.4,
    });
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#B79973");
    const { token } = useAuth();
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const CheckPoint = async () => {
        await axios
            .get("http://localhost:3500/GetPoint/Api-check-point-result", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                let alreadyTaken = result.data.error;
                if (alreadyTaken) {
                    setIsOpen(true);
                    return;
                }
            });
    };
    useEffect(() => {
        if (!token) {
            // alert("請先登入");
            // navigate("/member/login");
            // return;
            setIsOpen1(
                <>
                    <AlertItem
                        isOpen={isOpen1}
                        setIsOpen={setIsOpen1}
                        style={{ margintop: "60px" }}
                    >
                        <AlertItem.Body style={{ padding: "24px 36px" }}>
                            請先登入
                        </AlertItem.Body>
                        <AlertItem.Footer></AlertItem.Footer>
                    </AlertItem>
                </>
            );
            return;
        }
        setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 4000);
        CheckPoint();
    }, []);

    function StartGame() {
        setLoading(false);
    }
    if (loading) {
        return (
            <>
                <NavBar />
                <div className="PacmanLoaderContainer" onClick={StartGame}>
                    <div className="PacmanLoaderContainerInner">
                        <div className="GameLoading">Game Loading</div>
                        <PacmanLoader color={color} />
                    </div>
                    <pre className="GameLoading"> 點擊開始遊戲</pre>
                </div>
            </>
        );
    }

    return (
        <Fragment>
            <NavBar />
            <div
                className="GetpointContainerOutside"
                onMouseEnter={() => play()}
                onMouseLeave={() => stop()}
            >
                <div className="GetpointContainer">
                    <SnakeGame />
                </div>
            </div>
            <AlertItem
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                style={{ margintop: "60px" }}
            >
                <AlertItem.Body style={{ padding: "24px 36px" }}>
                    當日已獲得積分
                </AlertItem.Body>
                <AlertItem.Footer></AlertItem.Footer>
            </AlertItem>
            <ChatBot />
            {isOpen1}
        </Fragment>
    );
}

export default Getpoint;
