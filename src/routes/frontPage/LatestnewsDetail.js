import React, { Fragment } from "react";
import leastnewdetailImg1 from "../../images/frontpage/latestnews/news-img1.png";
import "./LatestnewsDetail.css";
import Tag from "../../component/Item/Tag/Tag";
import linedeco from "../../images/products/line_deco.png";

export default function LatestnewsDetail() {
    return (
        <Fragment>
            <div className="detail-container">
                <h2 className="leastnewtitle">
                    50萬會員慶 週週咖啡金再送黑咖啡
                </h2>
                <div className="latestnews-tag d-flex">
                    <Tag
                        tagContext="優惠"
                        tagBgc="#B79973"
                        tagPaddingX="20px"
                    />
                    <div className="d-flex">
                        <p>活動時間&nbsp:&nbsp</p>
                        <p>2022-06-08&nbsp;~&nbsp;2022-07-07</p>
                    </div>
                </div>
                <div>
                    <img
                        className="leastnewdetailImg"
                        src={leastnewdetailImg1}
                        alt=""
                    />
                </div>
                <div>
                    <p className="leastnews_detail_content1">
                        當與家有更長的相處，就需要讓更多新鮮事為生活加分
                        <br />
                        來拎+B 全台門市提供新鮮烘焙咖啡豆採購方案！
                        最低3包就能享有多包優惠
                        <br />
                        還有寄豆服務，每次取貨都新鮮滿分😋
                        <br />
                        Home café 就選 來拎+B ☕️ <br />
                        大宗採購優惠方案
                        <br /> ♦3~5包 95折 <br /> ♦6~9包 93折
                        <br />
                        ♦10~20包 9折
                        <br /> ♦21包以上88折
                        <br />
                        咖啡日常好好享受，精品現折15元，
                        為讓您的日常沖煮新模樣，多點講究更多點享受，即日起開始優惠!!
                    </p>
                </div>
                <div className="newslinedeco"></div>
                <p className="leastnews_detail_content2">
                    cama café 歡慶50萬會員 推出週週50元咖啡金和寄杯寄豆超值方案
                    <br />
                    新會員再送黑咖啡 最懂咖啡的行家都在cama café！
                    <br />
                    除了每日提供新鮮烘焙的好咖啡，cama
                    café也不斷耕耘會員經營，致力於提升會員尊榮，
                    <br />
                    終於在各位的支持下衝破50萬會員大關！
                    <br />
                    為了感謝每位咖啡迷的陪伴，即日起展開為期30天的會員慶，推出誠意滿滿的會員優惠方案，
                    <br />
                    活動期間加入的前五萬名新會員，除了同享優惠，還可以免費獲得一張經典黑咖啡兌換券
                    <br />
                </p>
                <div>
                    <p></p>
                </div>
            </div>
        </Fragment>
    );
}
