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
import GoogleMap from "../../component/Food/components/GoogleMap/GoogleMap";
import DateTime from "../../component/Food/components/DateTime";

// 餐點篩選
const menuFiliter = [
    { id: undefined, name: "全部餐點" },
    { id: "1", name: "咖啡系列" },
    { id: "2", name: "其他飲品" },
    { id: "3", name: "千層蛋糕" },
    { id: "4", name: "輕食沙拉" },
];

function Food() {
    // 從sql拿資料--------------------------------------------------------
    const [food, setFood] = useState([]);

    useEffect(() => {
        const foodData = async () => {
            const response = await axios.get(foodDataGet);
            setFood(response.data);
        };
        foodData();
    }, []);
    // ------------------------------------------------------------------
    const [foodFilter, setFoodFilter] = useState(menuFiliter[0].id);
    const [showFoodDetail, setShowFoodDetail] = useState({
        menu_name: "",
        menu_nutrition: "",
        menu_price_m: "",
        menu_sid: "",
        menu_categories: "",
    });
    const [dataFromFoodDetail, setDataFromFoodDetail] = useState([]);
    //拿自取時段的資料--------------------------------------------------
    const [dataFromDate, setDataFromDate] = useState("");
    const [dataFromDateTime, setDataFromDateTime] = useState("");
    // 顯示的開關
    const [showDate, setShowDate] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [showMap, setShowMap] = useState(false);
    // const [isShowAside, setIsShowAside] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({});
    //食物累加到側邊欄-----------------------------------------------------
    const isSameItem = (item1, item2) => {
        return (
            item1.ice === item2.ice &&
            item1.sugar === item2.sugar &&
            item1.menu_sid === item2.menu_sid
        );
    };
    const handleDetailAppend = (item) => {
        let newData;
        const isSameItemExist = dataFromFoodDetail.some((existedItem) =>
            isSameItem(existedItem, item)
        );
        if (isSameItemExist) {
            // 裡面有相同品項 品項增加所給的數量foodCount
            newData = dataFromFoodDetail.map((existedItem) => {
                if (isSameItem(existedItem, item)) {
                    return {
                        ...existedItem,
                        foodCount: existedItem.foodCount + item.foodCount,
                    };
                }
                return existedItem;
            });
        } else {
            // 裡面沒有相同品項 新增
            newData = [...dataFromFoodDetail, item];
            // [{}, {}, {}, {}]
        }
        setDataFromFoodDetail(newData);
        // new state dataFromFoodDetail = [...dataFromFoodDetail, item]
    };
    //相同timeID的判斷--------------------------------------------------
    const setDataFromSummary = (timeID, foodCount) => {
        const newData = dataFromFoodDetail.map((item) => {
            const detailCount = item.timeID;
            if (detailCount === timeID) {
                return { ...item, foodCount };
                // { foodCount: 1 } => { foodCount: 2 }
            }
            return item;
        });
        setDataFromFoodDetail(newData);
    };
    //如果餐點為沙拉或蛋糕，直接加數量到aside，且判斷商品是否重複--------------
    const handleCakeCount = (allfood) => {
        const { menu_sid, menu_price_m, menu_photo, menu_name } = allfood;
        let newData;
        const compareItems = (item1, item2) =>
            item1.menu_sid === item2.menu_sid;
        const isSameFood = dataFromFoodDetail.some((existedItem) => {
            return compareItems(existedItem, allfood);
        });
        if (isSameFood) {
            newData = dataFromFoodDetail.map((item) => {
                console.log("item", item);
                return item;
            });
        } else {
            newData = [
                ...dataFromFoodDetail,
                {
                    menu_sid: menu_sid,
                    menu_price_m: menu_price_m,
                    menu_photo: menu_photo,
                    menu_name: menu_name,
                    timeID: Date.now(),
                    foodCount: 1,
                    ice: "",
                    sugar: "",
                },
            ];
        }
        setDataFromFoodDetail(newData);
    };

    return (
        <Fragment>
            <NavBar />
            <Path pathObj={{ path: ["．點餐"] }} />
            <div className="container">
                <Slideshow />
                <div>
                    {showMap && (
                        <GoogleMap
                            setShowMap={setShowMap}
                            setShowDate={setShowDate}
                            setSelectedAddress={setSelectedAddress}
                        />
                    )}
                    {showDate && (
                        <DateTime
                            setShowDate={setShowDate}
                            setDataFromDate={setDataFromDate}
                            setDataFromDateTime={setDataFromDateTime}
                        />
                    )}
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
                                        setDataFromFoodDetail={
                                            setDataFromFoodDetail
                                        }
                                        handleCakeCount={handleCakeCount}
                                    />
                                );
                            })}
                    </div>
                </div>
                {isShow && (
                    <FoodCardDetail
                        showFoodDetail={showFoodDetail}
                        setIsShow={setIsShow}
                        setDataFromFoodDetail={handleDetailAppend}
                    />
                )}
                <FoodAsideSummary
                    show={dataFromFoodDetail.length > 0}
                    // setIsShowAside={setIsShowAside}
                    dataFromFoodDetail={dataFromFoodDetail}
                    setDataFromSummary={setDataFromSummary}
                    dataFromDate={dataFromDate}
                    dataFromDateTime={dataFromDateTime}
                    setShowDate={setShowDate}
                    setShowMap={setShowMap}
                    selectedAddress={selectedAddress}
                />
            </div>
        </Fragment>
    );
}

export default Food;
