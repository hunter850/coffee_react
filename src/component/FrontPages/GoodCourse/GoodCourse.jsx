import React, { Fragment } from "react";
import courseImg1 from "../../../images/frontpage/course/pourOverCoffee.png";
import courseImg2 from "../../../images/frontpage/course/barista.png";
import "./GoodCourse.css";

function GoodCourse() {
    return (
        <Fragment>
            <div className="home-container container-relative">
                <div className="bottom-line m-auto">
                    <h2 className="home-title">精選課程</h2>
                </div>
                <div>
                    <img className="goodcourse-img" src={courseImg1} alt="" />
                </div>
                <div className="goodcourse-paragraph right-brewedcoffee">
                    <h3 className="goodcourse-title">想學咖啡沖煮</h3>
                    <p className="goodcourse-text">
                        一杯簡單的咖啡，一種簡單的幸福。
                        總會覺得沖不出一杯好咖啡，還是怎麼沖咖啡都達不到自己的理想。讓我們用理論與實務併用，讓咖啡變得簡單一點，讓生活多一點快樂。
                    </p>
                </div>
                <div className="goodcourse-paragraph left-barista">
                    <h3 className="goodcourse-title">想學義式拉花</h3>
                    <p className="goodcourse-text">
                        無需任何義式咖啡經驗也可上手。
                        教法簡易易操作，好玩練習多，好上手。
                        透過國際專業的研究理論、搭配實驗方式記憶以及實際操作練習，將學習咖啡方法系統化，有助於減少進入咖啡領域摸索時間。
                    </p>
                </div>
                <div>
                    <img className="goodcourse-img" src={courseImg2} alt="" />
                </div>
            </div>
        </Fragment>
    );
}

export default GoodCourse;
