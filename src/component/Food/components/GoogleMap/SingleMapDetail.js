import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { mapAPI } from "../../../../config/api-path";
import "./GoogleMap.scss";

const shops_dummy = [
    {
        store_sid: 1,
        key: 1,
        store_name: "0+B 光復店",
        store_road: "光復南路300號",
        store_block: "大安區, 台北市, 106台灣",
        lat: 25.03962792542701,
        lng: 121.55742720101652,
    },
    {
        store_sid: 2,
        key: 2,
        store_name: "0+B 復興店",
        store_road: "復興南路一段323號",
        store_block: "大安區, 台北市, 106台灣",
        lat: 25.034320914178288,
        lng: 121.54372226899777,
    },
    {
        store_sid: 3,
        key: 3,
        store_name: "0+B 龍門店",
        store_road: "忠孝東路四段134號",
        store_block: "大安區, 台北市, 106台灣",
        lat: 25.041947238558986,
        lng: 121.54824003860637,
    },
    {
        store_sid: 4,
        key: 4,
        store_name: "0+B 永康店",
        store_road: "永康街2號2樓",
        store_block: "大安區, 台北市, 106台灣",
        lat: 25.03475717724878,
        lng: 121.52959140047166,
    },
    {
        store_sid: 5,
        key: 5,
        store_name: "0+B 敦和店",
        store_road: "敦化南路二段263號",
        store_block: "大安區, 台北市, 106台灣",
        lat: 25.027059214520953,
        lng: 121.54864470715766,
    },
    {
        store_sid: 6,
        key: 6,
        store_name: "0+B 微風南京店",
        store_road: "南京東路三段337號",
        store_block: "松山區, 台北市, 106台灣",
        lat: 25.05377904290978,
        lng: 121.54832427510259,
    },
    {
        store_sid: 7,
        key: 7,
        store_name: "0+B 南京建國店",
        store_road: "南京東路三段1號",
        store_block: "中山區, 台北市, 106台灣",
        lat: 25.054012307531703,
        lng: 121.53708045485325,
    },
    {
        store_sid: 8,
        key: 8,
        store_name: "0+B 南京三民店",
        store_road: "南京東路五段171號",
        store_block: "松山區, 台北市, 106台灣",
        lat: 25.05323475716153,
        lng: 121.56325881561968,
    },
];

// 我的位置
const MyPositionMarker = ({ text }) => <div>{text}</div>;

const SingleMapDetail = (props) => {
    // 從SQL拿googlemap Key
    const [apiFromSql, setApiFromSql] = useState([]);
    useEffect(() => {
        const mapAPiGet = async () => {
            const response = await axios.get(mapAPI);
            setApiFromSql(response.data);
        };
        mapAPiGet();
    }, []);
    if (apiFromSql.length > 0) {
        console.log("key!!!!", apiFromSql[0].mapapi_key);
    }

    // -----------------------------------------------------
    const [myPosition, setMyPosition] = useState(props.center); // 讀取後會呈現 {lat: 25.042061, lng: 121.5414114}
    const { setStoreInfo, storeInfo } = props;
    const { store_name, store_road, store_block, store_sid } = storeInfo;
    const initialState = { store_name: "", store_block: "", store_road: "" };
    // 預設位置

    const ShopMarker = ({
        icon,
        store_name,
        store_block,
        store_road,
        store_sid,
    }) => (
        <div>
            <img
                src={icon}
                alt="coffee"
                onClick={() => {
                    setStoreInfo({
                        store_name,
                        store_block,
                        store_road,
                        store_sid,
                    });
                }}
            />
        </div>
    );
    // Effect
    useEffect(() => {
        // console.log("myPosition", myPosition);
    }, [myPosition]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setMyPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            function (positionError) {
                console.log("positionError ", positionError);
            }
        );
    }, []);

    // 找咖啡廳
    const shops = shops_dummy;

    // 當地圖載入完成，將地圖實體與地圖 API 傳入 state 供之後使用
    const apiHasLoaded = ({ map, maps }) => { };

    return (
        <div className="mapdetail">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyCBVfTVK3SMBOShZ8yflHk4hXwxiw2YkqM",
                    // 請輸入googlemap的key  ""
                    libraries: ["places"], // 要在這邊放入我們要使用的 API
                }}
                // onChange={handleCenterChange} // 移動地圖邊界時觸發 handleCenterChange
                center={myPosition}
                defaultZoom={props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={apiHasLoaded}
            >
                <MyPositionMarker
                    lat={myPosition.lat}
                    lng={myPosition.lng}
                    text="我在這"
                />
                {shops.map((shop) => (
                    <ShopMarker {...shop} icon="/food/coffee1.png" />
                ))}
            </GoogleMapReact>

            {/* <input/> */}
            {store_name && (
                <div className="mapshow">
                    <h6>{store_name}</h6>
                    <p className="txt">
                        {store_block}
                        {store_road}
                    </p>
                </div>
            )}
        </div>
    );
};
// 由於改寫成 functional component，故另外設定 defaultProps
SingleMapDetail.defaultProps = {
    center: {
        lat: 25.034320914178288,
        lng: 121.54372226899777,
    },
    zoom: 13,
};

export default SingleMapDetail;
