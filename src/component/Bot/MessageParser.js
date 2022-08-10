import React from "react";

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        if (
            message.includes("hello") ||
            message.includes("Hello") ||
            message.includes("哈囉") ||
            message.includes("嗨") ||
            message.includes("Hi") ||
            message.includes("hi") ||
            message.includes("你好") ||
            message.includes("早安") ||
            message.includes("晚安") ||
            message.includes("午安")
        ) {
            actions.handleHello();
        } else if (
            message.includes("心情") ||
            message.includes("壓力") ||
            message.includes("難過") ||
            message.includes("專題") ||
            message.includes("大專")
        ) {
            actions.handleChitchatting();
        } else if (
            message.includes("咖啡拿鐵") ||
            message.includes("焦糖瑪奇朵") ||
            message.includes("拿鐵") ||
            message.includes("卡布奇諾") ||
            message.includes("黑糖風味拿鐵") ||
            message.includes("鴛鴦咖啡") ||
            message.includes("香草風味拿鐵") ||
            message.includes("拿鐵歐蕾") ||
            message.includes("義式摩卡") ||
            message.includes("莊園級美式") ||
            message.includes("哥倫比亞 ") ||
            message.includes("曼巴") ||
            message.includes("黃金曼特寧") ||
            message.includes("肯亞精選小農") ||
            message.includes("莊園老饕深焙") ||
            message.includes("耶加雪菲") ||
            message.includes("義式巧克力") ||
            message.includes("宇治奶茶") ||
            message.includes("芋泥奶綠千層蛋糕") ||
            message.includes("小山園抹茶千層蛋糕") ||
            message.includes("烏龍海鹽芝芝奶蓋千層") ||
            message.includes("海鹽太妃開心果千層蛋糕") ||
            message.includes("金沙焦糖脆脆千層") ||
            message.includes("餐點") ||
            message.includes("菜單") ||
            message.includes("價格") ||
            message.includes("蛋糕") ||
            message.includes("飲料") ||
            message.includes("黑咖啡") ||
            message.includes("美式") ||
            message.includes("濃縮") ||
            message.includes("咖啡")
        ) {
            actions.handleFoodMenu();
        } else if (
            message.includes("肯亞AA TOP") ||
            message.includes("模範生") ||
            message.includes("征服者") ||
            message.includes("木蘭花") ||
            message.includes("耶加雪菲禮盒") ||
            message.includes("黃金曼巴禮盒") ||
            message.includes("黃金曼特寧(十包一入)") ||
            message.includes("曼巴(十包一入)") ||
            message.includes("義式綜合豆") ||
            message.includes("瓜地馬拉花神") ||
            message.includes("禮盒") ||
            message.includes("濾紙") ||
            message.includes("電動慢磨機") ||
            message.includes("電子禮物卡") ||
            message.includes("濾掛式咖啡") ||
            message.includes("咖啡周邊器具") ||
            message.includes("食品禮盒") ||
            message.includes("送禮") ||
            message.includes("禮物") ||
            message.includes("周邊") ||
            message.includes("豆子")
        ) {
            actions.handleProductsMenu();
        } else if (
            message.includes("隨機") ||
            message.includes("推薦") ||
            message.includes("吃") ||
            message.includes("餓") ||
            message.includes("食物")
        ) {
            actions.handleRandomFoodMenu();
        } else if (
            message.includes("商品") ||
            message.includes("破損") ||
            message.includes("訂購") ||
            message.includes("商品不滿意") ||
            message.includes("保固") ||
            message.includes("退貨") ||
            message.includes("預購") ||
            message.includes("出貨")
        ) {
            actions.handleProductFAQ();
        } else if (
            message.includes("運費") ||
            message.includes("退貨") ||
            message.includes("退款") ||
            message.includes("付款") ||
            message.includes("帳單") ||
            message.includes("繳款") ||
            message.includes("交易") ||
            message.includes("訂單") ||
            message.includes("取消")
        ) {
            actions.handleCartFAQ();
        } else if (
            message.includes("課程") ||
            message.includes("教室") ||
            message.includes("教師") ||
            message.includes("講師") ||
            message.includes("課") ||
            message.includes("做蛋糕") ||
            message.includes("拉花") ||
            message.includes("基礎") ||
            message.includes("進階") ||
            message.includes("班") ||
            message.includes("沖") ||
            message.includes("咖啡豆介紹")
        ) {
            actions.handleCourseFAQ();
        } else if (
            message.includes("帳戶") ||
            message.includes("會員") ||
            message.includes("註冊") ||
            message.includes("帳號") ||
            message.includes("密碼") ||
            message.includes("忘記") ||
            message.includes("修改") ||
            message.includes("申請") ||
            message.includes("登") ||
            message.includes("帳密") ||
            message.includes("VIP")
        ) {
            actions.handleMemberFAQ();
        } else if (
            message.includes("優惠券") ||
            message.includes("打折") ||
            message.includes("折扣") ||
            message.includes("優惠") ||
            message.includes("券")
        ) {
            actions.handleCouponFAQ();
        } else if (
            message.includes("積分") ||
            message.includes("兌換") ||
            message.includes("轉換") ||
            message.includes("分") ||
            message.includes("換") ||
            message.includes("點數")
        ) {
            actions.handlePointsFAQ();
        } else {
            actions.handleTextError();
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions: {},
                });
            })}
        </div>
    );
};

export default MessageParser;
