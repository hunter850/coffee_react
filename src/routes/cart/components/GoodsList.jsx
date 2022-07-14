import { useMemo, useCallback } from "react";
import { useStyleChange } from "../../../Contexts/SuperProvider";
import useDebounce from "../../../hooks/useDebounce";
// import useLog from "../../../hooks/useLog";
import CounterGroup from "./CounterGroup";
import "../css/cart.css";

function GoodsList(props) {
    const { cartList, setDeleteId, setModalIsOpen } = props;
    const breakPoint = useStyleChange();
    const styles = useMemo(() => {
        if (breakPoint === 1) {
            return {};
        } else {
            return {
                listWrap: {
                    width: "100%",
                },
                listStyle: {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid var(--DARKGRAY)",
                    padding: "9px 23px",
                    backgroundColor: "#fff",
                },
                imgWrap: {
                    width: "100px",
                    height: "100px",
                    border: "1px solid var(--GRAY)",
                    flexShrink: "0",
                },
                imgStyle: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
                },
                nameStyle: {
                    fontSize: "16px",
                    color: "var(--BLUE)",
                    flexGrow: "1",
                    textAlign: "center",
                },
                priceStyle: {
                    fontSize: "16px",
                    color: "var(--BLUE)",
                    width: "40px",
                    textAlign: "center",
                },
                multipliedStyle: {
                    fontSize: "16px",
                    color: "var(--BLUE)",
                    width: "60px",
                    textAlign: "center",
                    flexShrink: "0",
                },
                deleteButtonStyle: {
                    backgroundColor: "transparent",
                    width: "36px",
                    height: "36px",
                    objectPosition: "center center",
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                },
            };
        }
    }, [breakPoint]);

    useDebounce(
        () => {
            console.log(cartList.value);
        },
        300,
        [cartList]
    );

    const deleteHandler = useCallback(
        (itemId) => {
            setDeleteId(itemId);
            setModalIsOpen(true);
        },
        [setDeleteId, setModalIsOpen]
    );
    return (
        <ul style={styles.listWrap} className="cart_list_ul">
            {cartList.cmap((item) => (
                <li key={item.id} style={styles.listStyle}>
                    <div style={styles.imgWrap}>
                        <img
                            src={item.picture}
                            alt={item.name}
                            style={styles.imgStyle}
                        />
                    </div>
                    <p style={styles.nameStyle}>{item.name}</p>
                    <p style={styles.priceStyle}>{item.price}</p>
                    <CounterGroup
                        quantity={item.quantity}
                        id={item.id}
                        cartList={cartList}
                    />
                    <p style={styles.multipliedStyle}>
                        {item.price * item.quantity}
                    </p>
                    <button
                        onClick={() => deleteHandler(item.id)}
                        style={styles.deleteButtonStyle}
                        className="cart_delete_button"
                    >
                        <svg
                            width="16"
                            height="19"
                            viewBox="0 0 16 19"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.47076 1.23077C1.14434 1.23077 0.831288 1.36044 0.600474 1.59125C0.36966 1.82207 0.23999 2.13512 0.23999 2.46154V3.69231C0.23999 4.01873 0.36966 4.33178 0.600474 4.56259C0.831288 4.79341 1.14434 4.92308 1.47076 4.92308H2.08614V16C2.08614 16.6528 2.34548 17.2789 2.80711 17.7406C3.26874 18.2022 3.89484 18.4615 4.54768 18.4615H11.9323C12.5851 18.4615 13.2112 18.2022 13.6729 17.7406C14.1345 17.2789 14.3938 16.6528 14.3938 16V4.92308H15.0092C15.3356 4.92308 15.6487 4.79341 15.8795 4.56259C16.1103 4.33178 16.24 4.01873 16.24 3.69231V2.46154C16.24 2.13512 16.1103 1.82207 15.8795 1.59125C15.6487 1.36044 15.3356 1.23077 15.0092 1.23077H10.7015C10.7015 0.904349 10.5719 0.591298 10.341 0.360484C10.1102 0.12967 9.79718 0 9.47076 0L7.00922 0C6.6828 0 6.36975 0.12967 6.13894 0.360484C5.90812 0.591298 5.77845 0.904349 5.77845 1.23077H1.47076ZM5.16307 6.15385C5.32628 6.15385 5.4828 6.21868 5.59821 6.33409C5.71362 6.4495 5.77845 6.60602 5.77845 6.76923V15.3846C5.77845 15.5478 5.71362 15.7044 5.59821 15.8198C5.4828 15.9352 5.32628 16 5.16307 16C4.99986 16 4.84333 15.9352 4.72792 15.8198C4.61252 15.7044 4.54768 15.5478 4.54768 15.3846V6.76923C4.54768 6.60602 4.61252 6.4495 4.72792 6.33409C4.84333 6.21868 4.99986 6.15385 5.16307 6.15385ZM8.23999 6.15385C8.4032 6.15385 8.55973 6.21868 8.67513 6.33409C8.79054 6.4495 8.85538 6.60602 8.85538 6.76923V15.3846C8.85538 15.5478 8.79054 15.7044 8.67513 15.8198C8.55973 15.9352 8.4032 16 8.23999 16C8.07678 16 7.92026 15.9352 7.80485 15.8198C7.68944 15.7044 7.62461 15.5478 7.62461 15.3846V6.76923C7.62461 6.60602 7.68944 6.4495 7.80485 6.33409C7.92026 6.21868 8.07678 6.15385 8.23999 6.15385ZM11.9323 6.76923V15.3846C11.9323 15.5478 11.8675 15.7044 11.7521 15.8198C11.6367 15.9352 11.4801 16 11.3169 16C11.1537 16 10.9972 15.9352 10.8818 15.8198C10.7664 15.7044 10.7015 15.5478 10.7015 15.3846V6.76923C10.7015 6.60602 10.7664 6.4495 10.8818 6.33409C10.9972 6.21868 11.1537 6.15385 11.3169 6.15385C11.4801 6.15385 11.6367 6.21868 11.7521 6.33409C11.8675 6.4495 11.9323 6.60602 11.9323 6.76923Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default GoodsList;
