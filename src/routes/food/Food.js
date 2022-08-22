import React, { Fragment, useState, useEffect } from "react";
import "./Food.scss";
import Filterbutton from "../../component/Food/components/FilterButton";
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
import ca2 from "../../images/food/carousel003.jpg";
import Modal from "../../component/Modal/Modal";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";
import "../course/Course.css";
import Chatbot from "../../component/Bot/ChatBot";
import Footer from "../../component/Footer";

// 餐點篩選
const menuFiliter = [
    { id: undefined, name: "全部餐點" },
    { id: "1", name: "咖啡系列" },
    { id: "2", name: "其他飲品" },
    { id: "3", name: "千層蛋糕" },
    { id: "4", name: "輕食沙拉" },
];

// state 集中管理，把function帶入useState， 物件取值
const defaultState = {
    dataFromFoodDetail: [],
    dataFromDate: "",
    dataFromDateTime: "",
    selectedAddress: {},
};

const getFoodStorageByKey = (key) => {
    try {
        const foodData = JSON.parse(localStorage.getItem("foodData"));

        if (foodData[key]) {
            return foodData[key];
        }
    } catch (e) {
        // console.log("error");
    }

    return defaultState[key];
};

// 設定一頁筆數
// const perPage = 9;

function Food() {
    // 從sql拿資料--------------------------------------------------------
    const [foodFromApi, setFoodFromApi] = useState([]);
    // const [pageNow, setPageNow] = useState(1); // 預設第一頁
    // const [pageTotal, setPageTotal] = useState(1); // 等伺服器抓完資料才知道多少(didMount時決定)
    // ------------------------------------------------------------------
    const [foodFilter, setFoodFilter] = useState(menuFiliter[0].id);
    const [showFoodDetail, setShowFoodDetail] = useState({
        menu_name: "",
        menu_nutrition: "",
        menu_price_m: "",
        menu_sid: "",
        menu_categories: "",
    });
    // const localFood = JSON.parse(localStorage.getItem("myOrder"));
    // console.log("localFood");

    const [dataFromFoodDetail, setDataFromFoodDetail] = useState(
        getFoodStorageByKey("dataFromFoodDetail")
    );

    // const Auth = useContext(AuthContext);
    // console.log("Auth", Auth.sid);

    //拿自取時段的資料--------------------------------------------------
    const [dataFromDate, setDataFromDate] = useState(
        getFoodStorageByKey("dataFromDate")
    );
    const [dataFromDateTime, setDataFromDateTime] = useState(
        getFoodStorageByKey("dataFromDateTime")
    );
    const [productsScroll, setProductsScroll] = useState(false);

    const [isShow, setIsShow] = useState(false);
    const [showMap, setShowMap] = useState(false);
    // const [isShowAside, setIsShowAside] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(
        getFoodStorageByKey("selectedAddress")
    );
    const [isOpen, setIsOpen] = useState(false);

    // const getCurrentFilterFood = useCallback(() => {
    //     return foodFromApi.filter(
    //         ({ menu_categories }) =>
    //             !foodFilter || menu_categories === foodFilter
    //     );
    // }, [foodFilter, foodFromApi]);

    // 載入資料指示狀態
    useEffect(() => {
        const getFoodData = async () => {
            const response = await axios.get(foodDataGet);
            setFoodFromApi(response.data);
        };
        getFoodData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setProductsScroll(false);
    }, [productsScroll]);

    useEffect(() => {
        localStorage.setItem(
            "foodData",
            JSON.stringify({
                dataFromFoodDetail,
                dataFromDate,
                dataFromDateTime,
                selectedAddress,
            })
        );
    }, [dataFromFoodDetail, dataFromDate, dataFromDateTime, selectedAddress]);
    // 載入資料指示狀態
    useEffect(() => {
        // const filterFood = getCurrentFilterFood();
        // // 設定總筆數該分成幾頁
        // setPageTotal(Math.ceil(filterFood.length / perPage));
        // // 重置到第一頁
        // setPageNow(1);
    }, [foodFilter, foodFromApi]);

    // const food = getCurrentFilterFood().filter(
    //     (f, idx) => idx >= perPage * (pageNow - 1) && idx < perPage * pageNow
    // );

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
        const isSameFood = dataFromFoodDetail.some((existedItem) =>
            compareItems(existedItem, allfood)
        );
        if (isSameFood) {
            newData = dataFromFoodDetail.map((item) => {
                if (compareItems(item, allfood)) {
                    return { ...item, foodCount: item.foodCount + 1 };
                }
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
            {/* <NavBar /> */}
            <NavBar />
            <div className="Food-container">
                <Path pathObj={{ path: ["．點餐"] }} />
                <Carousel imgs={[ca, ca1,ca2]} />
                <div className="container">
                    <div>
                        {showMap && (
                            <GoogleMap
                                setShowMap={setShowMap}
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

                            {foodFromApi
                                .filter(
                                    ({ menu_categories }) =>
                                        !foodFilter ||
                                        menu_categories === foodFilter
                                )
                                .map((allfood, i) => {
                                    return (
                                        <FoodCard
                                            key={`menu_sid_${i}`}
                                            allfood={allfood}
                                            setShowFoodDetail={
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
                        setShowMap={setShowMap}
                        selectedAddress={selectedAddress}
                        setDataFromFoodDetail={setDataFromFoodDetail}
                        setIsOpen={setIsOpen}
                    />
                </div>
                {/* <div className="d-flex f-jcc">
                    {Array(pageTotal)
                        .fill(1)
                        .map((v, i) => {
                            return (
                                <div
                                    key={`pageTotal_${i}`}
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
                </div> */}

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
            <button
                className={"producstsScrolltop"}
                onClick={() => {
                    setProductsScroll(true);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up-circle"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
                    />
                </svg>
            </button>
            <Chatbot />
            <br />

            <Footer />
        </Fragment>
    );
}

export default Food;
