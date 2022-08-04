import { Fragment, useState } from "react";
// import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import "./Reserve.css";
import NavBar from "../../component/NavBar/NavBar";
const places = [
    {
        key: "shop_1",
        lat: 25.03962792542701,
        lng: 121.55742720101652,
        text: "Cafe 1",
        storeName: "0+B 光復店",
        storeRoad: "光復南路300號",
        storeBlock: "大安區, 台北市, 106台灣",
    },
    {
        key: "shop_2",
        lat: 25.034320914178288,
        lng: 121.54372226899777,
        text: "Cafe 2",
        storeName: "0+B 光復店",
        storeRoad: "復興南路一段323號",
        storeBlock: "大安區, 台北市, 106台灣",
    },
    {
        key: "shop_3",
        lat: 25.041947238558986,
        lng: 121.54824003860637,
        text: "Cafe 3",
        storeName: "0+B 龍門店",
        storeRoad: "忠孝東路四段134號",
        storeBlock: "大安區, 台北市, 106台灣",
    },
    {
        key: "shop_4",
        lat: 25.03475717724878,
        lng: 121.52959140047166,
        text: "Cafe 4",
        storeName: "0+B 永康店",
        storeRoad: "永康街2號2樓",
        storeBlock: "大安區, 台北市, 106台灣",
    },
    {
        key: "shop_5",
        lat: 25.027059214520953,
        lng: 121.54864470715766,
        text: "Cafe 5",
        storeName: "0+B 敦和店",
        storeRoad: "敦化南路二段263號",
        storeBlock: "大安區, 台北市, 106台灣",
    },
    {
        key: "shop_6",
        lat: 25.05377904290978,
        lng: 121.54832427510259,
        text: "Cafe 6",
        storeName: "0+B 微風南京店",
        storeRoad: "南京東路三段337號",
        storeBlock: "松山區, 台北市, 106台灣",
    },
    {
        key: "shop_7",
        lat: 25.054012307531703,
        lng: 121.53708045485325,
        text: "Cafe 7",
        storeName: "0+B 南京建國店",
        storeRoad: "南京東路三段1號",
        storeBlock: "中山區, 台北市, 106台灣",
    },
    {
        key: "shop_8",
        lat: 25.05323475716153,
        lng: 121.56325881561968,
        text: "Cafe 8",
        storeName: "0+B 南京三民店",
        storeRoad: "南京東路五段171號",
        storeBlock: "松山區, 台北市, 106台灣",
    },
];

const peoples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const openhours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
];

function Reserve() {
    const [branch, setBranch] = useState("");
    const [people, setPeople] = useState("");
    const [hour, setHour] = useState("");
    return (
        <Fragment>
            <NavBar />
            <Path pathObj={{ path: ["．訂位"] }} />
            <div className="container">
                <div className="reserve">
                    <div className="branchchoice">
                        <div className="store">分店</div>

                        <select
                            className="a"
                            value={branch}
                            onChange={(e) => {
                                setBranch(e.target.value);
                            }}
                        >
                            <option value="" disabled>
                                請選擇分店
                            </option>
                            {places.map((v, i) => {
                                return <option key={i}>{v.storeName}</option>;
                            })}
                        </select>
                    </div>
                    <div className="branchchoice">
                        <div className="store">人數</div>

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
                        <div className="store">日期</div>

                        <select
                            className="a"
                            value={branch}
                            onChange={(e) => {
                                setBranch(e.target.value);
                            }}
                        >
                            <option value="-1">請選擇</option>
                            {places.map((v, i) => {
                                return <option key={i}>{v.storeName}</option>;
                            })}
                        </select>
                    </div>
                    <div className="branchchoice">
                        <div className="store">時段</div>

                        <select
                            className="a"
                            value={hour}
                            onChange={(e) => {
                                setHour(e.target.value);
                            }}
                        >
                            <option value="-1" disabled></option>
                            {openhours.map((v, i) => {
                                return <option key={i}>{v}</option>;
                            })}
                        </select>
                    </div>
                    <div className="branchchoice">
                        <div className="store">分店</div>

                        <select
                            className="a"
                            value={branch}
                            onChange={(e) => {
                                setBranch(e.target.value);
                            }}
                        >
                            <option value="-1">請選擇分店</option>
                            {places.map((v, i) => {
                                return <option key={i}>{v.storeName}</option>;
                            })}
                        </select>
                    </div>
                    <div className="price">
                        <div className="infor">價目表</div>
                        <div className="infor">分店資訊</div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Reserve;
