import { Fragment, useState } from "react";
import NavBar from "../../component/NavBar";
import React from "react";
import "./Food.css";
import Filterbutton from "../../component/Food/components/FilterButton";
import Slideshow from "../../component/Food/components/SlideShow";
import FoodCard from "../../component/Food/components/FoodCard";
import Path from "../../component/Item/Path/Path";
import FoodCardDetail from "../../component/Food/components/FoodCardDetail";
import FoodAsideSummary from "../../component/Food/components/FoodAsideSummary";

function Food() {
    const [showFoodDetail, setShowFoodDetail] = useState({
        menu_name: "",
        menu_nutrition: "",
        menu_price_m: "",
        menu_sid: "",
        menu_categories: "",
    });
    const [dataFromMenuFilter, setDataFromMenuFilter] = useState("");
    const [isShow, setIsShow] = useState(false);
    // const [isShowAside, setIsShowAside] = useState(false);
    const [dataFromFoodDetail, setDataFromFoodDetail] = useState([]);

    const handleDetailAppend = (item) => {
        setDataFromFoodDetail([...dataFromFoodDetail, item]);
        // new state dataFromFoodDetail = [...dataFromFoodDetail, item]
    };

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
                                <Filterbutton
                                    setDataFromMenuFilter={
                                        setDataFromMenuFilter
                                    }
                                />
                                {/* TODO: */}
                                <h1>{dataFromMenuFilter}</h1>
                                {/* <button
                                onClick={() => {
                                    setIsShowAside(true);
                                }}
                            >
                                按按看
                            </button> */}
                            </div>
                            <div className="foodcard-session">
                                <FoodCard
                                    handleShowFoodDetailSelect={
                                        setShowFoodDetail
                                    }
                                    setIsShow={setIsShow}
                                />
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
