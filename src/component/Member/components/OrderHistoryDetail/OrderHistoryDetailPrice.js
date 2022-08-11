function OrderHistoryDetailPrice({ price, dataIsLoad }) {
    const { order_discount, order_price } = price;

    return (
        <>
            <div className="odd-total-wrap">
                <div className="odd-total">
                    商品合計
                    <span>{Number(order_price) + Number(order_discount)}</span>
                </div>
                <div className="odd-total-line"></div>
                <div className="odd-discount">
                    折價<span>{order_discount}</span>
                </div>
                <div className="odd-total-line"></div>
                <div className="odd-pay">
                    付款金額<span>{order_price}元</span>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryDetailPrice;
