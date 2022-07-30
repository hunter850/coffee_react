import { Fragment, useMemo } from "react";
import cssStyle from "./css/couponTicket.module.scss";
import useData from "../../../../hooks/useData";
import useClass from "../../../../hooks/useClass";

function CouponTicket(props) {
    const { coupon } = props;
    const {
        coupon_wrap,
        coupon_left,
        coupon_mid,
        coupon_right,
        coupon_selected_active,
    } = cssStyle;
    const [nowList] = useData("nowList");
    const nowCouponType = useMemo(() => {
        return nowList === "productList"
            ? "selectedProductCouponId"
            : "selectedFoodCouponId";
    }, [nowList]);
    const [selectedCouponId] = useData(nowCouponType);
    const c = useClass();
    return (
        <Fragment>
            <div className={coupon_wrap}>
                <div className={coupon_left}>
                    <h6>{coupon.name}</h6>
                    <p id="text_alert">到期日: {coupon.expire}</p>
                    {/* <p>說明: {coupon.name}</p> */}
                </div>
                <div className={coupon_mid}></div>
                <div className={coupon_right}>
                    <svg
                        className={c({
                            [coupon_selected_active]:
                                coupon.id === selectedCouponId,
                        })}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 16C0 7.1625 7.1625 0 16 0C24.8375 0 32 7.1625 32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16ZM23.2375 13.2375C23.9187 12.5563 23.9187 11.4437 23.2375 10.7625C22.5562 10.0812 21.4438 10.0812 20.7625 10.7625L14 17.525L11.2375 14.7625C10.5563 14.0812 9.44375 14.0812 8.7625 14.7625C8.08125 15.4437 8.08125 16.5562 8.7625 17.2375L12.7625 21.2375C13.4437 21.9187 14.5563 21.9187 15.2375 21.2375L23.2375 13.2375Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
        </Fragment>
    );
}

export default CouponTicket;
