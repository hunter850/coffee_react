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

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleFoodMenu,
                        handleProductsMenu,
                        handleChitchatting,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;
