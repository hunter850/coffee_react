import React, { Fragment } from "react";
import leastnewdetailImg1 from "../../images/frontpage/latestnews/news-img1.png";
import "./LatestnewsDetail.css";
import Tag from "../../component/Item/Tag/Tag";

export default function LatestnewsDetail() {
    return (
        <Fragment>
            <div className="detail-container">
                <h2>50萬會員慶 週週咖啡金再送黑咖啡</h2>
                <div className="latestnews-tag d-flex">
                    <Tag
                        tagContext="優惠"
                        tagBgc="#B79973"
                        tagPaddingX="20px"
                    />
                    <div className="d-flex">
                        <p>活動時間:</p>
                        <p>2022-06-08~2022-07-07</p>
                    </div>
                </div>
                <div>
                    <img
                        className="leastnewdetailImg"
                        src={leastnewdetailImg1}
                        alt=""
                    />
                </div>
                <p className="smallleastnewtitle">
                    門市限定咖啡豆採購方案 最低3包即享優惠 滿$200還享外送服務
                </p>
                <p>
                    cama café 歡慶50萬會員 推出週週50元咖啡金和寄杯寄豆超值方案
                    新會員再送黑咖啡 最懂咖啡的行家都在cama café！
                    除了每日提供新鮮烘焙的好咖啡，cama
                    café也不斷耕耘會員經營，致力於提升會員尊榮，
                    終於在各位的支持下衝破50萬會員大關！
                    為了感謝每位咖啡迷的陪伴，即日起展開為期30天的會員慶，推出誠意滿滿的會員優惠方案，
                    活動期間加入的前五萬名新會員，除了同享優惠，還可以免費獲得一張經典黑咖啡兌換券
                </p>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <p></p>
                </div>
            </div>
        </Fragment>
    );
}
