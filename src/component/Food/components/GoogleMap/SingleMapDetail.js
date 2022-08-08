import React, { useState, useEffect } from "react";
import "./GoogleMap.scss";
import {
    GoogleMap,
    LoadScript,
    useJsApiLoader,
    DistanceMatrixService,
    Marker,
} from "@react-google-maps/api";

const shops_dummy = [
    {
        store_sid: 1,
        key: 1,
        store_name: "0+B 光復店",
        store_road: "光復南路300號",
        store_block: "大安區, 台北市, 106台灣",
        center: { lat: 25.03962792142701, lng: 121.55742720101652 },
    },
    {
        store_sid: 2,
        key: 2,
        store_name: "0+B 復興店",
        store_road: "復興南路一段323號",
        store_block: "大安區, 台北市, 106台灣",
        center: { lat: 25.034820954178888, lng: 121.54072221899777 },
    },
    {
        store_sid: 3,
        key: 3,
        store_name: "0+B 龍門店",
        store_road: "忠孝東路四段134號",
        store_block: "大安區, 台北市, 106台灣",
        center: { lat: 25.041947238558986, lng: 121.54824003860637 },
    },
    {
        store_sid: 4,
        key: 4,
        store_name: "0+B 永康店",
        store_road: "永康街2號2樓",
        store_block: "大安區, 台北市, 106台灣",
        center: {
            lat: 25.03475717724878,
            lng: 121.52959140047166,
        },
    },
    {
        store_sid: 5,
        key: 5,
        store_name: "0+B 敦和店",
        store_road: "敦化南路二段263號",
        store_block: "大安區, 台北市, 106台灣",
        center: { lat: 25.027059214520953, lng: 121.54864470715766 },
    },
    {
        store_sid: 6,
        key: 6,
        store_name: "0+B 微風南京店",
        store_road: "南京東路三段337號",
        store_block: "松山區, 台北市, 106台灣",
        center: { lat: 25.05377904290978, lng: 121.54832427510259 },
    },
    {
        store_sid: 7,
        key: 7,
        store_name: "0+B 南京建國店",
        store_road: "南京東路三段1號",
        store_block: "中山區, 台北市, 106台灣",
        center: { lat: 25.054012307531703, lng: 121.53708045485325 },
    },
    {
        store_sid: 8,
        key: 8,
        store_name: "0+B 南京三民店",
        store_road: "南京東路五段171號",
        store_block: "松山區, 台北市, 106台灣",
        center: { lat: 25.05323475716153, lng: 121.56325881561968 },
    },
];

// 我的位置
const SingleMapDetail = (props) => {
    const containerStyle = {
        width: "100%",
        height: "600px",
    };
    const MyPositionMarker = ({ text }) => <div>{text}</div>;

    const [shops, setShops] = useState(shops_dummy);
    const [myPosition, setMyPosition] = useState(props.center); // 讀取後會呈現 {lat: 25.042061, lng: 121.5414114}
    const { storeInfo, setStoreInfo } = props;
    const { store_name, store_block, store_road } = storeInfo;
    const initialState = { store_name: "", store_block: "", store_road: "" };
    // 預設位置

    const [icon, setIcon] = useState();
    console.log("icon", icon);

    const getMyPosition = () => {
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
    };

    useEffect(() => {
        getMyPosition();
    }, []);

    const branchs = shops.map(({ center }) => center);

    const getDistance = (response) => {
        const shopsWithDistance = shops
            .map((item, idx) => {
                return {
                    ...item,
                    distance: response.rows[0].elements[idx].distance,
                };
            })
            .sort((x, y) => x.distance.value - y.distance.value);
        setShops(shopsWithDistance);
    };

    const handleSameBranch = (item1, item2) => {
        return item1.store_sid === item2.store_sid;
    };

    const selectedMapItem =
        storeInfo.store_sid === shops.store_sid
            ? "mapshow selected"
            : "mapshow";
    return (
        <div className="mapSection">
            <p onClick={getMyPosition}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_1711_8278)">
                        <path
                            d="M17.5 8.3335C17.5 14.1668 10 19.1668 10 19.1668C10 19.1668 2.5 14.1668 2.5 8.3335C2.5 6.34437 3.29018 4.43672 4.6967 3.0302C6.10322 1.62367 8.01088 0.833496 10 0.833496C11.9891 0.833496 13.8968 1.62367 15.3033 3.0302C16.7098 4.43672 17.5 6.34437 17.5 8.3335Z"
                            stroke="#253945"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 10.8335C11.3807 10.8335 12.5 9.71421 12.5 8.3335C12.5 6.95278 11.3807 5.8335 10 5.8335C8.61929 5.8335 7.5 6.95278 7.5 8.3335C7.5 9.71421 8.61929 10.8335 10 10.8335Z"
                            stroke="#253945"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1711_8278">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                取得目前所在位置
            </p>
            <div className="mapdetail">
                <LoadScript googleMapsApiKey="AIzaSyCBVfTVK3SMBOShZ8yflHk4hXwxiw2YkqM">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={myPosition}
                        zoom={14}
                        clickableIcons={false}
                    >
                        <Marker
                            position={myPosition}
                            icon="/food/happy.png"
                            animation={1}
                            radius={1000}
                        />

                        {shops.map(
                            ({
                                center,
                                key,
                                store_name,
                                store_block,
                                store_road,
                                store_sid,
                            }) => {
                                return (
                                    <Marker
                                        key={key}
                                        position={center}
                                        icon="/food/coffee1.png"
                                        animation={center === icon ? 1 : 4}
                                        value={store_sid}
                                        onClick={() => {
                                            setStoreInfo({
                                                store_name,
                                                store_block,
                                                store_road,
                                                store_sid,
                                            });
                                        }}
                                    />
                                );
                            }
                        )}

                        {/* <Marker
                            position={icon}
                            icon="/food/coffee1.png"
                            animation={1}
                        /> */}
                        <DistanceMatrixService
                            options={{
                                destinations: branchs,
                                origins: [myPosition],
                                travelMode: "WALKING",
                            }}
                            callback={getDistance}
                        />
                    </GoogleMap>
                </LoadScript>

                <div className="mapshowarea">
                    {shops.map(
                        ({
                            store_name,
                            store_block,
                            store_road,
                            distance,
                            store_sid,
                            center,
                            key,
                        }) => {
                            return (
                                <div
                                    className={selectedMapItem}
                                    key={store_sid}
                                    value={store_sid}
                                    onClick={() => {
                                        setIcon(center);
                                        setStoreInfo({
                                            store_name,
                                            store_block,
                                            store_road,
                                            store_sid,
                                        });
                                    }}
                                >
                                    <div className="branchInput">
                                        <div className="maptxt">
                                            <h6> {store_name}</h6>
                                            <div className="txt">
                                                <div className="txt1">
                                                    {store_block}
                                                    {store_road}
                                                </div>
                                                <div className="distance">
                                                    {distance && distance.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
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
