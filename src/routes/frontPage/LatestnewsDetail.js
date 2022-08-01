import React, { Fragment } from "react";
import leastnewdetailImg1 from "../../images/frontpage/latestnews/news-img1.png";
export default function LatestnewsDetail() {
    return (
        <Fragment>
            <div className="detail-container">
                <h2>50萬會員慶 週週咖啡金再送黑咖啡</h2>
                <div>
                    <img src={leastnewdetailImg1} alt="" />
                </div>
                <p className="smallleastnewtitle">
                    門市限定咖啡豆採購方案 最低3包即享優惠 滿$200還享外送服務
                </p>
            </div>
        </Fragment>
    );
}
