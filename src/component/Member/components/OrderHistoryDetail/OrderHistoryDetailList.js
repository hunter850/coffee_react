function OrderHistoryDetailList() {

    

    return (
        <>
            <div className="odd-list">
                <div className="odd-list-header">
                    <span>
                        <i className="fa-solid fa-pen"></i>評論
                    </span>
                    <div className="odd-str-line"></div>
                    <span>價格</span>
                    <div className="odd-str-line"></div>
                    <span>數量</span>
                    <div className="odd-str-line"></div>
                    <span>小計</span>
                </div>
                <div className="odd-body">
                    <div className="odd-product">
                        <div className="odd-pic"></div>
                        <span>曼巴咖啡(半磅)</span>
                    </div>
                    <div className="odd-str-line"></div>
                    <div className="odd-price">280元</div>
                    <div className="odd-str-line"></div>
                    <div className="odd-quantity">3</div>
                    <div className="odd-str-line"></div>
                    <div className="odd-subtotal">840元</div>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryDetailList;
