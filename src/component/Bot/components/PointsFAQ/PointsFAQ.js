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
                    註冊會員後點選遊戲獲得積分，可獲得會員積分，所得之積分可轉換成優惠券。每三百積分換取一張咖啡拿鐵兌換券。
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
                    積分可用來兌換優惠券，會員的點數則是消費10元獲得一點。
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
                    如何賺取積分？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q1response}>
                    積分和點數的差別？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q2response}>
                    積分有有效期限？
                </div>
            </div>
            {q1}
        </>
    );
};

export default ProductFAQ;
