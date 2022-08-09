import React from "react";

import { Fragment, useState, useEffect } from "react";

const ProductFAQ = () => {
    const [q1, setQ1] = useState(null);

    const q0response = () => {
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
    const q1response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    產品保固期限將會依您的產品購買日開始計算，為期三個月。
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
                    請先進行開箱錄影，再寄信至0+BCoffee@gmail.com，當天會有專人為您處理。
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
                    請先進行開箱錄影，再寄信至0+BCoffee@gmail.com，當天會有專人為您處理。
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
                    目前部分商品提供預購，請依商品頁面內容指示加以訂購。
                </div>
            </>
        );
    };
    return (
        <>
            <div className="ChatBotFAQBox">
                <div className="ChatBotFAQBoxBtn" onClick={q0response}>
                    多久出貨？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q1response}>
                    商品保固期多久？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q2response}>
                    商品不滿意如何辦理退貨？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q3response}>
                    收到商品不符、破損、瑕疵怎麼辦？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q4response}>
                    是否提供商品預購服務?
                </div>
            </div>
            {q1}
        </>
    );
};

export default ProductFAQ;
