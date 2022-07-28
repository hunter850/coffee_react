import Btn from "../../Item/Btn/Btn";
import Tag from "../../Item/Tag/Tag";
import "./Productinfo.scss";

function Productinfo() {
    const el = (
        <div className="productInfo">
            <h2 className="title-font">肯亞AA TOP(十包一入)</h2>
            <p className="productIntro">
                產地:非洲
                <br />
                <br />
                處理法:水洗
                <br />
                <br />
                風味:黑梅/李子/葡萄 AA
                <br />
                <br />
                TOP最高等級的肯亞咖啡豆其濃郁的黑梅香氣,口感豐富且尾韻悠長,轉化為肯亞特有的甜,一入口紅酒般的餘韻在口中揮之不去
            </p>
            <ul className="tagArea">
                {Array(3)
                    .fill(1)
                    .map((v, i) => {
                        return (
                            <li key={i}>
                                <Tag
                                    tagContext={"標籤文字"}
                                    tagBgc={"#b79973"}
                                    tagPaddingX={"15px"}
                                />
                            </li>
                        );
                    })}
            </ul>
            <h5>${"600"}元</h5>
            <div className="productsCount">
                <h6>購入數</h6>
                <div className="buttonWrap">
                    <button className="minusButtonStyle"></button>
                    <input className="inputStyle" />
                    <button className="plusButtonStyle"></button>
                </div>
            </div>
            <Btn
                width={"375px"}
                backgroundColor={"var(--BLUE)"}
                color={"#FFF"}
                children={"加入購物車"}
                style={{ marginTop: "30px" }}
            />
            <Btn
                width={"375px"}
                backgroundColor={"#FCFAF7"}
                color={"var(--BLUE)"}
                children={"加入收藏"}
                style={{ marginTop: "20px", marginBottom: "79px" }}
            />
        </div>
    );
    return el;
}

export default Productinfo;
