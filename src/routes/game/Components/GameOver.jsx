import { React, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../component/Member/AuthContextProvider";

function GameOver(props) {
    const { token } = useAuth();
    // const [points, setPoints] = useState(null);

    const ScoreResult = props.score;

    // const currentPoints = () => {
    //     axios
    //         .get("http://localhost:3500/PointsToCoupon/API", {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((result) => {
    //             setPoints(result.data.rows[0].total_points);
    //         });
    // };
    // let theNewTotalPoints = ScoreResult + points;
    // console.log(ScoreResult);
    // console.log(points);
    // console.log(theNewTotalPoints);
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
        // currentPoints();
        // setTimeout(() => {
        SendPointResult();
        // }, 2000);
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
