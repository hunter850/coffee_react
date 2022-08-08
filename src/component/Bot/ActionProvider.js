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
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;
