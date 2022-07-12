import { useEffect, useMemo, useCallback } from "react";
import { useStyleChange } from "../../../Contexts/SuperProvider";
import useArray from "../../../hooks/useArray";
import useLog from "../../../hooks/useLog";
import CounterGroup from "./CounterGroup";

function GoodsList() {
    const breakPoint = useStyleChange();
    const styles = useMemo(() => {
        if (breakPoint === 0) {
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
        } else {
            return {};
        }
    }, [breakPoint]);
    const cartList = useArray([]);
    // useDebounce(
    //     () => {
    //         console.log(cartList.value);
    //     },
    //     300,
    //     [cartList]
    // );
    useLog(cartList);
    useEffect(() => {
        setTimeout(() => {
            cartList.cto([
                {
                    id: 0,
                    picture:
                        "https://cdn.pixabay.com/photo/2019/02/25/04/06/coffee-4018874_960_720.jpg",
                    name: "藍山豆",
                    price: 250,
                    quantity: 2,
                },
                {
                    id: 1,
                    picture:
                        "https://cdn.pixabay.com/photo/2019/02/25/04/06/coffee-4018874_960_720.jpg",
                    name: "哥倫比亞豆",
                    price: 260,
                    quantity: 1,
                },
                {
                    id: 2,
                    picture:
                        "https://cdn.pixabay.com/photo/2019/02/25/04/06/coffee-4018874_960_720.jpg",
                    name: "巴西豆",
                    price: 120,
                    quantity: 3,
                },
                {
                    id: 3,
                    picture:
                        "https://cdn.pixabay.com/photo/2019/02/25/04/06/coffee-4018874_960_720.jpg",
                    name: "曼特寧豆",
                    price: 130,
                    quantity: 1,
                },
            ]);
        }, 50);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
