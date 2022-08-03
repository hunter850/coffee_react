import { Fragment } from "react";
// import StarCard from "./StarCard";
import Card from "../../../component/Products/Card";
import { Link } from "react-router-dom";
import "./StarProducts.css";

function StarProducts() {
    const el = (
        <Fragment>
            <div className="home-container">
                <div className="bottom-line m-auto">
                    <h2 className="home-title">推薦商品</h2>
                </div>
                <div className="d-flex starproduct-box">
                    <Link to="/products/detail/3">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "征服者(十包一入)",
                                card_content:
                                    "征服者入口可感受到濃郁的黑可克力口感,同時具有豐富且厚實的奶油風味",
                                card_price: "320",
                                card_sid: 3,
                                card_img_s: "bag-09-13.jpg",
                            }}
                        />
                    </Link>
                    <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "耶加雪菲(十包一入)",
                                card_content:
                                    "日曬耶加雪菲具有濃郁奔放的水果香,柔和綿長的蜜桃莓果酸卻不刺激,風味甜度高酸度明亮且細膩",
                                card_price: "320",
                                card_sid: 6,
                                card_img_s: "bag-09-06.jpg",
                            }}
                        />
                    </Link>
                    <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "木蘭花(五包一入)",
                                card_content:
                                    "優雅的韻味瀰漫著蜂蜜堅果,百香果的香氣口感,同時具有宛如蔗糖般的濃郁香氣,在味蕾留下輕柔的口感",
                                card_price: "170",
                                card_sid: 14,
                                card_img_s: "bag-09-14.jpg",
                            }}
                        />
                    </Link>
                    <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "瓜地馬拉花神(五包一入)",
                                card_content:
                                    "花神具有非常愉悅優雅花香主體的風味,酸性柔和且以巧克力般的風味尾韻作結,整體口感乾淨且明亮",
                                card_price: "170",
                                card_sid: 15,
                                card_img_s: "bag-09-15.jpg",
                            }}
                        />
                    </Link>
                    {/* <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "黃金曼巴(五包一入)",
                                card_content:
                                    "口感厚實甘醇的頂級黃金曼特寧搭配核果香氣絕佳的巴西咖啡豆,完美平衡呈現奶油的質感與明顯的可可味",
                                card_price: "170",
                                card_sid: 17,
                                card_img_s: "bag-09-07.jpg",
                            }}
                        />
                    </Link> */}
                    {/* <Link to="#/">
                        <Card
                            cardData={{
                                card_tag: "純苦",
                                card_name: "黃金曼特寧(一磅)",
                                card_content:
                                    "介紹範例文字與範圍,範例文字與範圍,介紹範例文字與範圍.456464545",
                                card_price: "940",
                                card_sid: 59,
                                card_img_s: "bag-09-08.jpg",
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
