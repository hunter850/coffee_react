import "./FoodCardDetail.css";
import { useState } from "react";

function FoodCardDetail({ showFoodDetail }) {
    const {
        menu_name,
        menu_nutrition,
        menu_price_m,
        // menu_sid,
        // menu_categories,
    } = showFoodDetail;

    const icechoice = ["正常冰", "少冰", "去冰", "常溫", "熱"];
    const sugarchoice = ["無糖", "微糖", "半糖", "全糖"];
    const [ice, setIce] = useState("");
    const [sugar, setSugar] = useState("");
    const [foodCount, setFoodCount] = useState("0");

    return (
        <>
            <div className="food-lightbox">
                <div className="food-detail">
                    <div className="food-detail-photoarea">
                        <figure>
                            <img
                                src="https://www.niusnews.com/upload/imgs/default/202109_____Choco/0915/dog-4988985_1280.jpg"
                                alt=""
                                className="food-detail-photo"
                            />
                        </figure>
                        <div>
                            <div className="detail-menu-name">{menu_name}</div>
                            <div>{menu_nutrition}</div>
                            <div>NT$ {menu_price_m}</div>
                        </div>
                    </div>
                    <div className="foodchoice">冰熱選擇</div>
                    {icechoice.map((v, i) => {
                        return (
                            <div key={i}>
                                <input
                                    type="radio"
                                    checked={ice === v}
                                    value={v}
                                    onChange={(e) => {
                                        setIce(e.target.value);
                                    }}
                                    id={v}
                                />
                                <label htmlFor={v}>{v}</label>
                            </div>
                        );
                    })}

                    <div className="foodchoice">甜度選擇</div>
                    {sugarchoice.map((v, i) => {
                        return (
                            <div key={i}>
                                <input
                                    type="radio"
                                    checked={sugar === v}
                                    value={v}
                                    onChange={(e) => {
                                        setSugar(e.target.value);
                                    }}
                                    id={v}
                                />
                                <label htmlFor={v}>{v}</label>
                            </div>
                        );
                    })}
                    <div style={{ display: "flex" }}>
                        <div
                            onClick={() => {
                                setFoodCount(foodCount - 1);
                            }}
                        >
                            -
                        </div>
                        <div>{foodCount}</div>
                        <div
                            onClick={() => {
                                setFoodCount(foodCount + 1);
                            }}
                        >
                            +
                        </div>
                        <div>加入餐點</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FoodCardDetail;
