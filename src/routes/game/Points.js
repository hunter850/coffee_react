import { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../component/Member/AuthContextProvider";
import NavBar from "../../component/NavBar/NavBar";
// import "./css/Points.css";
import "./css/Points.scss";

import axios from "axios";
import { Link, useLocation, useSearchParams,useNavigate } from "react-router-dom";
import moment from "moment";
import ChatBot from "../../component/Bot/ChatBot";

function Points() {
    const { token } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    const [TheTotalPoints, setTheTotalPoints] = useState(null);
    const [CouponList, setCouponList] = useState(null);

    const [searchParams] = useSearchParams();
    // console.log(searchParams.get("type"));
    let type = parseInt(searchParams.get("type"));
    if (isNaN(type)) {
        type = 1;
    }
    // console.log(122345);
    // console.log(type);

    const Points = async () => {
        await axios
            .get("http://localhost:3500/Points/API", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                params: { type: type },
            })
            .then((result) => {
                setTheTotalPoints(
                    <>
                        {result.data.rows2.map((v, i) => {
                            return <p key={i}>{v.total_points}</p>;
                        })}
                    </>
                );
                setCouponList(
                    <>
                        {result.data.rows.map((v, i) => {
                            return (
                                <tr key={i}>
                                    <td className="loadc">
                                        {moment(v.create_at).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </td>
                                    <td className="loadc">
                                        {type === 1
                                            ? "每日簽到獎勵"
                                            : "咖啡拿鐵兌換券"}
                                    </td>
                                    <td className="loadc">{v.points_get}</td>
                                </tr>
                            );
                        })}
                    </>
                );
            });
    };
    useEffect(() => {
        if (!token) { 
            alert("請先登入");
            navigate("/member/login");
            return;
        }
        Points();

    }, [location]);
    return (
        <Fragment>
            <NavBar />
            <div className="PointContainer">
                <div className="display_justify_content m10">
                    <p>目前有</p>
                    <p style={{ color: "#B79973", fontWeight: "500" }}>
                        {TheTotalPoints}
                    </p>
                    <p>可用積分</p>
                </div>
                <div>
                    <Link
                        to={{
                            pathname: "/PointsToCoupon",
                            search: "",
                        }}
                        className="PointsToCouponLink"
                    >
                        點擊轉優惠券
                    </Link>
                </div>
                <div className="display_justify_content  m10">
                    <div className=" display_justify_content wrapper">
                        <Link
                            to={{
                                pathname: "/points",
                                search: "type=1",
                            }}
                            className={`link1 Pbutton ${
                                type === 1 ? "active" : " "
                            }`}
                        >
                            獲取紀錄
                        </Link>
                    </div>
                    <div className=" display_justify_content wrapper">
                        <Link
                            to={{
                                pathname: "/points",
                                search: "type=2",
                            }}
                            className={`link1 Pbutton ${
                                type === 2 ? "active" : " "
                            }`}
                        >
                            使用記錄
                        </Link>
                    </div>
                </div>
                <div id="points_record" className="display_justify_content">
                    <div
                        id="points_record_table_a"
                        className="display_justify_content tableStyle"
                    >
                        <table className="Pstable">
                            <thead>
                                <tr>
                                    <th scope="col" className="th1">
                                        日期
                                    </th>
                                    <th scope="col" className="th2">
                                        類別
                                    </th>
                                    <th scope="col" className="th3">
                                        {type == 1 ? "已獲得" : "已兌換"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg">{CouponList}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ChatBot />
        </Fragment>
    );
}

export default Points;
