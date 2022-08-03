import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../Components/Marker";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(props) {

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
    const defaultProps = {
        center: {
            lat: 25.041947238558986,
            lng: 121.54824003860637,
        },
        // center:defaultCenter,
        zoom: 14,
    };

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyAQ313cuqnG1Q1MPRDhP-k-EQOANPo__PQ",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {places.map((place) => (
                    <Marker
                        key={place.key}
                        text={place.text}
                        lat={place.lat}
                        lng={place.lng}
                        storeName={place.storeName}
                        storeRoad={place.storeRoad}
                        storeBlock={place.storeBlock}
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
}