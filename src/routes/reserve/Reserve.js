import { Fragment, useState, useMemo, useContext } from "react";
// import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import "./Reserve.css";
import NavBar from "../../component/NavBar/NavBar";
import Calendar from "./Calendar";
import axios from "axios";
import { sendMail } from "../../config/api-path";
import Modal from "../../component/Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import Chatbot from "../../component/Bot/ChatBot";
import AuthContext from "../../component/Member/AuthContext";
import Footer from "../../component/Footer";

const places = [
    {
        key: "shop_1",
        lat: 25.03962792542701,
        lng: 121.55742720101652,
        text: "Cafe 1",
        storeName: "0+B 光復店",
        storeRoad: "光復南路300號",
        storeBlock: "台北市大安區",
    },
    {
        key: "shop_2",
        lat: 25.034320914178288,
        lng: 121.54372226899777,
        text: "Cafe 2",
        storeName: "0+B 光復店",
        storeRoad: "復興南路一段323號",
        storeBlock: "台北市大安區",
    },
    {
        key: "shop_3",
        lat: 25.041947238558986,
        lng: 121.54824003860637,
        text: "Cafe 3",
        storeName: "0+B 龍門店",
        storeRoad: "忠孝東路四段134號",
        storeBlock: "台北市大安區",
    },
    {
        key: "shop_4",
        lat: 25.03475717724878,
        lng: 121.52959140047166,
        text: "Cafe 4",
        storeName: "0+B 永康店",
        storeRoad: "永康街2號2樓",
        storeBlock: "台北市大安區",
    },
    {
        key: "shop_5",
        lat: 25.027059214520953,
        lng: 121.54864470715766,
        text: "Cafe 5",
        storeName: "0+B 敦和店",
        storeRoad: "敦化南路二段263號",
        storeBlock: "台北市大安區",
    },
    {
        key: "shop_6",
        lat: 25.05377904290978,
        lng: 121.54832427510259,
        text: "Cafe 6",
        storeName: "0+B 微風南京店",
        storeRoad: "南京東路三段337號",
        storeBlock: "台北市松山區",
    },
    {
        key: "shop_7",
        lat: 25.054012307531703,
        lng: 121.53708045485325,
        text: "Cafe 7",
        storeName: "0+B 南京建國店",
        storeRoad: "南京東路三段1號",
        storeBlock: "台北市中山區",
    },
    {
        key: "shop_8",
        lat: 25.05323475716153,
        lng: 121.56325881561968,
        text: "Cafe 8",
        storeName: "0+B 南京三民店",
        storeRoad: "南京東路五段171號",
        storeBlock: "台北市松山區 ",
    },
];

const peoples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Reserve() {
    const [branch, setBranch] = useState("");
    const [people, setPeople] = useState("");
    const [hour, setHour] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const Auth = useContext(AuthContext);
    const checkedDate = hour.toLocaleString();
    const { mail, name } = Auth;
    const selectItem = useMemo(
        () => places.find((item) => item.storeName === branch),
        [places, branch]
    );

    const handleSubmission = (e) => {
        if (!branch || !checkedDate || !people) {
            return false;
        }
        try {
            if (Auth.sid)
                axios({
                    method: "post",
                    url: sendMail,
                    data: {
                        selectItem,
                        people,
                        checkedDate,
                        mail,
                        name,
                        member: Auth ? Auth : "沒東西",
                    },

                    "content-type": "application/json",
                }).then((response) => {
                    // console.log(response);
                    setIsOpen(true);
                });
            else {
                setIsOpen(true);
            }
        } catch (error) {
            // console.log("error");
        }
    };
    const reserveBtn = branch && people && hour ? "submit" : "submit disabled";

    const memberLogin = (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    color: "var(--BLUE)",
                    padding: "40px",
                }}
            >
                <h4>訂位成功</h4>
            </Link>
        </Modal>
    );

    const memberLogout = (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    color: "var(--BLUE)",
                    padding: "40px",
                }}
            >
                <h4>請先登入</h4>
            </Link>
        </Modal>
    );
    return (
        <Fragment>
            <NavBar />
            <div className="Food-container">
                <Path pathObj={{ path: ["．訂位"] }} />
                <div className="container">
                    <div className="reserve">
                        <div className="branchchoice">
                            <h6 className="store">分店</h6>

                            <select
                                className="a"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            >
                                <option value="" disabled>
                                    請選擇分店
                                </option>
                                {places.map((v) => {
                                    return (
                                        <option key={v.key}>
                                            {v.storeName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="branchchoice">
                            <h6 className="store">人數</h6>

                            <select
                                className="a"
                                value={people}
                                onChange={(e) => {
                                    setPeople(e.target.value);
                                }}
                            >
                                <option value="" disabled></option>
                                {peoples.map((v, i) => {
                                    return <option key={i}>{v}</option>;
                                })}
                            </select>
                        </div>
                        <div className="branchchoice">
                            <h6 className="store">日期</h6>
                            <Calendar hour={hour} setHour={setHour} />
                        </div>

                        <div className={reserveBtn} onClick={handleSubmission}>
                            <h6>送出</h6>
                        </div>
                        <div className="price">
                            {/* <p className="infor">價目表</p>
                            <div className="infor">分店資訊</div> */}
                        </div>
                        <p className="reserve-txt">
                            【線上訂位說明】
                            網路預約訂位以十人以內為限，訂位隔日起 ~
                            一個月內；十人以上訂位或包場需求，僅接受電話預約。
                            <br /> <br />
                            ★用餐當日訂位保留時間為10分鐘，請準時入席，逾時將取消訂位。座位將依餐廳當日訂位排定且無法指定座位，亦不接受現場臨時增加人數；若要變更人數，請於用餐前一日18:00前與餐廳聯繫，若需增加人數，視現場訂位狀況決定，敬請見諒。
                            <br />
                            ★若需取消或更改訂位，請提前告知。
                            <br />
                            ★如逾時取消訂位欲候補座位，再視現場訂位狀況而定。
                            <br />
                            ★網路訂位是否成功，可至「訂位紀錄」進行查詢。
                            <br />
                            ★網路訂位成功者，如未到場且未於線上或電話通知取消訂位，視同「訂位未到且未提前通知取消」，「訂位未到且未提前通知取消」次數達到三次，系統將取消您的網路訂位資格，造成不便敬請見諒。
                            【為提供最好的用餐經驗與品質，請詳閱上述訂位說明，感謝您的配合並期待您的光臨！】
                        </p>
                    </div>
                </div>
            </div>
            {Auth.sid ? memberLogin : memberLogout}
            <Chatbot />
            <br />
            <Footer />
        </Fragment>
    );
}

export default Reserve;
