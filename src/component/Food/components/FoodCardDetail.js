import "./FoodCardDetail.css";
import { useState } from "react";

function FoodCardDetail({ showFoodDetail, setIsShow }) {
    const {
        menu_name,
        menu_nutrition,
        menu_price_m,
        // menu_sid,
        // menu_categories,
    } = showFoodDetail;

    const icechoice = [
        {
            id: 1,
            name: "正常冰",
        },
        {
            id: 2,
            name: "少冰",
        },
        {
            id: 3,
            name: "去冰",
        },
        {
            id: 4,
            name: "常溫",
        },
        {
            id: 5,
            name: "熱",
        },
    ];
    const sugarchoice = [
        { id: 1, name: "無糖" },
        { id: 2, name: "微糖" },
        { id: 3, name: "半糖" },
        { id: 4, name: "全糖" },
    ];
    const [ice, setIce] = useState("");
    const [sugar, setSugar] = useState("");
    const [foodCount, setFoodCount] = useState(0);

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
                    {icechoice.map(({ name, id }) => {
                        return (
                            <div key={`icechoice${id}`}>
                                <input
                                    type="radio"
                                    checked={ice === name}
                                    value={name}
                                    onChange={(e) => {
                                        setIce(e.target.value);
                                    }}
                                    id={name}
                                />
                                <label htmlFor={name}>{name}</label>
                            </div>
                        );
                    })}

                    <div className="foodchoice">甜度選擇</div>
                    {sugarchoice.map(({ name, id }) => {
                        return (
                            <div key={`sugarchoice${id}`}>
                                <input
                                    type="radio"
                                    checked={sugar === name}
                                    value={name}
                                    onChange={(e) => {
                                        setSugar(e.target.value);
                                    }}
                                    id={name}
                                />
                                <label htmlFor={name}>{name}</label>
                            </div>
                        );
                    })}
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <button
                            className="foodminusplus"
                            onClick={() => {
                                foodCount > 0
                                    ? setFoodCount(foodCount - 1)
                                    : setFoodCount(foodCount - 0);
                            }}
                        >
                            -
                        </button>
                        <div className="foodcount">{foodCount}</div>
                        <button
                            className="foodminusplus"
                            onClick={() => {
                                setFoodCount(foodCount + 1);
                            }}
                        >
                            +
                        </button>
                        <button
                            className="addtoorder"
                            onClick={() => {
                                setIsShow(false);
                            }}
                        >
                            加入餐點
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FoodCardDetail;
