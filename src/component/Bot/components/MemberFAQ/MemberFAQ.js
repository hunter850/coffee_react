import React from "react";

import { Fragment, useState, useEffect } from "react";

const MemberFAQ = () => {
    const [q1, setQ1] = useState(null);

    const q0response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    新客戶請點選首頁右上方「登入」，進入後點擊註冊帳號。提醒您請務必填入有效信箱設置帳號，否則訂單相關訊息將無法順利通知。
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
                    請於登入頁面，直接點選 "忘記密碼 "，請依照指示重新設置密碼。
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
                    請至我的帳戶點選修改密碼，輸入E-mail帳號、密碼登入後，輸入新密碼，即可變更。
                </div>
            </>
        );
    };

    return (
        <>
            <div className="ChatBotFAQBox">
                <div className="ChatBotFAQBoxBtn" onClick={q0response}>
                    如何註冊新帳號？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q1response}>
                    忘記密碼怎麼辦？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q2response}>
                    如何修改密碼？
                </div>
            </div>
            {q1}
        </>
    );
};

export default MemberFAQ;
