import { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../component/Member/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";
import React from "react";
import "./css/Getpoint.css";
// import SnakeGame from "./Components/SnakeGame";
import AlertItem from "./AlertItem/AlertItem";
import axios from "axios";
import ChatBot from "../../component/Bot/ChatBot";

function Getpoint() {
    const { token } = useAuth();
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const CheckPoint = async () => {
        await axios
            .get("http://localhost:3500/GetPoint/Api-check-point-result")
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
            alert("請先登入");
            navigate("/member/login");
            return;
        }
        CheckPoint();
    }, []);

    return (
        <Fragment>
            <NavBar />
            <div className="GetpointContainer">{/* <SnakeGame /> */}</div>
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
        </Fragment>
    );
}

export default Getpoint;
