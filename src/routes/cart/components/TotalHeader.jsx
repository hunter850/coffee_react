import { Fragment, useMemo, useState } from "react";
import Modal from "../../../component/Modal/Modal";

function TotalHeader(props) {
    const { coupons } = props;
    const [isOpen, setIsOpen] = useState(false);
    const styles = useMemo(() => {
        return {
            buttonStyle: {
                outline: "none",
                backgroundColor: "var(--GRAY)",
                border: "1px solid var(--DARKGRAY)",
                width: "100%",
                borderRadius: "3px 3px 0px 0px",
                padding: "10px 27px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
            },
            svgStyle: {
                color: "var(--BLUE)",
            },
            textStyle: {
                fontSize: "16px",
                color: "var(--BLUE)",
            },
            arrowStyle: {
                marginLeft: "3px",
            },
        };
    }, []);
    return (
        <Fragment>
            <button style={styles.buttonStyle} onClick={() => setIsOpen(true)}>
                <svg
                    style={styles.svgStyle}
                    width="26"
                    height="19"
                    viewBox="0 0 26 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M25.1876 5.03455V0H17.2115V2.51728H14.6928V0H0V5.03455C2.31844 5.03455 4.19791 6.91292 4.19791 9.23C4.19791 11.5471 2.31844 13.4254 0 13.4254V18.46H14.6928V15.9427H17.2115V18.46H25.1876V13.4254C22.8691 13.4254 20.9897 11.5471 20.9897 9.23C20.9897 6.91292 22.8691 5.03455 25.1876 5.03455ZM17.2115 13.1458H14.6928V10.6285H17.2115V13.1458ZM17.2115 7.83148H14.6928V5.31421H17.2115V7.83148Z"
                        fill="currentColor"
                    />
                </svg>

                <span style={styles.textStyle}>
                    選擇優惠卷
                    <svg
                        style={styles.arrowStyle}
                        width="9"
                        height="11"
                        viewBox="0 0 9 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1L7.12931 5.90909L1 10"
                            stroke="#324A59"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Modal.Header>
                    <h1>Header</h1>
                </Modal.Header>
                <Modal.Body>{JSON.stringify(coupons)}</Modal.Body>
                <Modal.Footer>
                    <h1>Footer</h1>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default TotalHeader;
