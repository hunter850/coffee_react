import { Link } from "react-router-dom";
import Card from "./Card";
import "./List.scss";

function List() {
    return (
        <>
            <div className="products_list">
                <div className="list_title">
                    <h3 className="title-font">商品列表</h3>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-grid-3x2-gap-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9z" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-list-ul"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="card_regin">
                    {Array(20)
                        .fill(1)
                        .map((v, i) => {
                            return (
                                <Link to="/products/detail/1" key={i}>
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
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default List;
