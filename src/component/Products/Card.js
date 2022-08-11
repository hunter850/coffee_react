import { React } from "react";
import "./Card.scss";

function Card({ cardData }) {
    const {
        card_tag,
        card_name,
        card_content,
        card_price,
        card_img_s,
        card_img_file,
        card_className,
    } = cardData;

    return (
        <div className={card_className}>
            <div
                className="card_card_top"
                style={{
                    background: `url(http://localhost:3500/images/products/${card_img_file}/${card_img_s}) no-repeat center center`,
                    backgroundSize: "cover",
                }}
            >
                <div className="card_tag">{card_tag}</div>
            </div>
            <div className="card_card_down">
                <div className="card_card_txt">
                    <div>
                        <p
                            style={{
                                fontWeight: "bolder",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {card_name}
                        </p>
                        <p className="font-min" style={{ color: "#898787" }}>
                            {card_content}
                        </p>
                    </div>
                    <div className="d-flex card_card_price">
                        <p className="card_nt">
                            NT$
                        </p>
                        <p className="card_ntNum">
                            {card_price}
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Card;
