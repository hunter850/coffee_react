import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop(props) {
    const { children } = props;
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return <Fragment>{children}</Fragment>;
}

export default ScrollTop;
