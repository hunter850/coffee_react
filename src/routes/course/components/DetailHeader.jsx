import { Fragment } from "react";

function DetailHeader(props) {
    const { children } = props;
    return (
        <Fragment>
            <div className="course-order-title">{children}</div>
        </Fragment>
    );
}

export default DetailHeader;
