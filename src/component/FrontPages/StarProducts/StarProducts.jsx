// import React from "react";

// function StarProducts() {
//     return (
//         <>
//             <h2>推薦商品</h2>
//         </>
//     );
// }

// export default StarProducts;
import { Fragment } from "react";
// import StarCard from "./StarCard";
import Card from "../../Products/Card";
import { Link } from "react-router-dom";
import "./StarProducts.css";

function StarProducts() {
    const el = (
        <Fragment>
            <div className="home-container">
                <div className="bottom-line m-auto">
                    <h2 className="home-title">推薦商品</h2>
                </div>
                <div className="d-flex">
                    <Link to="/products/detail/1">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "曼巴咖啡",
                                card_content:
                                    "介紹範例文字與範圍,範例文字與範圍,介紹範例文字與範圍.456464545",
                                card_price: "450",
                                card_sid: 3,
                                card_img_s: "bag-09-01.jpg",
                            }}
                        />
                    </Link>
                    <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "曼巴咖啡",
                                card_content:
                                    "介紹範例文字與範圍,範例文字與範圍,介紹範例文字與範圍.456464545",
                                card_price: "450",
                                card_sid: 3,
                                card_img_s: "bag-09-01.jpg",
                            }}
                        />
                    </Link>
                    <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "曼巴咖啡",
                                card_content:
                                    "介紹範例文字與範圍,範例文字與範圍,介紹範例文字與範圍.456464545",
                                card_price: "450",
                                card_sid: 3,
                                card_img_s: "bag-09-01.jpg",
                            }}
                        />
                    </Link>
                    <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "曼巴咖啡",
                                card_content:
                                    "介紹範例文字與範圍,範例文字與範圍,介紹範例文字與範圍.456464545",
                                card_price: "450",
                                card_sid: 3,
                                card_img_s: "bag-09-01.jpg",
                            }}
                        />
                    </Link>
                    {/* <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "曼巴咖啡",
                                card_content:
                                    "介紹範例文字與範圍,範例文字與範圍,介紹範例文字與範圍.456464545",
                                card_price: "450",
                                card_sid: 3,
                                card_img_s: "bag-09-01.jpg",
                            }}
                        />
                    </Link> */}
                </div>
            </div>
        </Fragment>
    );
    return el;
}

export default StarProducts;
