import React, { useState, useEffect } from "react";
import "./GoogleMap.scss";
import LoadScriptOnlyIfNeeded from "./LoadScriptOnlyIfNeeded";
import {
    GoogleMap,
    DistanceMatrixService,
    Marker,
} from "@react-google-maps/api";

const shops_dummy = [
    {
        store_sid: 1,
        key: 1,
        store_name: "0+B 光復店",
        store_road: "光復南路300號",
        store_block: "台北市大安區",
        center: { lat: 25.03962792142701, lng: 121.55742720101652 },
    },
    {
        store_sid: 2,
        key: 2,
        store_name: "0+B 復興店",
        store_road: "復興南路一段323號",
        store_block: "台北市大安區",
        center: { lat: 25.034820954178888, lng: 121.54072221899777 },
    },
    {
        store_sid: 3,
        key: 3,
        store_name: "0+B 龍門店",
        store_road: "忠孝東路四段134號",
        store_block: "台北市大安區",
        center: { lat: 25.041947238558986, lng: 121.54824003860637 },
    },
    {
        store_sid: 4,
        key: 4,
        store_name: "0+B 永康店",
        store_road: "永康街2號2樓",
        store_block: "台北市大安區",
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
        store_block: "台北市大安區",
        center: { lat: 25.027059214520953, lng: 121.54864470715766 },
    },
    {
        store_sid: 6,
        key: 6,
        store_name: "0+B 微風南京店",
        store_road: "南京東路三段337號",
        store_block: "台北市松山區",
        center: { lat: 25.05377904290978, lng: 121.54832427510259 },
    },
    {
        store_sid: 7,
        key: 7,
        store_name: "0+B 南京建國店",
        store_road: "南京東路三段1號",
        store_block: "台北市中山區",
        center: { lat: 25.054012307531703, lng: 121.53708045485325 },
    },
    {
        store_sid: 8,
        key: 8,
        store_name: "0+B 南京三民店",
        store_road: "南京東路五段171號",
        store_block: "台北市松山區",
        center: { lat: 25.05323475716153, lng: 121.56325881561968 },
    },
];

// 我的位置
const SingleMapDetail = (props) => {
    const containerStyle = {
        width: "100%",
        height: "70vh",
    };

    const [shops, setShops] = useState(shops_dummy);
    const [initial, setInitial] = useState(false);
    const [myPosition, setMyPosition] = useState(props.center); // 讀取後會呈現 {lat: 25.042061, lng: 121.5414114}
    const { storeInfo, setStoreInfo } = props;
    const { store_name, store_block, store_road } = storeInfo;
    const initialState = { store_name: "", store_block: "", store_road: "" };
    // 預設位置
    const [icon, setIcon] = useState({});

    const getMyPosition = () => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setMyPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setInitial(true);
            },
            function (positionError) {
                // console.log("positionError ", positionError);
                setInitial(true);
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
    return (
        <div className="mapSection">
            <div className="mapdetail">
                <LoadScriptOnlyIfNeeded googleMapsApiKey="AIzaSyAQ313cuqnG1Q1MPRDhP-k-EQOANPo__PQ">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={myPosition}
                        zoom={14}
                        clickableIcons={false}
                    >
                        {myPosition.lat !== 25.034320914178288 && (
                            <Marker
                                position={myPosition}
                                icon="/food/happy.png"
                                animation={1}
                            />
                        )}

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
                                        icon="/food/hot-coffee.png"
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

                        <DistanceMatrixService
                            options={{
                                destinations: branchs,
                                origins: [myPosition],
                                travelMode: "WALKING",
                            }}
                            callback={getDistance}
                        />
                    </GoogleMap>
                </LoadScriptOnlyIfNeeded>

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
                                    className={
                                        center.lat === icon.lat &&
                                            center.lng === icon.lng
                                            ? "mapshow selected"
                                            : "mapshow"
                                    }
                                    key={store_sid}
                                    value={store_sid}
                                    onClick={() => {
                                        setIcon(center);
                                        setStoreInfo({
                                            store_name,
                                            store_block,
                                            store_road,
                                            store_sid,
                                            center,
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

                                                <div
                                                    className={
                                                        myPosition.lat ===
                                                            25.034320914178288
                                                            ? "distance disabled"
                                                            : "distance"
                                                    }
                                                >
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
