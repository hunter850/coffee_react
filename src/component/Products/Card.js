/* eslint-disable prettier/prettier */
import { React } from "react";
import "./Card.css";

function Card({ cardData }) {
    const {
        card_tag,
        card_name,
        card_content,
        card_price,
        card_img_s,
        card_img_file,
    } = cardData;

    return (
        <div className="card_card">
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
                    <div className="d-flex card_card_price">
                        <p
                            style={{
                                fontSize: "0.75rem",
                                letterSpacing: "0.07rem",
                            }}
                        >
                            NT$
                        </p>
                        <p
                            style={{
                                fontSize: "1.0625rem",
                                letterSpacing: "0.07rem",
                            }}
                        >
                            {card_price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
