import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar";
import "./css/Points.css";
import axios from "axios";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import moment from "moment";

// ===========

function Points() {
    let location = useLocation();
    const [TheTotalPoints, setTheTotalPoints] = useState(null);
    const [CouponList, setCouponList] = useState(null);

    const [searchParams] = useSearchParams();
    // console.log(searchParams.get("type"));
    let type = parseInt(searchParams.get("type"));
    if (isNaN(type)) {
        type = 1;
    }

    const Points = async () => {
        await axios.get("http://localhost:3500/Points/API").then((result) => {
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
                            <tr className=" load" key={i}>
                                <td>
                                    {moment(v.create_at).format("YYYY-MM-DD")}
                                </td>
                                <td>
                                    {type === 1
                                        ? "每日簽到獎勵"
                                        : "咖啡拿鐵兌換券"}
                                </td>
                                <td>{v.points_get}</td>
                            </tr>
                        );
                    })}
                </>
            );
        });
    };
    useEffect(() => {
        Points();
    }, [location]);
    return (
        <Fragment>
            <NavBar />
            <div className="PointContainer">
                <section>
                    <div>查看我的積分表</div>
                </section>
                <div className="display_justify_content load m10">
                    <p>目前有</p>
                    <p style={{ color: "#red" }}>{TheTotalPoints}</p>
                    <p>可用積分</p>
                </div>
                <div className="display_justify_content load m10">
                    <div className=" display_justify_content wrapper">
                        {/* <a
                            className="recordstyle button <%=  type == 1 ? 'active' : '' %> "
                            href="?type=1"
                        >
                            獲取紀錄
                        </a> */}
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
                        {/* <a
                            className="button theUse <%=  type == 2 ? 'active' : '' %>"
                            href="?type=2"
                        >
                            使用記錄
                        </a> */}
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
                        <table className="table">
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
                            <tbody className="bg">
                                {/* <% for(let i of rows){ %>
                                    <tr className=" load">
                                        <td><%= toDateString(i.create_at) %></td>
                                        <td><%= type == 1 ? '每日簽到獎勵' : '咖啡拿鐵兌換券'; %></td>
                                        <td><%= i.points_get %></td>
                                    </tr>
                                <% } %> */}
                                {CouponList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Points;
