import { React, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../component/Member/AuthContextProvider";
// import { useNavigate } from "react-router-dom";
// import GameBGM from "../../../images/Coupon/GameBGM.mp3";
// import useSound from "use-sound";
function GameOver(props) {
    const { token } = useAuth();
    const ScoreResult = props.score;
    // let navigate = useNavigate();
    const SendPointResult = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        axios
            .post(
                "http://localhost:3500/GetPoint/Api-point-result",
                {
                    ScoreResult: ScoreResult,
                    // theNewTotalPoints: theNewTotalPoints,
                },
                {
                    headers: headers,
                }
            )
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        SendPointResult();
    }, []);

    return (
        <div
            id="GameBoard"
            style={{
                width: props.width + 5,
                height: props.height + 15,
                borderWidth: props.width / 50,
            }}
        >
            <div id="GameOver" style={{ fontSize: props.width / 15 }}>
                <div id="GameOverText">恭喜!本日獲取</div>
                <div id="TotalScore"> {props.score} 積分</div>
            </div>
        </div>
    );
}

export default GameOver;
