import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar";
import React from "react";
import "./css/Getpoint.css";
// import SnakeGame from "./Components/SnakeGame";
import AlertItem from "./AlertItem/AlertItem";
import axios from "axios";

function Getpoint() {
    const [isOpen, setIsOpen] = useState(false);

    const CheckPoint = async () => {
        await axios
            .get("http://localhost:3500/GetPoint/Api-check-point-result")
            .then((result) => {
                console.log(result);
                let alreadyTaken = result.data.error;
                console.log(alreadyTaken);
                if (alreadyTaken) {
                    setIsOpen(true);
                    return;
                }
            });
    };
    useEffect(() => {
        CheckPoint();
    }, []);

    return (
        <Fragment>
            <NavBar />
            <div className="GetpointContainer">
                {/* <SnakeGame /> */}
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
        </Fragment>
    );
}

export default Getpoint;
