import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage("Hello. Nice to meet you.");
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleChitchatting = () => {
        const botMessage = createChatBotMessage("別擔心！你一定沒問題！");
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleFoodMenu = () => {
        const botMessage = createChatBotMessage("查看最新餐點選單", {
            widget: "FoodMenu",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleProductsMenu = () => {
        const botMessage = createChatBotMessage("查看最新商品選單", {
            widget: "ProductsMenu",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleTextError = () => {
        const botMessage = createChatBotMessage(
            "你可以描述得更完整一些，我會比較容易理解喔！"
        );
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleRandomFoodMenu = () => {
        const botMessage = createChatBotMessage("推薦你最近很受客人歡迎的", {
            widget: "RandomFoodMenu",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleProductFAQ = () => {
        const botMessage = createChatBotMessage("關於商品問題", {
            widget: "ProductFAQ",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleCartFAQ = () => {
        const botMessage = createChatBotMessage("關於購物問題", {
            widget: "CartFAQ",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleCourseFAQ = () => {
        const botMessage = createChatBotMessage("關於課程問題", {
            widget: "CourseFAQ",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleMemberFAQ = () => {
        const botMessage = createChatBotMessage("關於會員問題", {
            widget: "MemberFAQ",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleCouponFAQ = () => {
        const botMessage = createChatBotMessage("關於優惠券問題", {
            widget: "CouponFAQ",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handlePointsFAQ = () => {
        const botMessage = createChatBotMessage("關於積分問題", {
            widget: "PointsFAQ",
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleFoodMenu,
                        handleProductsMenu,
                        handleChitchatting,
                        handleTextError,
                        handleRandomFoodMenu,
                        handleProductFAQ,
                        handleCartFAQ,
                        handleCourseFAQ,
                        handleMemberFAQ,
                        handleCouponFAQ,
                        handlePointsFAQ,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;
