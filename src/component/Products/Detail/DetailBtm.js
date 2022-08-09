import "./DetailBtm.scss";

function DetailBtm(props) {
    const { renderData, dataLoaded } = props;
    const el = (
        <div className="detailBtm">
            <div className="productsSpec">
                <h3 className="title-font">商品規格</h3>
                <div
                    dangerouslySetInnerHTML={{
                        __html: dataLoaded ? renderData[0].products_spec : "",
                    }}
                >
                    {/* 成分：100% 阿拉比卡咖啡豆 <br />
                    商品規格：10g x 10包 <br />
                    製造地：台灣 保存期限：18個月，製造日期如包裝標示 <br />
                    儲存方法：咖啡豆均屬新鮮烘焙，因此我們建議您最佳賞味期間內飲用完畢
                    <br />
                    咖啡因含量：41.1mg / 包 <br /> */}
                </div>
            </div>
        </div>
    );
    return el;
}

export default DetailBtm;
