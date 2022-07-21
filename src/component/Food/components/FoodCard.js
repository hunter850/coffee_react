import React, { useEffect, useState } from "react";
import "./FoodCard.css";
import "./FoodAdd.css";
// import menudata from "./menu.json";
import axios from "axios";
import { foodDataGet } from "../../../config/api-path";

function FoodCard({ handleShowFoodDetailSelect, setIsShow }) {
    const [food, setFood] = useState([]);

    const foodData = async () => {
        const response = await axios.get(foodDataGet);
        setFood(response.data);
        console.log("QQ", response);
    };

    useEffect(() => {
        foodData();
    }, []);

    return food.map(
        ({
            menu_name,
            menu_nutrition,
            menu_price_m,
            menu_sid,
            menu_categories,
            menu_photo,
        }) => {
            return (
                <div className="food_card" key={menu_sid}>
                    <div className="food_card_top">
                        <img
                            className="photo"
                            src={`http://localhost:3500/images/food/${menu_photo}`}
                            alt="logo"
                        />
                        <div className="food_card_level">{menu_categories}</div>
                    </div>
                    <div className="food_card_down">
                        <div className="food_card_txt">
                            <p className="menu_name">{menu_name}</p>
                            <p className="font-min1">{menu_nutrition}</p>
                            <div className="font-min2">
                                <p className="menu_price_m">
                                    NT${menu_price_m}
                                </p>
                                <div
                                    className="foodadd"
                                    onClick={() => {
                                        handleShowFoodDetailSelect({
                                            menu_name,
                                            menu_nutrition,
                                            menu_price_m,
                                            menu_sid,
                                            menu_categories,
                                            menu_photo,
                                        });
                                        setIsShow(true);
                                    }}
                                >
                                    加入
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* detailShow為true時 FoodCardDetail 就會執行 */}
                    {/* {detailShow && <FoodCardDetail menu_sid={menu_sid} />} */}
                </div>
            );
        }
    );
}

export default FoodCard;
