/* eslint-disable no-unused-vars */
import "./FoodCardDetail.scss";
import { useState } from "react";
import { icechoice, sugarchoice } from "../../../config/constant";
// import useData from "../../../hooks/useData";

function FoodCardDetail({ showFoodDetail, setIsShow, setDataFromFoodDetail }) {
    const {
        menu_sid,
        menu_name,
        menu_nutrition,
        menu_price_m,
        menu_photo,
        // menu_categories,
    } = showFoodDetail;

    const [ice, setIce] = useState("");
    const [sugar, setSugar] = useState("");
    const [foodCount, setFoodCount] = useState(1);
    const [remind, setRemind] = useState(false);
    const orderclass = ice && sugar ? "order" : "order disabled";
    const handleChildClick = (e) => {
        e.stopPropagation();
    };
    return (
        <>
            <div
                className="food-lightbox"
                onClick={() => {
                    setIsShow(false);
                }}
            >
                <div className="detail" onClick={handleChildClick}>
                    <div className="detail-photoarea">
                        <figure>
                            <img
                                src={`http://localhost:3500/images/food/${menu_photo}`}
                                alt=""
                                className="photo"
                            />
                        </figure>
                        <div className="photoaside">
                            <h2 className="title-font">{menu_name}</h2>
                            <p className="menu_nutrition">{menu_nutrition}</p>
                            <p className="menu_price_m">NT$ {menu_price_m}</p>
                        </div>
                        <div
                            onClick={() => {
                                setIsShow(false);
                            }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_2822_4517)">
                                    <path
                                        d="M50 93.75C38.3968 93.75 27.2688 89.1406 19.0641 80.9359C10.8594 72.7312 6.25 61.6032 6.25 50C6.25 38.3968 10.8594 27.2688 19.0641 19.0641C27.2688 10.8594 38.3968 6.25 50 6.25C61.6032 6.25 72.7312 10.8594 80.9359 19.0641C89.1406 27.2688 93.75 38.3968 93.75 50C93.75 61.6032 89.1406 72.7312 80.9359 80.9359C72.7312 89.1406 61.6032 93.75 50 93.75ZM50 100C63.2608 100 75.9785 94.7322 85.3553 85.3553C94.7322 75.9785 100 63.2608 100 50C100 36.7392 94.7322 24.0215 85.3553 14.6447C75.9785 5.26784 63.2608 0 50 0C36.7392 0 24.0215 5.26784 14.6447 14.6447C5.26784 24.0215 0 36.7392 0 50C0 63.2608 5.26784 75.9785 14.6447 85.3553C24.0215 94.7322 36.7392 100 50 100V100Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M29.0375 29.0375C29.3278 28.7465 29.6726 28.5156 30.0523 28.358C30.4319 28.2005 30.839 28.1194 31.25 28.1194C31.661 28.1194 32.0681 28.2005 32.4477 28.358C32.8274 28.5156 33.1722 28.7465 33.4625 29.0375L50 45.5813L66.5375 29.0375C66.828 28.747 67.173 28.5165 67.5526 28.3592C67.9322 28.202 68.3391 28.1211 68.75 28.1211C69.1609 28.1211 69.5678 28.202 69.9474 28.3592C70.327 28.5165 70.672 28.747 70.9625 29.0375C71.2531 29.328 71.4835 29.673 71.6408 30.0526C71.798 30.4322 71.8789 30.8391 71.8789 31.25C71.8789 31.6609 71.798 32.0678 71.6408 32.4474C71.4835 32.827 71.2531 33.172 70.9625 33.4625L54.4187 50L70.9625 66.5375C71.2531 66.828 71.4835 67.173 71.6408 67.5526C71.798 67.9322 71.8789 68.3391 71.8789 68.75C71.8789 69.1609 71.798 69.5678 71.6408 69.9474C71.4835 70.327 71.2531 70.672 70.9625 70.9625C70.672 71.2531 70.327 71.4835 69.9474 71.6408C69.5678 71.798 69.1609 71.8789 68.75 71.8789C68.3391 71.8789 67.9322 71.798 67.5526 71.6408C67.173 71.4835 66.828 71.2531 66.5375 70.9625L50 54.4187L33.4625 70.9625C33.172 71.2531 32.827 71.4835 32.4474 71.6408C32.0678 71.798 31.6609 71.8789 31.25 71.8789C30.8391 71.8789 30.4322 71.798 30.0526 71.6408C29.673 71.4835 29.328 71.2531 29.0375 70.9625C28.747 70.672 28.5165 70.327 28.3592 69.9474C28.202 69.5678 28.1211 69.1609 28.1211 68.75C28.1211 68.3391 28.202 67.9322 28.3592 67.5526C28.5165 67.173 28.747 66.828 29.0375 66.5375L45.5813 50L29.0375 33.4625C28.7465 33.1722 28.5156 32.8274 28.358 32.4477C28.2005 32.0681 28.1194 31.661 28.1194 31.25C28.1194 30.839 28.2005 30.4319 28.358 30.0523C28.5156 29.6726 28.7465 29.3278 29.0375 29.0375Z"
                                        fill="black"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2822_4517">
                                        <rect
                                            width="100"
                                            height="100"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="choice">
                        <h6 className="choice-txt">冰熱選擇</h6>
                        {!ice && remind && (
                            <p className="lg-field-err">請選擇</p>
                        )}
                    </div>
                    {icechoice.map(({ name, id }) => {
                        return (
                            <div
                                key={`icechoice${id}`}
                                className="inputArea"
                                onClick={() => setIce(id)}
                            >
                                <div
                                    className={`inner ${ice === id ? "checked" : ""
                                        }`}
                                ></div>

                                <label
                                    htmlFor={`icechoice${id}`}
                                    className="inputla"
                                >
                                    {name}
                                </label>
                            </div>
                        );
                    })}

                    <div className="choice">
                        <h6 className="choice-txt"> 甜度選擇</h6>
                        {!sugar && remind && (
                            <p className="lg-field-err">請選擇</p>
                        )}
                    </div>
                    {sugarchoice.map(({ name, id }) => {
                        return (
                            <div
                                key={`sugarchoice${id}`}
                                className="inputArea"
                                onClick={() => setSugar(id)}
                            >
                                <div
                                    className={`inner ${sugar === id ? "checked" : ""
                                        }`}
                                ></div>

                                <label
                                    htmlFor={`sugarchoice${id}`}
                                    className="inputla"
                                >
                                    {name}
                                </label>
                            </div>
                        );
                    })}
                    <div className="cal">
                        <button
                            className="count"
                            onClick={() => {
                                return foodCount > 1
                                    ? setFoodCount(foodCount - 1)
                                    : undefined;
                            }}
                        >
                            -
                        </button>
                        <div className="foodcount">{foodCount}</div>
                        <button
                            className="count"
                            onClick={() => {
                                setFoodCount(foodCount + 1);
                            }}
                        >
                            +
                        </button>
                        <button
                            className={orderclass}
                            onClick={() => {
                                if (!sugar || !ice) {
                                    setRemind(true);
                                    return false;
                                }

                                setIsShow(false);
                                setDataFromFoodDetail({
                                    menu_name,
                                    foodCount,
                                    sugar,
                                    ice,
                                    menu_price_m,
                                    menu_sid,
                                    menu_photo,
                                    timeID: Date.now(),
                                });
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
