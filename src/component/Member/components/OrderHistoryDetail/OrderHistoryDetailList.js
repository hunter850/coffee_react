import { FaPen } from "react-icons/fa";

function OrderHistoryDetailList({ list }) {
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


    return (
        <>
            <div className="odd-list">
                <div className="odd-list-header">
                    <span>
                        評論 <FaPen size={'0.8rem'} style={{marginLeft:"10px"}}/>
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
                        <span>{name}</span>
                    </div>
                    <div className="odd-str-line"></div>
                    <div className="odd-price">{price}元</div>
                    <div className="odd-str-line"></div>
                    <div className="odd-quantity">{quantity}</div>
                    <div className="odd-str-line"></div>
                    <div className="odd-subtotal">{Number(price)*Number(quantity)}元</div>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryDetailList;
