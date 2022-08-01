import { useState, useEffect } from "react";
import MemberMenu from "../MemberMenu/MemberMenu";
import OderHistoryCard from "./OderHistoryCard";
import { getOrderHistory } from "../../../../config/api-path";
import { Link } from "react-router-dom";

import axios from "axios";

function OrderHistoryMain() {
    // const [cards, setCards] = useState({
    //     order_sid: "",
    //     order_time: "",
    //     order_member_id: "",
    //     order_price: 0,
    //     order_id: "",
    // });

    // const [cards, setCards] = useState([]);

    // useEffect(() => {

    //     fetch("http://localhost:3500/member-order", {
    //     method: "GET",
    // })
    //     .then((r) => r.json())
    //     .then((r) => {
    //         setCards(r);
    //         console.log(setCards(r));

    //     });

    // }, []);

    const [cards, setCards] = useState([]);

    const getData = async () => {
        const response = await axios.get(getOrderHistory);

        setCards(response.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="odh-wrap-main">
                <div className="odh-container">
                    <MemberMenu />
                    <div className="odh-wrap-right">
                        {cards.map((v, i) => {
                            return (
                                <div key={v.order_sid}>
                                    <OderHistoryCard cards={{
                                        order_sid: v.order_sid,
                                        order_time: v.order_time,
                                        order_member_id: v.order_member_id,
                                        order_price: v.order_price,
                                        order_id: v.order_id,
                                    }}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryMain;
