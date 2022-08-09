import { useState, useEffect } from "react";

import axios from "axios";

const RandomFoodMenu = () => {
    const [randomFoodMenuName, setRandomFoodMenuName] = useState(null);
    const [randomFoodMenuPhoto, setRandomFoodMenuPhoto] = useState(null);
    const RandomFoodMenuPhotos = async () => {
        await axios
            .get("http://localhost:3500/RandomFoodMenuPhotos/Api", {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                setRandomFoodMenuName(result.data.RandomResult.menu_name);
                setRandomFoodMenuPhoto(result.data.RandomResult.menu_photo);
            });
    };
    useEffect(() => {
        RandomFoodMenuPhotos();
    }, []);
    return (
        <>
            <div className="RandomFoodMenuBox">
                <div className="RandomFoodMenuTitle">{randomFoodMenuName}</div>
                <div className="RandomFoodMenuIMG">
                    <img
                        // src={`http://localhost:3500/images/food/${randomFoodMenuPhoto}`}
                        // src={require("../../images/Coupon/store_img1.png")}
                        src={`http://localhost:3500/images/food/${randomFoodMenuPhoto}`}
                        alt=""
                    />
                </div>
            </div>
        </>
    );
};

export default RandomFoodMenu;
