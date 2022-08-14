import React from "react";

import { Fragment, useState, useEffect } from "react";

const CartFAQ = () => {
    const [q1, setQ1] = useState(null);

    const q1response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    除網頁另有標示外，原則上不需另外支付運費或是其它費用。
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
                    訂單發票會在完成訂單後七天內開立電子發票⚠️
                    請到此網址查詢發票明細: https://consumer. ezreceipt.cc/home
                    /90489699
                </div>
            </>
        );
    };
    const q3response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    通常超商取貨周一~周五14:00前下單完成訂單流程8~48小時內出貨(視訂單量而定調整進度)
                </div>
            </>
        );
    };
    const q4response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    收到商品請先進行開箱錄影，再寄信至0+BCoffee@gmail.com，當天會有專人為您處理。
                </div>
            </>
        );
    };
    const q5response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    我們提供批發或團購，我們都有提供專屬的優惠方案，歡迎您的洽詢，再寄信至0+BCoffee@gmail.com。
                </div>
            </>
        );
    };
    return (
        <>
            <div className="ChatBotFAQBox">
                <div className="ChatBotFAQBoxBtn" onClick={q1response}>
                    我所購買的商品是否必須支付運費?
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q2response}>
                    發票相關問題
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q3response}>
                    配送相關問題
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q4response}>
                    請問取消訂單、退款的方式有哪些？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q5response}>
                    如果大量訂購會有優惠嗎？
                </div>
            </div>
            {q1}
        </>
    );
};

export default CartFAQ;
