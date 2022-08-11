import { Fragment, useMemo, useState, useEffect } from "react";
import useData from "../../../../hooks/useData";
import useGSAPCompute from "../../../../hooks/useGSAPCompute";
import useClass from "../../../../hooks/useClass";
import styles from "./css/totalBord.module.scss";
import public_style from "../../css/public_style.module.scss";

function TotalBord(props) {
    const { confirmHandler, setPriceInfo } = props;
    const {
        bord_wrap,
        count_wrap,
        final_price,
        button_wrap,
        confirm_button,
        count_title,
        text_mb,
        bottom_line,
    } = styles;
    const { btn } = public_style;
    const c = useClass();
    // 現在是商品或餐點
    const [nowList] = useData("nowList");
    // 取得產品列表
    const [list] = useData(nowList);
    // 數字跳動
    const [tween, setTween] = useState({ count: 0 });
    // 根據nowList取得useData要用的字串
    const [nowCouponType, selectedCouponType] =
        nowList === "productList"
            ? ["productCoupons", "selectedProductCouponId"]
            : ["foodCoupons", "selectedFoodCouponId"];
    const [coupons] = useData(nowCouponType);
    const [selectedCouponId] = useData(selectedCouponType);
    const selectedCoupon = coupons.find(
        (coupon) => coupon.id === selectedCouponId
    );
    const totalPrice = list.reduce(
        (previous, current) => previous + current.price * current.quantity,
        0
    );
    const discount = useMemo(() => {
        if (selectedCoupon === undefined) return 0;
        // 全品項折扣
        if (selectedCoupon.productId === 0 && selectedCoupon.menuId === 0) {
            // 折數字
            if (selectedCoupon.discount >= 1) {
                if (totalPrice >= selectedCoupon.discount)
                    return selectedCoupon.discount;
                return totalPrice;
            }
            // 折%
            return Math.ceil(totalPrice * (1 - selectedCoupon.discount));
        }
        // 找出特定折扣商品
        const couponType = nowList === "productList" ? "productId" : "foodId";
        const discountObject = list.find(
            (item) => item.listId === selectedCoupon[couponType]
        );
        // 無折扣商品
        if (discountObject === undefined) return 0;
        // 折數字
        if (selectedCoupon.discount >= 1) {
            if (
                discountObject.price * discountObject.quantity >=
                selectedCoupon.discount
            ) {
                return selectedCoupon.discount;
            }
            return discountObject.price * discountObject.quantity;
        }
        // 折%
        return Math.ceil(
            discountObject.price *
                discountObject.quantity *
                (1 - selectedCoupon.discount)
        );
    }, [selectedCoupon, totalPrice, list, nowList]);

    useEffect(() => {
        setPriceInfo((pre) => {
            return { ...pre, total: totalPrice, discount: discount };
        });
    }, [totalPrice, discount, setPriceInfo]);

    const compute = useGSAPCompute();
    useEffect(() => {
        compute({ total: totalPrice - discount }, tween, setTween);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPrice, discount]);
    return (
        <Fragment>
            <div className={bord_wrap}>
                <div className={c(count_wrap, text_mb, bottom_line)}>
                    <span className={count_title}>總計</span>
                    <span>{totalPrice}</span>
                </div>
                <div className={c(count_wrap, text_mb, bottom_line)}>
                    <span className={count_title}>折價</span>
                    <span>{discount}</span>
                </div>
                <div>
                    <p className={count_title}>結算金額</p>
                    {/* <p>{totalPrice - discount} 元</p> */}
                    <h3 className={c(final_price, text_mb)}>
                        {Number.isNaN(parseInt(tween.total))
                            ? 0
                            : parseInt(tween.total)}{" "}
                        元
                    </h3>
                    <div className={button_wrap}>
                        <button
                            className={c(btn, confirm_button)}
                            onClick={confirmHandler}
                        >
                            確認
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TotalBord;
