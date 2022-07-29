import { Fragment, useCallback, useMemo } from "react";
import useData from "../../../../hooks/useData";
import styles from "./css/counterGroup.module.scss";

function CounterGroup(props) {
    const { quantity, id, listName } = props;
    const { button_wrap, list_input, minus_button, plus_button } = styles;
    const [list, setList] = useData(listName);
    const changeHandler = useCallback(
        (event) => {
            if (
                Number.isNaN(parseInt(event.target.value)) ||
                parseInt(event.target.value) <= 1
            ) {
                setList(
                    list.map((item) => {
                        if (item.id !== id) return item;
                        return { ...item, quantity: 1 };
                    })
                );
            } else if (
                parseInt(event.target.value) >=
                list.find((item) => item.id === id).stocks
            ) {
                setList(
                    list.map((item) => {
                        if (item.id !== id) return item;
                        return { ...item, quantity: item.stocks };
                    })
                );
            } else {
                setList(
                    list.map((item) => {
                        if (item.id !== id) return item;
                        return {
                            ...item,
                            quantity: +(
                                "" + parseInt(event.target.value)
                            ).replace(/^0+/, ""),
                        };
                    })
                );
            }
        },
        [id, list, setList]
    );
    const countHandler = useCallback(
        (num) => {
            if (quantity + num <= 1) {
                setList(
                    list.map((item) => {
                        if (item.id !== id) return item;
                        return { ...item, quantity: 1 };
                    })
                );
            } else if (
                quantity + num >=
                list.find((item) => item.id === id).stocks
            ) {
                setList(
                    list.map((item) => {
                        if (item.id !== id) return item;
                        return { ...item, quantity: item.stocks };
                    })
                );
            } else {
                setList(
                    list.map((item) => {
                        if (item.id !== id) return item;
                        return { ...item, quantity: item.quantity + num };
                    })
                );
            }
        },
        [id, list, setList, quantity]
    );
    const kyeupHandler = useCallback((event) => {
        if (
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
            "F12",
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
            <div className={button_wrap}>
                <button
                    onClick={() => countHandler(-1)}
                    className={minus_button}
                ></button>
                <input
                    type="number"
                    value={"" + quantity}
                    onChange={changeHandler}
                    onKeyUp={kyeupHandler}
                    onKeyDown={keydownHandler}
                    onClick={clickHandler}
                    className={list_input}
                />
                <button
                    onClick={() => countHandler(1)}
                    className={plus_button}
                ></button>
            </div>
        </Fragment>
    );
}

export default CounterGroup;
