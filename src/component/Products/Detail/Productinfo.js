import Btn from "../../Item/Btn/Btn";
import Tag from "../../Item/Tag/Tag";
import "./Productinfo.scss";

function Productinfo(props) {
    const { renderData, dataLoaded, productsCount, setproductsCount } = props;

    const el = (
        <div className="productInfo">
            <h2 className="title-font">
                {dataLoaded ? renderData[0].products_name : ""}
            </h2>
            <p
                className="productIntro"
                contentEditable="true"
                dangerouslySetInnerHTML={{
                    __html: dataLoaded ? renderData[0].products_intro : "錯誤",
                }}
            ></p>
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
            <h5>${dataLoaded ? renderData[0].products_price : ""}元</h5>
            <div className="productsCount">
                <h6>購入數</h6>
                <div className="buttonWrap">
                    <button
                        className="minusButtonStyle"
                        value={productsCount}
                        onClick={(e) => {
                            setproductsCount(productsCount - 1);
                        }}
                    ></button>
                    <input
                        className="inputStyle"
                        value={productsCount}
                        onClick={(e) => {
                            setproductsCount(e.target.value);
                        }}
                    />
                    <button
                        className="plusButtonStyle"
                        value={productsCount}
                        onClick={(e) => {
                            setproductsCount(productsCount + 1);
                        }}
                    ></button>
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
