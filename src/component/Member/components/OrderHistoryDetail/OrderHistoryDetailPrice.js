function OrderHistoryDetailPrice() {
    return (
        <>
            <div className="odd-total-wrap">
                <div className="odd-total">
                    商品合計<span>1680</span>
                </div>
                <div className="odd-total-line"></div>
                <div className="odd-discount">
                    折價<span>0</span>
                </div>
                <div className="odd-total-line"></div>
                <div className="odd-pay">
                    付款金額<span>1680元</span>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryDetailPrice;
