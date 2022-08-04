import { Fragment } from "react";
// import StarCard from "./StarCard";
// import Card from "../../../component/Products/Card";
import StarCard from "../StarProducts/StarCard";
import { Link } from "react-router-dom";
import starproductdata from "../../../routes/frontPage/data/starproductdata.js";
import "./StarProducts.css";

function StarProducts() {
    const el = (
        <Fragment>
            <div className="home-container">
                <div className="bottom-line m-auto">
                    <h2 className="home-title">推薦商品</h2>
                </div>
                <div className="d-flex starproduct-box">
                    {starproductdata.map((v, i) => {
                        return (
                            <Link to={`/products/detail/${v.products_sid}`}>
                                <StarCard
                                    cardData={{
                                        card_tag: "純苦",
                                        card_name: v.products_name,
                                        card_content:v.products_content,
                                        card_price: v.products_price,
                                        card_sid: v.products_sid,
                                        card_img_file: "product",
                                        card_img_s: v.products_img,
                                    }}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
    return el;
}

export default StarProducts;
