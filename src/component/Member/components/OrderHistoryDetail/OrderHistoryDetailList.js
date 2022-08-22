import { FaPen } from "react-icons/fa";

function OrderHistoryDetailList({ list, orderList }) {
    const {
        cartPrice,
        quantity,
        cart_sid,
        order_discount,
        order_id,
        order_member_id,
        order_price,
        order_sid,
        order_status,
        order_time,
        name,
        pic,
        price,
        products_with_products_categories_sid,
    } = list;

    // console.log(orderList);

    return (
        <>
            <div className="odd-list">
                <div className="odd-list-header">
                    <span className="odd-list-header-title">
                        商品
                        {/* <FaPen size={"0.8rem"} style={{ marginLeft: "10px" }} /> */}
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
                        {/* <div className="odd-pic"></div> */}
                        {orderList[0] ==0 ? (
                            <div
                                className="odd-pic"
                                style={{
                                    backgroundImage: `url(http://localhost:3500/images/products/${products_with_products_categories_sid}/${pic})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                }}
                            ></div>
                        ) : (
                            <div
                                className="odd-pic"
                                style={{
                                    backgroundImage: `url(http://localhost:3500/images/food/${pic})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                }}
                            ></div>
                        )}
                        <span>{name}</span>
                    </div>
                    <div className="odd-price-wrap">
                        <span>價格</span>
                        <div className="odd-str-line"></div>
                        <span>數量</span>
                        <div className="odd-str-line"></div>
                        <span>小計</span>
                    </div>
                    <div className="odd-price-body">
                        <div className="odd-line-one"></div>
                        <div className="odd-price">{price}元</div>
                        <div className="odd-line-two"></div>
                        <div className="odd-quantity">{quantity}</div>
                        <div className="odd-line-two"></div>
                        <div className="odd-subtotal">{Number(price) * Number(quantity)}元</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryDetailList;
