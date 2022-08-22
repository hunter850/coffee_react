import React, { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer";
import ChatBot from "../../component/Bot/ChatBot";
import "./LatestnewsDetail.css";
import Tag from "../../component/Item/Tag/Tag";
import { latestnewsdata } from "../frontPage/data/latestnewsdata";
import left_arrow from "../../images/frontpage/material/left_arrow-removebg-preview.png";
import right_arrow from "../../images/frontpage/material/right_arrow-removebg-preview.png";
// import homebtn from "../../images/frontpage/material/house-solid.svg";

export default function LatestnewsDetail() {
    const {
        news_sid,
        news_img,
        news_title,
        news_start_date,
        news_end_date,
        news_content,
    } = latestnewsdata;
    const [page, setpage] = useState(0);
    // console.log(latestnewsdata);
    return (
        <Fragment>
            <NavBar/>
            {latestnewsdata[page].map((v, i) => {
                return (
                    <div key={v.news_sid} className="detail-container">
                        <h2
                            className="leastnewtitle"
                            dangerouslySetInnerHTML={{
                                __html: v.news_title,
                            }}
                        ></h2>
                        <div className="latestnews-tag d-flex">
                            <Tag
                                tagContext="優惠"
                                tagBgc="#B79973"
                                tagPaddingX="20px"
                            />
                            <div className="d-flex">
                                <p>活動時間:</p>
                                <p>
                                    {v.news_start_date}~{v.news_end_date}
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                className="leastnewdetailImg"
                                src={v.news_img}
                                alt=""
                            />
                        </div>
                        <div>
                            <p
                                className="leastnews_detail_content1"
                                dangerouslySetInnerHTML={{
                                    __html: v.news_content,
                                }}
                            ></p>
                        </div>
                        <div className="newslinedeco"></div>
                        <p
                            className="leastnews_detail_content2"
                            style={{ textAlign: "start" }}
                            dangerouslySetInnerHTML={{
                                __html: v.news_content2,
                            }}
                        ></p>
                        <div className="d-flex latestnewbtn-layout">
                            <div
                                className="latestnewbtn"
                                onClick={() =>{
                                    window.scrollTo(0,0);
                                    setpage(page > 0 ? page - 1 : page)}
                                }
                            >
                                <img src={left_arrow} alt="" />
                                <p>Previous Page</p>
                            </div>

                            {/* <Link to="/">
                                <div className="homebtn">
                                    <img style={{width:"40px",height:"40px"}} src={homebtn} alt="" />
                                    <p>home</p>
                                </div>
                            </Link> */}

                            <div
                                className="latestnewbtn"
                                onClick={() =>{
                                    window.scrollTo(0,0);
                                    setpage(page < 3 ? page + 1 : page)}
                                }
                            >
                                <img src={right_arrow} alt="" />
                                <p>Next Page</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            <ChatBot />
            <Footer/>
        </Fragment>
    );
}
