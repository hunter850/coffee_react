import { Fragment, useState } from "react";
import NavBar from "../../component/NavBar";
import React from "react";
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
    const [isShowAside, setIsShowAside] = useState(false);
    const [getDataFromFoodDetail, setGetDataFromFoodDetail] = useState("");

    return (
        <Fragment>
            <NavBar />
            <Path pathObj={{ path: ["．點餐"] }} />
            <div style={{ position: "relative" }}>
                <Slideshow />

                <div className="container" style={{ minWidth: "1440px" }}>
                    <div>
                        <div style={{ display: "flex", marginLeft: "45px" }}>
                            <Filterbutton
                                setDataFromMenuFilter={setDataFromMenuFilter}
                            />
                            {/* TODO: */}
                            <h1>{dataFromMenuFilter}</h1>
                            <button
                                onClick={() => {
                                    setIsShowAside(true);
                                }}
                            >
                                按按看
                            </button>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <FoodCard
                                handleShowFoodDetailSelect={setShowFoodDetail}
                                setIsShow={setIsShow}
                            />
                        </div>
                    </div>
                </div>
                {isShow && (
                    <FoodCardDetail
                        showFoodDetail={showFoodDetail}
                        setIsShow={setIsShow}
                        setGetDataFromFoodDetail={setGetDataFromFoodDetail}
                    />
                )}
            </div>

            {isShowAside && (
                <FoodAsideSummary
                    setIsShowAside={setIsShowAside}
                    getDataFromFoodDetail={getDataFromFoodDetail}
                />
            )}
        </Fragment>
    );
}

export default Food;
