import React from "react";

import { Fragment, useState, useEffect } from "react";

const ChatBotFAQ = () => {
    const [q1, setQ1] = useState(null);
    // ======
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [start, setStart] = useState(false);

    const q1response = () => {
        return setQ1(
            <>
                <div
                    className="react-chatbot-kit-chat-bot-message FAQquestion EesyM"
                    style={{ backgroundColor: "rgb(55, 107, 126)" }}
                >
                    <img
                        src={require("../../../../images/Coupon/EasyMenu.jpg")}
                        alt=""
                    />
                </div>
            </>
        );
    };
    const questions = [
        {
            questionText: "一天當中你最喜歡哪個時段呢？",
            answerOption: [
                { answerText: "晴朗涼爽的白天", isCorrect: true },
                { answerText: "微風徐徐的傍晚", isCorrect: false },
                { answerText: "寧靜平和的夜晚", isCorrect: true },
            ],
        },
        {
            questionText: "你在現實生活中容易被哪一類人吸引",
            answerOption: [
                { answerText: "有反差感、外冷內熱的人", isCorrect: true },
                { answerText: "性格溫暖、重視他人感受", isCorrect: false },
                { answerText: "優雅、有禮貌的人", isCorrect: true },
                {
                    answerText: "不受拘束、喜歡自由自在的人",
                    isCorrect: false,
                },
            ],
        },
        {
            questionText: "午後，你靜靜的坐在咖啡廳的？",
            answerOption: [
                { answerText: "門口旁", isCorrect: true },
                { answerText: "中央", isCorrect: false },
                { answerText: "角落", isCorrect: true },
                { answerText: "吧檯", isCorrect: false },
            ],
        },
        {
            questionText: "選擇一個你喜歡植物?",
            answerOption: [
                { answerText: "茂盛的大樹", isCorrect: true },
                { answerText: "芳香清新的花朵", isCorrect: false },
                { answerText: "結實纍纍的果實", isCorrect: true },
                { answerText: "剛萌芽的嫩苗", isCorrect: false },
            ],
        },
        {
            questionText: "周末最喜歡做的事?",
            answerOption: [
                { answerText: "在家追劇、打電動", isCorrect: true },
                { answerText: "去戶外運動", isCorrect: false },
                { answerText: "揪朋友出去玩", isCorrect: true },
                { answerText: "來場一個人的小旅行", isCorrect: false },
            ],
        },
    ];
    const answerQuestion = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    const q2response = () => {
        return setQ1();
    };
    useEffect(() => {}, []);
    return (
        <>
            <div className="ChatBotFAQBox">
                <div className="ChatBotFAQBoxBtn" onClick={q1response}>
                    簡易菜單
                </div>
                <div className="ChatBotFAQBoxBtn" onClick={q2response}>
                    咖啡心理測驗
                </div>
                <div className="personalityQuizBox">
                    {start ? (
                        showScore && score <= 0 ? (
                            <div className="personalityQuizImg">
                                <img
                                    src={require("../../../../images/Coupon/quzi1.jpg")}
                                    alt=""
                                />
                                <div className="personalityQuizImgInner">
                                    <p>#卡布奇諾：社交王</p>
                                    <p>
                                        通常樂於嘗試新的事物的你，熱愛社交且有著冒險家的精神，適合來一杯濃濃泡沫的卡布奇諾。
                                    </p>
                                </div>
                            </div>
                        ) : showScore && score <= 1 ? (
                            <div className="personalityQuizImg">
                                <img
                                    src={require("../../../../images/Coupon/quzi2.jpg")}
                                    alt=""
                                />
                                <div className="personalityQuizImgInner">
                                    <p>#星冰樂：冒險家</p>
                                    <p>
                                        具有冒險精神的你，喜歡接觸與挑戰新事物，帶上一杯星冰樂去探險吧
                                    </p>
                                </div>
                            </div>
                        ) : showScore && score <= 2 ? (
                            <div className="personalityQuizImg">
                                <img
                                    src={require("../../../../images/Coupon/quzi3.jpg")}
                                    alt=""
                                />
                                <div className="personalityQuizImgInner">
                                    <p>#義式咖啡：完美主義者</p>
                                    <p>
                                        有傾向於完美主義的你，對事物都非常講究，用義式咖啡讓自己精神飽滿吧
                                    </p>
                                </div>
                            </div>
                        ) : showScore && score <= 3 ? (
                            <div className="personalityQuizImg">
                                <img
                                    src={require("../../../../images/Coupon/quzi4.jpg")}
                                    alt=""
                                />
                                <div className="personalityQuizImgInner">
                                    <p>#焦糖瑪奇朵：樂天派</p>
                                    <p>
                                        性格隨和的你，亦具有一顆未泯的童心，想法簡單，對於他人較為友善，就像人見人愛的焦糖瑪奇朵。
                                    </p>
                                </div>
                            </div>
                        ) : showScore && score <= 4 ? (
                            <div className="personalityQuizImg">
                                <img
                                    src={require("../../../../images/Coupon/quzi5.jpg")}
                                    alt=""
                                />
                                <div className="personalityQuizImgInner">
                                    <p>#摩卡：創造者</p>
                                    <p>
                                        擁有外向主動的性格而且具創意的你，對事情帶有強勁的分析力與獨有的見解，來杯香醇濃郁的摩卡吧
                                    </p>
                                </div>
                            </div>
                        ) : showScore && score <= 5 ? (
                            <div className="personalityQuizImg">
                                <img
                                    src={require("../../../../images/Coupon/quzi6.jpg")}
                                    alt=""
                                />
                                <div className="personalityQuizImgInner">
                                    <p>#濃縮咖啡：簡單主義者</p>
                                    <p>
                                        喜歡簡單化一切的事情的你，就像是黑咖啡一樣純粹。
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="personalityQuizInner1">
                                    <div className="question-text1">
                                        <p>
                                            Question {currentQuestion + 1}/
                                            {questions.length}
                                        </p>
                                    </div>
                                    <div className="question-text2">
                                        {
                                            questions[currentQuestion]
                                                .questionText
                                        }
                                    </div>
                                </div>
                                <div className="personalityQuizInner2">
                                    {questions[
                                        currentQuestion
                                    ].answerOption.map((answerOption) => (
                                        <button
                                            className="question-text-btn"
                                            onClick={() =>
                                                answerQuestion(
                                                    answerOption.isCorrect
                                                )
                                            }
                                        >
                                            {answerOption.answerText}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )
                    ) : (
                        <>
                            <div className="personalityQuizStart">
                                <p>
                                    內在性格 | 分析看出 <br /> 適合你的咖啡
                                </p>
                                <img
                                    src={require("../../../../images/Coupon/img_tips_04.png")}
                                    alt=""
                                    style={{ width: "50px" }}
                                />
                                <button
                                    className="personalityQuizStartBtn"
                                    onClick={() => setStart(true)}
                                >
                                    <p>點擊開始</p>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {q1}
        </>
    );
};

export default ChatBotFAQ;
