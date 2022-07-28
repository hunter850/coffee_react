import Tag from "../../Item/Tag/Tag";
import "./Productinfo.scss";

function Productinfo() {
    const el = (
        <div className="productInfo">
            <h1 className="title-font">肯亞AA TOP(十包一入)</h1>
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
                <li>
                    <Tag
                        tagContext={"標籤文字"}
                        tagBgc={"#b79973"}
                        tagPaddingX={"15px"}
                    />
                </li>
                <li>
                    <Tag
                        tagContext={"標籤文字"}
                        tagBgc={"#b79973"}
                        tagPaddingX={"15px"}
                    />
                </li>
                <li>
                    <Tag
                        tagContext={"標籤文字"}
                        tagBgc={"#b79973"}
                        tagPaddingX={"15px"}
                    />
                </li>
            </ul>
        </div>
    );
    return el;
}

export default Productinfo;
