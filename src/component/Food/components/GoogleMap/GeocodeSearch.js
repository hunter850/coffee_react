import { useState, useEffect } from "react";
import Geocode from "react-geocode";

// 申請的google api key
import { ApiKey } from "./ApiKey";

function GeocodeSearch(props) {
    const [address, setAddress] = useState("");

    // 回送lat與lng的父母層callback函式
    const { setLng, setLat } = props;

    // useEffect(() => {}, [address])

    const handleGetGeocode = () => {
        // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey(ApiKey);

        // set response language. Defaults to english.
        Geocode.setLanguage("zh-TW");

        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        Geocode.setRegion("tw");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();

        // Get latitude & longitude from address.
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                setLat(lat);
                setLng(lng);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    return (
        <>
            <input
                type="text"
                placeholder="輸入住址"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleGetGeocode}>顯示</button>
        </>
    );
}

export default GeocodeSearch;
