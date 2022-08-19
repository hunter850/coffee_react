import React from "react";
import "./LatestTitle.css";

export default function LatestTitle() {
    return (
        <>
            <div className="titleitem-layout">
                <div className="latestnew-day">2022.08.24</div>
                <div className="latestnew-title" style={{ textAlign: "start" }}>
                    🍰 卡士達千層蛋糕領軍 來拎+B推出5款經典蛋糕 🍰
                </div>
            </div>
            <div className="titleitem-layout">
                <div className="latestnew-day">2022.08.26</div>
                <div className="latestnew-title" style={{ textAlign: "start" }}>
                    ☕ 「茶萃咖啡歐蕾」 現萃茶香與經典拿鐵的完美結合 ☕
                </div>
            </div>
            <div className="titleitem-layout">
                <div className="latestnew-day">2022.08.28</div>
                <div className="latestnew-title" style={{ textAlign: "start" }}>
                    😋「微韻輕拿鐵」、「贅沢厚乳拿鐵」秋日幸福上市 😋
                </div>
            </div>
            <div className="titleitem-layout">
                <div className="latestnew-day">2022.09.12</div>
                <div className="latestnew-title" style={{ textAlign: "start" }}>
                    新品上市 /源自日本的濃萃咖啡球，9/12
                    起來拎+B門市搶先品嚐享限時9折
                </div>
            </div>
        </>
    );
}
