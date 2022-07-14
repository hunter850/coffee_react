import { Fragment, useMemo } from "react";

function FakeFooter() {
    const styles = useMemo(() => {
        return {
            footerWrap: {
                width: "100%",
                height: "1042px",
                backgroundColor: "var(--BLUE)",
                color: "#fff",
            },
        };
    }, []);
    return (
        <Fragment>
            <div style={styles.footerWrap}>footer</div>
        </Fragment>
    );
}

export default FakeFooter;
