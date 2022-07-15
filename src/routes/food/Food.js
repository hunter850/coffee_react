import { Fragment, useState } from "react";
import NavBar from "../../component/NavBar";
import React from "react";
import Filterbutton from "../../component/Food/components/FilterButton";
import Slideshow from "../../component/Food/components/SlideShow";
import FoodCard from "../../component/Food/components/FoodCard";
import Path from "../../component/Item/Path/Path";
import FoodCardDetail from "../../component/Food/components/FoodCardDetail";

function Food() {
    const [showFoodDetail, setShowFoodDetail] = useState({
        menu_name: "",
        menu_nutrition: "",
        menu_price_m: "",
        menu_sid: "",
        menu_categories: "",
    });
    return (
        <Fragment>
            <NavBar />
            <Path pathObj={{ path: ["．點餐"] }} />
            <Slideshow />

            <div className="container" style={{ minWidth: "1440px" }}>
                <div>
                    <div style={{ display: "flex", marginLeft: "45px" }}>
                        <Filterbutton />
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
                        />
                    </div>
                </div>
            </div>
            <FoodCardDetail showFoodDetail={showFoodDetail} />
        </Fragment>
    );
}

export default Food;
