import React from "react";

import { Fragment, useState, useEffect } from "react";

const CourseFAQ = () => {
    const [q1, setQ1] = useState(null);

    const q0response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion"
                    style={{ "background-color": "rgb(55, 107, 126)" }}
                >
                    請於開課前十天通知我們並辦理退費，請再寄信至0+BCoffee@gmail.com。如未於上課前十天提前通知者，將扣除總費用40%後退還餘款。
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
                    我們長期都有針對團體、學校、政府機構、私人包班上課的服務，可以洽詢我們的門市人員。
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
                    我們的講師皆為取得SCAE國際咖啡組織發頒發咖啡認證文憑的考官和講師，從事SCA咖啡認證及推廣教育己超過十年。
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
                    所有會員均需從基礎課程開始上課，無法直接購買進階課程。
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
                    不需要，材料我們現場均有提供。
                </div>
            </>
        );
    };
    return (
        <>
            <div className="ChatBotFAQBox">
                <div className="ChatBotFAQBoxBtn" onClick={q0response}>
                    課程退費?
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q1response}>
                    是否有團體包班上課？
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q2response}>
                    關於講師?
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q3response}>
                    有進階課程嗎?
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q4response}>
                    課程需要自備材料嗎?
                </div>
            </div>
            {q1}
        </>
    );
};

export default CourseFAQ;
