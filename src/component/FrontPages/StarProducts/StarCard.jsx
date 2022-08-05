/* eslint-disable prettier/prettier */
import { React } from "react";
import "./StarCard.css";

function Card({ cardData }) {
    const {
        star_tag,
        star_name,
        star_content,
        star_price,
        star_img_s,
        star_img_file,
    } = cardData;

    return (
        <div className="star_card">
            <div
                className="star_card_top"
                style={{
                    background: `url(http://localhost:3500/images/frontpage/${star_img_file}/${star_img_s}) no-repeat center center`,
                    backgroundSize: "cover",
                }}
            >
                <div className="star_tag">{star_tag}</div>
            </div>
            <div className="star_card_down">
                <div className="star_card_txt">
                    <p
                        style={{
                            fontWeight: "bolder",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {star_name}
                    </p>
                    <p className="font-min" style={{ color: "#898787" }}>
                        {star_content}
                    </p>
                    <div className="d-flex star_card_price">
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
                            {star_price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
