/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar";
import React from "react";
import "./Food.css";
import Filterbutton from "../../component/Food/components/FilterButton";
import Slideshow from "../../component/Food/components/SlideShow";
import FoodCard from "../../component/Food/components/FoodCard";
import Path from "../../component/Item/Path/Path";
import FoodCardDetail from "../../component/Food/components/FoodCardDetail";
import FoodAsideSummary from "../../component/Food/components/FoodAsideSummary";
import axios from "axios";
import { foodDataGet } from "../../config/api-path";

function Food() {
    // 從sql拿資料
    const [food, setFood] = useState([]);
    const foodData = async () => {
        const response = await axios.get(foodDataGet);
        setFood(response.data);
    };
    useEffect(() => {
        foodData();
    }, []);

    // 餐點篩選
    const menuFiliter = [
        { id: 1, name: "全部餐點" },
        { id: 2, name: "咖啡系列" },
        { id: 3, name: "其他飲品" },
        { id: 4, name: "千層蛋糕" },
        { id: 5, name: "輕食沙拉" },
    ];

    const [showFoodDetail, setShowFoodDetail] = useState({
        menu_name: "",
        menu_nutrition: "",
        menu_price_m: "",
        menu_sid: "",
        menu_categories: "",
    });
    const [dataFromFoodDetail, setDataFromFoodDetail] = useState([]);

    // 食物累加到側邊欄
    const handleDetailAppend = (item) => {
        setDataFromFoodDetail([...dataFromFoodDetail, item]);
        // new state dataFromFoodDetail = [...dataFromFoodDetail, item]
    };

    // 食物的篩選
    const all = food.filter(({ menu_categories }) => {
        return menu_categories !== "1";
    });
    const coffee = food.filter(({ menu_categories }) => {
        return menu_categories === "2";
    });
    const drinks = food.filter(({ menu_categories }) => {
        return menu_categories === "3";
    });
    const cake = food.filter(({ menu_categories }) => {
        return menu_categories === "4";
    });
    const lightmeal = food.filter(({ menu_categories }) => {
        return menu_categories === "5";
    });
    const allfilteroption = [all, coffee, drinks, cake, lightmeal];
    const [foodFilter, setFoodFilter] = useState(1);

    // 讓食物詳細頁面顯示
    const [isShow, setIsShow] = useState(false);
    // const [isShowAside, setIsShowAside] = useState(false);
    return (
        <Fragment>
            <NavBar />
            <Path pathObj={{ path: ["．點餐"] }} />
            <div className="foodpage">
                <div>
                    <Slideshow />
                    <div className="container">
                        <div>
                            <div className="filterbtn-area">
                                {menuFiliter.map(({ id, name }) => {
                                    return (
                                        <Filterbutton
                                            key={id}
                                            id={id}
                                            name={name}
                                            setFoodFilter={setFoodFilter}
                                        />
                                    );
                                })}
                                {/* <button
                                onClick={() => {
                                    setIsShowAside(true);
                                }}
                            >
                                按按看
                            </button> */}
                            </div>
                            <div className="foodcard-session">
                                {foodFilter &&
                                    allfilteroption[foodFilter - 1].map(
                                        ({ ...allfood }, i) => {
                                            return (
                                                <FoodCard
                                                    key={`allfood${i}`}
                                                    allfood={allfood}
                                                    handleShowFoodDetailSelect={
                                                        setShowFoodDetail
                                                    }
                                                    setIsShow={setIsShow}
                                                />
                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    </div>
                    {isShow && (
                        <FoodCardDetail
                            showFoodDetail={showFoodDetail}
                            setIsShow={setIsShow}
                            setDataFromFoodDetail={handleDetailAppend}
                        />
                    )}
                </div>
                <FoodAsideSummary
                    show={dataFromFoodDetail.length > 0}
                    // setIsShowAside={setIsShowAside}
                    dataFromFoodDetail={dataFromFoodDetail}
                />
            </div>
        </Fragment>
    );
}

export default Food;
