import { Fragment, useState, useCallback, useRef } from "react";

function CounterGroup(props) {
    const { quantity, id, cartList } = props;
    const [count, setCount] = useState(quantity);
    const inputRef = useRef(null);
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
    const selectHandler = useCallback((event) => {
        if (
            Number.isNaN(parseInt(event.currentTarget.value)) ||
            parseInt(event.currentTarget.value) <= 0
        ) {
            event.currentTarget.select();
        }
    }, []);
    const clickHandler = useCallback((event) => {
        if (parseInt(event.target.value) === 0) {
            event.target.select();
        }
    }, []);
    return (
        <Fragment>
            <button onClick={() => countHandler(-1)}>-</button>
            <input
                type="number"
                value={count}
                onChange={changeHandler}
                ref={inputRef}
                onKeyUp={selectHandler}
                onClick={clickHandler}
            />
            <button onClick={() => countHandler(1)}>+</button>
            <h1>{count}</h1>
        </Fragment>
    );
}

export default CounterGroup;
