import { Fragment, useEffect } from "react";
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
    const { fake_body, order_number_label, order_number } = styles;
    const c = useClass();
    const [lastInsertId, , resetlastInsertId] = useData("lastInsertId");
    const { token } = useAuth();
    useEffect(() => {
        axios.get(cartDetail, {
            params: {
                insertId: lastInsertId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Fragment>
            <div className={fake_body}>
                <NavBar />
                <div className={c(container, px_200, "cart_detail_container")}>
                    <OrderDetails>
                        <OrderDetails.Wrap>
                            <OrderDetails.Header>
                                <h6>您購買的商品為</h6>
                            </OrderDetails.Header>
                            <OrderDetails.Body>
                                <h1>Body</h1>
                            </OrderDetails.Body>
                        </OrderDetails.Wrap>
                        <OrderDetails.Footer>
                            <p className={order_number_label}>訂單編號</p>
                            <p className={order_number}>123456789</p>
                        </OrderDetails.Footer>
                    </OrderDetails>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default CartDetail;
