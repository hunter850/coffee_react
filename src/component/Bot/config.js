import { createChatBotMessage } from "react-chatbot-kit";
import FoodMenu from "../Bot/components/FoodMenu/FoodMenu";
import ProductsMenu from "../Bot/components/ProductsMenu/ProductsMenu";
import RandomFoodMenu from "../Bot/components/RandomFoodMenu/RandomFoodMenu";
import ChatBotFAQ from "../Bot/components/ChatBotFAQ/ChatBotFAQ";
const botName = "嘎B";
const config = {
    initialMessages: [
        createChatBotMessage(`Hi!我是0+B客服機器人 ${botName}`),
        createChatBotMessage(`主要任務是處理問題分流、簡單答覆`, {
            widget: "ChatBotFAQ",
        }),
    ],
    botName: botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },
    widgets: [
        {
            widgetName: "FoodMenu",
            widgetFunc: (props) => <FoodMenu {...props} />,
        },
        {
            widgetName: "ProductsMenu",
            widgetFunc: (props) => <ProductsMenu {...props} />,
        },
        ,
        {
            widgetName: "RandomFoodMenu",
            widgetFunc: (props) => <RandomFoodMenu {...props} />,
        },
        {
            widgetName: "ChatBotFAQ",
            widgetFunc: (props) => <ChatBotFAQ {...props} />,
        },
    ],
};

const message = createChatBotMessage("");

const messageWithProperties = createChatBotMessage("", {
    widget: "my-widget",
    payload: {},
    delay: 1000,
});

export default config;
