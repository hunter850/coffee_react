import { Fragment } from "react";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";
import DetailFooter from "./DetailFooter";
import DetailWrap from "./DetailWrap";
import "../OrderCompleted.scss";

function OrderDetails(props) {
    const { children } = props;
    return (
        <Fragment>
            <div className="printer-top"></div>

            <div className="paper-container">
                <div className="printer-bottom"></div>

                <div className="paper">
                    <div className="main-contents">
                        <div className="success-icon-wrap">
                            <div className="success-icon">&#10004;</div>
                        </div>
                        <div className="success-title title-font">完成訂單</div>
                        {children}
                        <div className="order-footer">Thank you!</div>
                    </div>
                    <div className="jagged-edge"></div>
                </div>
            </div>
        </Fragment>
    );
}

export default Object.assign(OrderDetails, {
    Header: DetailHeader,
    Body: DetailBody,
    Footer: DetailFooter,
    Wrap: DetailWrap,
});
