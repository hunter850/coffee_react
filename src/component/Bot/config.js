import { createChatBotMessage } from "react-chatbot-kit";
import FoodMenu from "../Bot/components/FoodMenu/FoodMenu";
import ProductsMenu from "../Bot/components/ProductsMenu/ProductsMenu";
import RandomFoodMenu from "../Bot/components/RandomFoodMenu/RandomFoodMenu";
import ChatBotFAQ from "../Bot/components/ChatBotFAQ/ChatBotFAQ";
import ProductFAQ from "../Bot/components/ProductFAQ/ProductFAQ";
import CartFAQ from "../Bot/components/CartFAQ/CartFAQ";
import CourseFAQ from "../Bot/components/CourseFAQ/CourseFAQ";
import MemberFAQ from "../Bot/components/MemberFAQ/MemberFAQ";
import CouponFAQ from "../Bot/components/CouponFAQ/CouponFAQ";
import PointsFAQ from "../Bot/components/PointsFAQ/PointsFAQ";

const botName = "嘎B";
const config = {
    initialMessages: [
        createChatBotMessage(`Hi!我是0+B客服機器人 嘎B`, {
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
        {
            widgetName: "RandomFoodMenu",
            widgetFunc: (props) => <RandomFoodMenu {...props} />,
        },
        {
            widgetName: "ChatBotFAQ",
            widgetFunc: (props) => <ChatBotFAQ {...props} />,
        },
        {
            widgetName: "ProductFAQ",
            widgetFunc: (props) => <ProductFAQ {...props} />,
        },
        {
            widgetName: "CartFAQ",
            widgetFunc: (props) => <CartFAQ {...props} />,
        },
        {
            widgetName: "CourseFAQ",
            widgetFunc: (props) => <CourseFAQ {...props} />,
        },
        {
            widgetName: "MemberFAQ",
            widgetFunc: (props) => <MemberFAQ {...props} />,
        },
        {
            widgetName: "CouponFAQ",
            widgetFunc: (props) => <CouponFAQ {...props} />,
        },
        {
            widgetName: "PointsFAQ",
            widgetFunc: (props) => <PointsFAQ {...props} />,
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
