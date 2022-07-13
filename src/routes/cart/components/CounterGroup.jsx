import { Fragment, useState, useCallback, useRef, useMemo } from "react";
import { useStyleChange } from "../../../Contexts/SuperProvider";
import plus from "../../../images/cart/plus.svg";
import minus from "../../../images/cart/minus.svg";

function CounterGroup(props) {
    const { quantity, id, cartList } = props;
    const breakPoint = useStyleChange();
    const [count, setCount] = useState(quantity);
    const inputRef = useRef(null);
    const styles = useMemo(() => {
        if (breakPoint === 1) {
            return {};
        } else {
            return {
                inputStyle: {
                    padding: "0px 0px 0px 9px",
                    height: "36px",
                    fontSize: "16px",
                    border: "none",
                    outline: "none",
                    borderBottom: "1px solid #324A59",
                },
                minusButtonStyle: {
                    width: "36px",
                    height: "36px",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#324A59",
                    cursor: "pointer",
                    background: `url(${minus}) center center / 16px 16px no-repeat`,
                },
                plusButtonStyle: {
                    width: "36px",
                    height: "36px",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#324A59",
                    cursor: "pointer",
                    background: `url(${plus}) center center / 16px 16px no-repeat`,
                },
            };
        }
    }, [breakPoint]);
    const changeHandler = useCallback(
        (event) => {
            if (
                Number.isNaN(parseInt(event.target.value)) ||
                parseInt(event.target.value) <= 1
            ) {
                setCount("1");
                cartList.cto(
                    cartList.value.map((item) => {
                        if (item.id === id) {
                            item.quantity = 1;
                            return item;
                        } else {
                            return item;
                        }
                    })
                );
                inputRef.current.select();
            } else {
                setCount(
                    ("" + parseInt(event.target.value)).replace(/^0+/, "")
                );
                cartList.cto(
                    cartList.value.map((item) => {
                        if (item.id === id) {
                            item.quantity = parseInt(event.target.value);
                            return item;
                        } else {
                            return item;
                        }
                    })
                );
            }
        },
        [cartList, id]
    );
    const countHandler = useCallback(
        (num) => {
            if (Number.isNaN(parseInt(count)) || parseInt(count) + num <= 1) {
                setCount("1");
                cartList.cto(
                    cartList.value.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity: 1 };
                        } else {
                            return { ...item };
                        }
                    })
                );
            } else {
                setCount(parseInt(count) + num);
                cartList.cto(
                    cartList.value.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity: count + num };
                        } else {
                            return { ...item };
                        }
                    })
                );
            }
        },
        [count, cartList, id]
    );
    const kyeupHandler = useCallback((event) => {
        if (
            Number.isNaN(parseInt(event.currentTarget.value)) ||
            parseInt(event.currentTarget.value) <= 0 ||
            ((event.key === "Backspace" || event.key === "Delete") &&
                event.currentTarget.value.length === 1)
        ) {
            event.currentTarget.select();
        }
    }, []);
    const numberKeyDiction = useMemo(() => {
        return [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "Backspace",
            "Delete",
            "Home",
            "End",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "F5",
            "Tab",
        ];
    }, []);
    const keydownHandler = useCallback(
        (event) => {
            if (
                numberKeyDiction.indexOf(event.key) === -1 ||
                event.keyCode === 229
            ) {
                event.preventDefault();
            }
        },
        [numberKeyDiction]
    );
    const clickHandler = useCallback((event) => {
        if (event.currentTarget.value.length === 1) {
            event.currentTarget.select();
        }
    }, []);
    return (
        <Fragment>
            <button
                onClick={() => countHandler(-1)}
                style={styles.minusButtonStyle}
            ></button>
            <input
                type="number"
                value={count}
                onChange={changeHandler}
                ref={inputRef}
                onKeyUp={kyeupHandler}
                onKeyDown={keydownHandler}
                onClick={clickHandler}
                style={styles.inputStyle}
            />
            <button
                onClick={() => countHandler(1)}
                style={styles.plusButtonStyle}
            ></button>
        </Fragment>
    );
}

export default CounterGroup;
