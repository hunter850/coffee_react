import { Fragment } from "react";

function DetailWrap(props) {
    const { children } = props;
    return (
        <Fragment>
            <div className="success-description">
                <div className="success-description-wrap">{children}</div>
            </div>
        </Fragment>
    );
}

export default DetailWrap;
