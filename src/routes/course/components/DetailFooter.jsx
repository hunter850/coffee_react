import { Fragment } from "react";

function DetailFooter(props) {
    const { children } = props;
    return (
        <Fragment>
            <div className="order-details">{children}</div>
        </Fragment>
    );
}

export default DetailFooter;
