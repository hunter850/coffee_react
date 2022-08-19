import { React } from "react";
import "./Card.scss";

function Card(props) {
    const {
        card_tag,
        card_name,
        card_content,
        card_price,
        card_img_s,
        card_img_file,
        card_className,
        card_sid,
    } = props.cardData;
    const { tagData } = props;
    // console.log(
    //     tagData.filter((v, i) => {
    //         return v.products_sid === card_sid;
    //     })
    // );
    // console.log(card_tag);
    // console.log(
    //     tagData.filter((v, i) => {
    //         return v.products_sid === products_sid;
    //     })
    // );
    return (
        <div className={card_className}>
            <div
                className="card_card_top"
                style={{
                    background: `url(http://localhost:3500/images/products/${card_img_file}/${card_img_s}) no-repeat center center`,
                    backgroundSize: "cover",
                }}
            >
                <div className="tagWrap">
                    {tagData
                        .filter((v, i) => {
                            return v.products_sid === card_sid;
                        })
                        .map((v, i) => {
                            return (
                                <div className="card_tag" key={i}>
                                    {v.products_style_filter_categories}
                                </div>
                            );
                        })}
                </div>
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
                        <p className="card_nt">NT$</p>
                        <p className="card_ntNum">{card_price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
