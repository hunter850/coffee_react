import { Fragment, useState } from "react";
// import StarCard from "./StarCard";
// import Card from "../../../component/Products/Card";
import StarCard from "../StarProducts/StarCard";
import { Link } from "react-router-dom";
import starproductdata from "../../../routes/frontPage/data/starproductdata.js";
import "./StarProducts.css";
import ItemsCarousel from "react-items-carousel";

function StarProducts() {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 10;

    const el = (
        <Fragment>
            <div className="home-container">
                <div className="bottom-line m-auto">
                    <h2 className="home-title">推薦商品</h2>
                </div>
                <div className="d-flex starproduct-box">
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={2}
                        gutter={20}
                        leftChevron={<button>{"<"}</button>}
                        rightChevron={<button>{">"}</button>}
                        outsideChevron
                        chevronWidth={chevronWidth}
                    >
                        {starproductdata.map((v, i) => {
                            return (
                                <Link
                                    key={v.products_sid}
                                    to={`/products/detail/${v.products_sid}`}
                                >
                                    <StarCard
                                        cardData={{
                                            star_tag: "純苦",
                                            star_name: v.products_name,
                                            star_content: v.products_content,
                                            star_price: v.products_price,
                                            star_sid: v.products_sid,
                                            star_img_file: "product",
                                            star_img_s: v.products_img,
                                        }}
                                    />
                                </Link>
                            );
                        })}
                    </ItemsCarousel>
                </div>
            </div>
        </Fragment>
    );
    return el;
}

export default StarProducts;
