import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClass from "../../../hooks/useClass";
import useData from "../../../hooks/useData";
import { useAuth } from "../../../component/Member/AuthContextProvider";
import NavBar from "../../../component/NavBar/NavBar";
import Footer from "../../../component/Footer";
import OrderDetails from "../../course/components/OrderDetails";
import bs_flex from "../css/bs_flex.module.scss";
import styles from "./css/cartDetail.module.scss";
import axios from "axios";
import { cartDetail } from "../../../config/api-path";
// import "./css/orderDetail.scss";

function CartDetail() {
    const { container, px_200 } = bs_flex;
    const {
        fake_body,
        order_number_label,
        order_number,
        header_text,
        list,
        list_name,
        list_quantity,
    } = styles;
    const navigate = useNavigate();
    const c = useClass();
    const [lastInsertId, , resetlastInsertId] = useData("lastInsertId");
    const { token } = useAuth();
    const [detail, setDetail] = useState({
        orderNumber: -1,
        price: 0,
    });
    const [detailList, setDetailList] = useState([]);
    useEffect(() => {
        if (lastInsertId === -1) {
            alert("尚未購物");
            navigate("/", { replace: true });
        }
        axios
            .get(cartDetail, {
                params: {
                    insertId: lastInsertId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                // console.log(result.data);
                setDetail(() => ({
                    orderNumber: result.data.orderNumber,
                    price: result.data.price,
                }));
                setDetailList(result.data.rawData);
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong !");
                // navigate("/", { replace: true });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        return () => {
            resetlastInsertId();
        };
    }, [resetlastInsertId]);
    return (
        <Fragment>
            <div className={fake_body}>
                <NavBar />
                <div className={c(container, px_200, "cart_detail_container")}>
                    <OrderDetails>
                        <OrderDetails.Wrap>
                            <OrderDetails.Header>
                                <h6 className={header_text}>您購買的商品為</h6>
                            </OrderDetails.Header>
                            <OrderDetails.Body>
                                <ul>
                                    <li className={list}>
                                        <p className={list_name}>商品</p>
                                        <p className={list_quantity}>數量</p>
                                    </li>
                                </ul>
                                <ul>
                                    {detailList.map((item) => (
                                        <li key={item.id} className={list}>
                                            <p className={list_name}>
                                                {item.name}
                                            </p>
                                            <p className={list_quantity}>
                                                {item.quantity}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </OrderDetails.Body>
                        </OrderDetails.Wrap>
                        <OrderDetails.Footer>
                            <p className={order_number_label}>訂單編號</p>
                            <p className={order_number}>{detail.orderNumber}</p>
                        </OrderDetails.Footer>
                    </OrderDetails>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default CartDetail;
