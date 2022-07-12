import { useMemo, useCallback } from "react";
import { useStyleChange } from "../../../Contexts/SuperProvider";
import useDebounce from "../../../hooks/useDebounce";
// import useLog from "../../../hooks/useLog";
import CounterGroup from "./CounterGroup";

function GoodsList({ cartList }) {
    const breakPoint = useStyleChange();
    const styles = useMemo(() => {
        if (breakPoint === 1) {
            return {};
        } else {
            return {
                listWrap: {
                    width: "71.63%",
                },
                listStyle: {
                    width: "100%",
                    display: "flex",
                },
                imgWrap: {
                    width: "100px",
                    height: "100px",
                    border: "1px solid #cbcbcb",
                },
                imgStyle: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
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
        (id) => {
            cartList.cto(cartList.cfilter((item) => item.id !== id));
        },
        [cartList]
    );
    return (
        <ul style={styles.listWrap}>
            {cartList.cmap((item) => (
                <li key={item.id} style={styles.listStyle}>
                    <div style={styles.imgWrap}>
                        <img
                            src={item.picture}
                            alt={item.name}
                            style={styles.imgStyle}
                        />
                    </div>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <CounterGroup
                        quantity={item.quantity}
                        id={item.id}
                        cartList={cartList}
                    />
                    <p>{item.price * item.quantity}</p>
                    <button onClick={() => deleteHandler(item.id)}>X</button>
                </li>
            ))}
        </ul>
    );
}

export default GoodsList;
