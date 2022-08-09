import React from "react";

import { Fragment, useState, useEffect } from "react";

const CouponFAQ = () => {
    const [q1, setQ1] = useState(null);

    const q0response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    優惠券都是有使用期限的。
                    您可以在“會員”中的“優惠券”選項中進行確認。
                    一旦超過使用期限，優惠券會自動失效。
                    過期的優惠券將無法再次發行。
                </div>
            </>
        );
    };
    const q1response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    餐點、商品都可以使用優惠券，詳情請見優惠券。
                </div>
            </>
        );
    };
    const q2response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    您可以在“會員”中的“優惠券”選項中進行確認。
                    在優惠券一覽中，會顯示您持有的優惠券以及使用過的優惠券內容。
                    也會顯示優惠券的領取期限和使用期限等情況。
                    請您及時確認優惠券的持有情況，避免未使用或過期無法使用。
                </div>
            </>
        );
    };

    return (
        <>
            <div className="ChatBotFAQBox">
                <div className="ChatBotFAQBoxBtn" onClick={q0response}>
                    優惠券有使用期限嗎？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q1response}>
                    優惠券只能使用在餐點上嗎？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q2response}>
                    如何確認目前持有的優惠券情況？
                </div>
            </div>
            {q1}
        </>
    );
};

export default CouponFAQ;
