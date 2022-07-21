import React from "react";
import "./FoodCard.css";
import "./FoodAdd.css";
import menudata from "./menu.json";

function FoodCard({ handleShowFoodDetailSelect, setIsShow }) {
    return menudata.map(
        ({
            menu_name,
            menu_nutrition,
            menu_price_m,
            menu_sid,
            menu_categories,
        }) => {
            return (
                <div className="food_card" key={menu_sid}>
                    <div className="food_card_top">
                        <div
                            className="food_card_level"
                            style={{ display: "none" }}
                        >
                            {menu_categories}
                        </div>
                    </div>
                    <div className="food_card_down">
                        <div className="food_card_txt">
                            <p style={{ fontWeight: "bolder" }}>{menu_name}</p>
                            <p
                                className="font-min1"
                                style={{
                                    color: "#898787",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {menu_nutrition}
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <p style={{ flexGrow: "2" }}>
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
