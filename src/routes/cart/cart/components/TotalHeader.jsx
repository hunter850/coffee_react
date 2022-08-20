import { Fragment, useMemo, useState, useCallback } from "react";
import useData from "../../../../hooks/useData";
import Modal from "../../../../component/Modal/Modal";
import CouponTicket from "./CouponTicket";
import Btn from "../../../../component/Item/Btn/Btn";
import cssStyle from "./css/totalHeader.module.scss";

function TotalHeader() {
    const {
        header_button,
        ticket_svg,
        coupon_label,
        modal_header,
        modal_bord,
        modal_footer,
        confirm_btn,
        text_none,
    } = cssStyle;
    const [isOpen, setIsOpen] = useState(false);
    const [nowList] = useData("nowList");
    const nowCouponList = useMemo(() => {
        return nowList === "productList" ? "productCoupons" : "foodCoupons";
    }, [nowList]);
    const nowCouponType = useMemo(() => {
        return nowList === "productList"
            ? "selectedProductCouponId"
            : "selectedFoodCouponId";
    }, [nowList]);
    const [coupons] = useData(nowCouponList);
    const [selectedCouponId, setSelectedCouponId] = useData(nowCouponType);
    // totalHeader的標題
    const selectedCouponName = useMemo(() => {
        if (selectedCouponId === -1) return "";
        const selectedCoupon = coupons.find(
            (coupon) => coupon.id === selectedCouponId
        );
        if (selectedCoupon) {
            return selectedCoupon.name;
        } else {
            return "";
        }
    }, [selectedCouponId, coupons]);
    // radio再點一次取消選取
    const cancelCouponSelectHandler = useCallback(
        (e, couponId) => {
            if (couponId === selectedCouponId) {
                e.preventDefault();
                setSelectedCouponId(-1);
            }
        },
        [selectedCouponId, setSelectedCouponId]
    );
    const styles = useMemo(() => {
        return {
            modalBodyStyle: {
                padding: "24px 36px",
            },
            labelStyle: {
                border: "1px solid transparent",
                margin: "16px 0px",
                cursor: "pointer",
            },
            headerTextStyle: {
                color: "var(--BLUE)",
            },
        };
    }, []);
    return (
        <Fragment>
            <button className={header_button} onClick={() => setIsOpen(true)}>
                <svg
                    className={ticket_svg}
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
                <span className={text_none}>
                    {selectedCouponId === -1
                        ? "選擇優惠卷"
                        : selectedCouponName}
                    <svg
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
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={modal_bord}>
                <Modal.Header className={modal_header}>
                    <h6 style={styles.headerTextStyle}>選擇優惠卷</h6>
                </Modal.Header>
                <Modal.Body style={styles.modalBodyStyle}>
                    <form>
                        {coupons.map((coupon) => (
                            <label
                                key={coupon.id}
                                htmlFor={coupon.name + coupon.id}
                                style={styles.labelStyle}
                                className={coupon_label}
                                onClick={(e) =>
                                    cancelCouponSelectHandler(e, coupon.id)
                                }
                            >
                                <CouponTicket coupon={coupon} />
                                <input
                                    id={coupon.name + coupon.id}
                                    type="radio"
                                    checked={coupon.id === selectedCouponId}
                                    onChange={() =>
                                        setSelectedCouponId(coupon.id)
                                    }
                                    style={{ display: "none" }}
                                />
                            </label>
                        ))}
                    </form>
                </Modal.Body>
                <Modal.Footer className={modal_footer}>
                    <Btn
                        className={confirm_btn}
                        onClick={() => setIsOpen(false)}
                    >
                        確認
                    </Btn>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default TotalHeader;
