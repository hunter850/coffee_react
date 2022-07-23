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

// 餐點篩選
const menuFiliter = [
    { id: undefined, name: "全部餐點" },
    { id: "1", name: "咖啡系列" },
    { id: "2", name: "其他飲品" },
    { id: "3", name: "千層蛋糕" },
    { id: "4", name: "輕食沙拉" },
];

function Food() {
    // 從sql拿資料
    const [food, setFood] = useState([]);
    const foodData = async () => {
        const response = await axios.get(foodDataGet);
        setFood(response.data);
    };
    const [foodFilter, setFoodFilter] = useState(menuFiliter[0].id);
    useEffect(() => {
        foodData();
    }, []);

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
                                            key={`menuFiliter${id}`}
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
                                {/* 這裡很重要 */}
                                {food
                                    .filter(
                                        ({ menu_categories }) =>
                                            !foodFilter ||
                                            menu_categories === foodFilter
                                    )
                                    .map(({ ...allfood }, i) => {
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
                                    })}
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
