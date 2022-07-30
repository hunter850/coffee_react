import "./OrderCompleted.scss";
import FakeNav from "../../component/FakeNav";
function OrderCompleted() {
    // 取得網址裡的sid
    const getSid = window.location.href;
    const url = new URL(getSid);
    url.searchParams.get("orderId");
    console.log(url.searchParams.get("orderId"));
    const orderNumber = parseInt(new Date() / 1000);
    return (
        <>
            <FakeNav />
            <div className="container">
                <div className="printer-top"></div>

                <div className="paper-container">
                    <div className="printer-bottom"></div>

                    <div className="paper">
                        <div className="main-contents">
                            <div className="success-icon-wrap">
                                <div className="success-icon">&#10004;</div>
                            </div>
                            <div className="success-title title-font">
                                完成訂單
                            </div>
                            <div className="success-description">
                                很高興賺了您的錢, <br />
                                再消費100元即可升為VIP6
                            </div>
                            <div className="order-details">
                                <div className="order-number-label">
                                    訂單編號
                                </div>
                                <div className="order-number">
                                    {orderNumber}
                                </div>
                            </div>
                            <div className="order-footer">Thank you!</div>
                        </div>
                        <div className="jagged-edge"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCompleted;
