import React, { useState, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
import axios from "axios";
import { mapAPI } from "../../../../config/api-path";
import "./GoogleMap.scss";
import {
    GoogleMap,
    LoadScript,
    // useJsApiLoader,
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
        center: { lat: 25.03962792542701, lng: 121.55742720101652 },
    },
    {
        store_sid: 2,
        key: 2,
        store_name: "0+B 復興店",
        store_road: "復興南路一段323號",
        store_block: "大安區, 台北市, 106台灣",
        center: { lat: 25.034320914178288, lng: 121.54372226899777 },
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
const MyPositionMarker = ({ text }) => <div>{text}</div>;

const SingleMapDetail = (props) => {
    const [calDistance, setCalDistance] = useState([]);
    console.log("calDistance", calDistance);

    // 從SQL拿googlemap Key
    const [myPosition, setMyPosition] = useState(props.center); // 讀取後會呈現 {lat: 25.042061, lng: 121.5414114}
    const { storeInfo, setStoreInfo } = props;
    const { store_name, store_block, store_road } = storeInfo;
    const initialState = { store_name: "", store_block: "", store_road: "" };
    // 預設位置

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

    const branchs = shops.map(({ center }) => {
        return center;
    });
    console.log("branchs", shops_dummy.center);

    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const markerCoors = {
        lat: 25.034320914178288,
        lng: 121.54372226899777,
    };

    const getDistance = (response) => {
        setCalDistance(
            response.rows[0].elements.map(({ distance }) => {
                return distance;
            })
        );
        console.log("e323423", response);
        console.log(
            "距離的陣列",
            response.rows[0].elements.map(({ distance }) => {
                return distance;
            })
        );

        console.log("response", response);
    };

    return (
        <div className="mapdetail">
            <LoadScript googleMapsApiKey="AIzaSyCBVfTVK3SMBOShZ8yflHk4hXwxiw2YkqM">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={myPosition}
                    zoom={14}
                    clickableIcons={false}
                >
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
                                    animation={1}
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
            {
                <div className="mapshow">
                    <div>
                        <h6>{store_name}</h6>
                        <p className="txt">
                            <div className="txt1">
                                {store_block}
                                {store_road}
                            </div>
                            <div className="distance">200公尺</div>
                        </p>
                    </div>
                </div>
            }

            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </div>
        // <div className="mapdetail">
        //     <GoogleMapReact
        //         bootstrapURLKeys={{
        //             key: "AIzaSyCBVfTVK3SMBOShZ8yflHk4hXwxiw2YkqM",
        //             // 請輸入googlemap的key  ""
        //             libraries: ["places"], // 要在這邊放入我們要使用的 API
        //         }}
        //         // onChange={handleCenterChange} // 移動地圖邊界時觸發 handleCenterChange
        //         center={myPosition}
        //         defaultZoom={props.zoom}
        //         yesIWantToUseGoogleMapApiInternals
        //         onGoogleApiLoaded={apiHasLoaded}
        //     >
        //         <MyPositionMarker
        //             lat={myPosition.lat}
        //             lng={myPosition.lng}
        //             text="我在這"
        //         />
        //         {shops.map((shop) => (
        //             <ShopMarker {...shop} icon="/food/coffee1.png" />
        //         ))}
        //     </GoogleMapReact>

        //     {/* <input/> */}
        // {store_name && (
        //     <div className="mapshow">
        //         <h6>{store_name}</h6>
        //         <p className="txt">
        //             {store_block}
        //             {store_road}
        //         </p>
        //     </div>
        // )}
        // </div>
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
