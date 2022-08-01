import { createChatBotMessage } from "react-chatbot-kit";
import FoodMenu from "../Bot/components/FoodMenu/FoodMenu";
import ProductsMenu from "../Bot/components/ProductsMenu/ProductsMenu";
const botName = "嘎B";
const config = {
    initialMessages: [createChatBotMessage(`Hi!我是0+B客服機器人 ${botName}`)],
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
        },{
            widgetName: "ProductsMenu",
            widgetFunc: (props) => <ProductsMenu {...props} />,
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
