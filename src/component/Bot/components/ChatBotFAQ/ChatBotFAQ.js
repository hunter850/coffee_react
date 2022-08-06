import React from "react";

import { Fragment, useState, useEffect } from "react";

const ChatBotFAQ = () => {
    const [q1, setQ1] = useState(null);

    const q1response = () => {
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
                    收到商品請先進行開箱錄影，再寄信至0+BCoffee@gmail.com，當天會有專人為您處理。
                </div>
            </>
        );
    };
    return (
        <>
            <div className="ChatBotFAQBox">
                <div className="ChatBotFAQBoxBtn" onClick={q1response}>
                    配送相關問題
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q2response}>
                    發票相關問題
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q3response}>
                    商品有瑕疵
                </div>
            </div>
            {q1}
        </>
    );
};

export default ChatBotFAQ;
