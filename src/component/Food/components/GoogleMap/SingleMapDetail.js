import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { mapAPI } from "../../../../config/api-path";
import "./GoogleMap.scss";

const shops_dummy = [
    {
        key: "shop_1",
        lat: 25.062318,
        lng: 121.541489,
        title: "光復店",
        icon: "/food/coffee1.png",
        address1: "光復南路500號",
        address2: "大安區 台北市 106台灣",
    },
    {
        key: "shop_2",
        lat: 25.052318,
        lng: 121.541389,
        title: "大安店",
        icon: "/food/coffee1.png",
        address1: "光復南路300號",
        address2: "大安區 台北市 106台灣",
        // image:require('icons/map_icons/map_icon_std_orange.svg')
    },
];

// 我的位置
const MyPositionMarker = ({ text }) => <div>{text}</div>;

const SingleMapDetail = (props) => {
    const { setStoreInfo, storeInfo } = props;
    const { title, address1, address2 } = storeInfo;
    const [mapApis, setMapApis] = useState([]);
    const initialState = { title: "", address2: "", address1: "" };
    // 預設位置
    const [myPosition, setMyPosition] = useState({}); // 讀取後會呈現 {lat: 25.042061, lng: 121.5414114}
    const [mapApiLoaded, setMapApiLoaded] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);
    const [mapApi, setMapApi] = useState(null);
    // Effect
    useEffect(() => {
        // console.log("myPosition", myPosition);
    }, [myPosition]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setMyPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
    }, []);
    // -----------------------------------------------------

    useEffect(() => {
        const mapAPiGet = async () => {
            const response = await axios.get(mapAPI);
            setMapApis(response.data);
        };
        mapAPiGet();
    }, []);
    if (mapApis.length > 0) {
        console.log("key", mapApis[0].mapapi_key);
    }

    const ShopMarker = ({ icon, title, address2, address1 }) => (
        <div>
            <img
                src={icon}
                alt="coffee"
                onClick={() => {
                    setStoreInfo({ title, address2, address1 });
                }}
            />
        </div>
    );

    // const SingleMapDetail = (props) => {
    //     const [mapApis, setMapApis] = useState([]);
    //     const [api, setApi] = useState(false);

    //     const mapAPiGet = async () => {
    //         const response = await axios.get(mapAPI);
    //         setMapApis(response.data);
    //     };
    //     useEffect(() => {
    //         if (mapApis.length > 0) {
    //             setApi(true);
    //         }
    //     }, [mapApis]);

    //     useEffect(() => {
    //         mapAPiGet();
    //     }, []);
    //     if (api === true) {
    //         console.log("mapApismapApismapApis", mapApis[0].mapapi_key);
    //         setApi(false);

    // 找咖啡廳
    // const [places, setPlaces] = useState([]);
    // 創建一個 state
    // const [searchType, setSearchType] = useState("cafe");

    // 找咖啡廳
    const [shops, setShops] = useState(shops_dummy);

    // 當地圖載入完成，將地圖實體與地圖 API 傳入 state 供之後使用
    const apiHasLoaded = ({ map, maps }) => {
        setMapInstance(map);
        setMapApi(maps);
        setMapApiLoaded(true);
    };

    const handleCenterChange = () => {
        if (mapApiLoaded) {
            setMyPosition({
                // center.lat() 與 center.lng() 會回傳正中心的經緯度
                lat: mapInstance.center.lat(),
                lng: mapInstance.center.lng(),
            });
        }
    };

    // 搜尋
    const findLocation = () => {
        if (mapApiLoaded) {
            const service = new mapApi.places.PlacesService(mapInstance);
            const request = {
                location: myPosition,
                radius: 1000,
                // type: searchType,
            };

            service.nearbySearch(request, (results, status) => {
                if (status === mapApi.places.PlacesServiceStatus.OK) {
                    // setPlaces(results);
                }
            });
        }
    };

    return (
        <div className="mapdetail">
            {/* <input type="button" value="開始搜尋" onClick={findLocation} />; */}
            {/* <div onClick={handleSearchType}>
            </div> */}
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: mapAPI,
                    // 請輸入googlemap的key
                    libraries: ["places"], // 要在這邊放入我們要使用的 API
                }}
                onChange={handleCenterChange} // 移動地圖邊界時觸發 handleCenterChange
                defaultCenter={props.center}
                center={myPosition}
                defaultZoom={props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={apiHasLoaded}
            >
                <MyPositionMarker
                    lat={myPosition.lat}
                    lng={myPosition.lng}
                    text="My Position"
                />
                {shops.map((shop) => (
                    <ShopMarker {...shop} />
                ))}

                {/* 使用 map 方法渲染 */}
                {/* {places.map((item, i) => (
                    <CafeMarker
                        key={i}
                        //    key={item.i}
                        icon={item.icon}
                        lat={item.geometry.location.lat()}
                        lng={item.geometry.location.lng()}
                        text={item.name}
                        placeId={item.place_id}
                    />
                ))} */}
            </GoogleMapReact>

            {/* <input/> */}
            <div className="mapshow">
                <h6>{title}</h6>
                <p>{address2}</p>
                <p>{address1}</p>
            </div>
        </div>
    );
};
// 由於改寫成 functional component，故另外設定 defaultProps
SingleMapDetail.defaultProps = {
    center: {
        lat: 25.042118,
        lng: 121.541489,
    },
    zoom: 15,
};

export default SingleMapDetail;
