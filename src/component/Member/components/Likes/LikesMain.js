import { useState, useEffect, useContext } from "react";
import MemberMenu from "../MemberMenu/MemberMenu";
import "./Likes.css";

import { FaHeart } from "react-icons/fa";

function LikesMain() {
    return (
        <>
            <div className="like-wrap-main">
                <div className="like-container">
                    <MemberMenu />
                    <div className="like-wrap-right">
                        <div className="like-wrap">
                            <div className="like-info">
                                <div className="like-info-wrap">
                                    <div className="like-content">
                                        <div className="like-pic"></div>
                                        <div className="like-name">瓜地馬拉花神(一包十入)</div>
                                        <div className="like-price">320<span>元</span></div>
                                        <button className="like-btn"><FaHeart style={{marginRight:"8px"}}/>取消收藏</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="like-wrap">
                            <div className="like-info">
                                <div className="like-info-wrap">
                                    <div className="like-content">
                                        <div className="like-pic"></div>
                                        <div className="like-name">瓜地馬拉花神(一包十入)</div>
                                        <div className="like-price">320<span>元</span></div>
                                        <button className="like-btn"><FaHeart style={{marginRight:"8px"}}/>取消收藏</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="like-wrap">
                            <div className="like-info">
                                <div className="like-info-wrap">
                                    <div className="like-content">
                                        <div className="like-pic"></div>
                                        <div className="like-name">瓜地馬拉花神(一包十入)</div>
                                        <div className="like-price">320<span>元</span></div>
                                        <button className="like-btn"><FaHeart style={{marginRight:"8px"}}/>取消收藏</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="like-wrap">
                            <div className="like-info">
                                <div className="like-info-wrap">
                                    <div className="like-content">
                                        <div className="like-pic"></div>
                                        <div className="like-name">瓜地馬拉花神(一包十入)</div>
                                        <div className="like-price">320<span>元</span></div>
                                        <button className="like-btn"><FaHeart style={{marginRight:"8px"}}/>取消收藏</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="like-wrap">
                            <div className="like-info">
                                <div className="like-info-wrap">
                                    <div className="like-content">
                                        <div className="like-pic"></div>
                                        <div className="like-name">瓜地馬拉花神(一包十入)</div>
                                        <div className="like-price">320<span>元</span></div>
                                        <button className="like-btn"><FaHeart style={{marginRight:"8px"}}/>取消收藏</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LikesMain;
