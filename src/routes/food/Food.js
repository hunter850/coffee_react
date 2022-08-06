/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect, useContext } from "react";
// import NavBar from "../../component/NavBar";
// import AuthContext from "../../component/Member/AuthContext";
import React from "react";
import "./Food.scss";
import Filterbutton from "../../component/Food/components/FilterButton";
// import Slideshow from "../../component/Food/components/SlideShow";
import FoodCard from "../../component/Food/components/FoodCard";
import Path from "../../component/Item/Path/Path";
import FoodCardDetail from "../../component/Food/components/FoodCardDetail";
import FoodAsideSummary from "../../component/Food/components/FoodAsideSummary";
import axios from "axios";
import { foodDataGet } from "../../config/api-path";
import GoogleMap from "../../component/Food/components/GoogleMap/GoogleMap";
import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
import ca from "../../images/food/carousel001.png";
import ca1 from "../../images/food/179c7a20c2aee387e56e4d8cbfee0b15.jpg";
import Modal from "../../component/Modal/Modal";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";
import "../course/Course.css";
// 餐點篩選
const menuFiliter = [
    { id: undefined, name: "全部餐點" },
    { id: "1", name: "咖啡系列" },
    { id: "2", name: "其他飲品" },
    { id: "3", name: "千層蛋糕" },
    { id: "4", name: "輕食沙拉" },
];

// chunk - 依size分成子陣列，ex. chunk([1, 2, 3, 4, 5], 2) -> [[1,2],[3,4],[5]]
// https://stackoverflow.com/questions/8495687/split-array-into-chunks
const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

function Food() {
    // 從sql拿資料--------------------------------------------------------
    // 第一次記錄伺服器的原始資料用
    const [usersRaw, setUsersRaw] = useState([]);
    // 呈現資料用
    const [food, setFood] = useState([]);

    // 分頁用
    // pageNow 目前頁號
    // perPage 每頁多少數量
    // pageTotal 目前有多少頁
    const [pageNow, setPageNow] = useState(1); // 預設第一頁
    const [perPage, setPerPage] = useState(6); // 預設一頁6筆資料
    const [pageTotal, setPageTotal] = useState(0); // 等伺服器抓完資料才知道多少(didMount時決定)
    // 載入資料指示狀態
    useEffect(() => {
        const getFoodData = async () => {
            const response = await axios.get(foodDataGet);
            setUsersRaw(response.data);
            const pageArray = chunk(response.data, perPage);

            if (pageArray.length > 0) {
                setPageTotal(pageArray.length);
                setFood(pageArray);
                console.log("pageArray", pageArray);
            }
        };

        // setFood(response.data);

        getFoodData();
    }, []);

    const paginationBar = (
        <>
            <div className="pagination">
                <a
                    href="#/"
                    onClick={() => {
                        setPageNow(1);
                    }}
                >
                    &laquo;
                </a>
                {Array(pageTotal)
                    .fill(1)
                    .map((v, i) => {
                        return (
                            <a
                                key={i}
                                href="#/"
                                className={i + 1 === pageNow ? "active" : ""}
                                onClick={() => {
                                    setPageNow(i + 1);
                                }}
                            >
                                {i + 1}
                            </a>
                        );
                    })}
                <a
                    href="#/"
                    onClick={() => {
                        setPageNow(pageTotal);
                    }}
                >
                    &raquo;
                </a>
            </div>
        </>
    );

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
    const [isOpen, setIsOpen] = useState(false);
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
                console.log("existedItem", existedItem);
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
                return { ...item, foodCount: item.foodCount + 1 };
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
            {/* <NavBar /> */}
            <NavBar />
            <div className="Food-container">
                <Path pathObj={{ path: ["．點餐"] }} />
                <Carousel imgs={[ca, ca1]} />
                <div className="container">
                    <div>
                        {showMap && (
                            <GoogleMap
                                setShowMap={setShowMap}
                                setShowDate={setShowDate}
                                setSelectedAddress={setSelectedAddress}
                                setDataFromDate={setDataFromDate}
                                setDataFromDateTime={setDataFromDateTime}
                                selectedAddress={selectedAddress}
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
                            {food.length > 0 &&
                                food[pageNow - 1]
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
                                                handleCakeCount={
                                                    handleCakeCount
                                                }
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
                        setDataFromFoodDetail={setDataFromFoodDetail}
                        setIsOpen={setIsOpen}
                    />
                </div>

                <div className="d-flex f-jcc">
                    {Array(pageTotal)
                        .fill(1)
                        .map((v, i) => {
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setPageNow(i + 1);
                                    }}
                                    className={`course-page-btn ${pageNow === i + 1
                                            ? "course-page-btn-focus"
                                            : ""
                                        }`}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                </div>

                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <Link
                        to="/member/login"
                        style={{
                            textDecoration: "none",
                            color: "var(--BLUE)",
                            padding: "40px",
                        }}
                    >
                        <h4>請先登入</h4>
                    </Link>
                </Modal>
            </div>
        </Fragment>
    );
}

export default Food;
