/* eslint-disable prettier/prettier */
import "./Carousel.css";
import { useState, useEffect } from "react";
import { v4 } from "uuid";


function Carousel() {
    const delay = 'ease 1000ms';
    const imgs = ["https://picsum.photos/id/249/1440/500", "https://picsum.photos/id/1014/1440/500", "https://picsum.photos/id/120/1440/500", "https://picsum.photos/id/216/1440/500", "https://picsum.photos/id/227/1440/500"];
    const imgsLength = imgs.length;
    // 控制輪播圖片顯示哪一張
    const [page, setPage] = useState(1);
    // 控制transition關掉的時機,達成無限輪播
    const [transitionDelay, setTransitionDelay] = useState(true);
    // 判斷照片往哪個方向移動
    const [direction, setDirection] = useState('');
    // 連按限制器
    const [remoteControl, setRemoteControl] = useState(true);

    const rightPage = () => {
        if (remoteControl === true) {
            setDirection('right');
            setPage(page < imgsLength + 1 ? page + 1 : 0);
        }
        setRemoteControl(false);
    };

    const leftPage = () => {
        if (remoteControl === true) {
            setDirection('left');
            setPage(page > 0 ? page - 1 : imgsLength);
        }
        setRemoteControl(false);
    };

    useEffect(() => {
        setTimeout(() => {
            setRemoteControl(true);
        }, 1000);

        // 往右的無限輪播
        if (direction === 'right') {
            if (page === imgsLength + 1) {
                setTransitionDelay(false);
                setPage(0);
            }
            setTimeout(() => {
                if (page === 0) {
                    setTransitionDelay(true);
                    setPage(1);
                }
            }, 0);
        }
        // 往左的無限輪播
        if (direction === 'left') {
            if (page === 0) {
                setTransitionDelay(false);
                setPage(imgsLength + 1);
            }
            setTimeout(() => {
                if (page === imgsLength + 1) {
                    setTransitionDelay(true);
                    setPage(imgsLength);
                }
            }, 0);
        }
    }, [page, direction, imgsLength]);


    return (
        <div className="course-Carousel">
            <div
                className="course-slideshow d-flex"
                style={{ transform: `translateX(${page * -100}vw)`, transition: `${transitionDelay === true ? delay : ''}`, width: `${imgsLength + 2}00vw` }}
            >

                <div className="course-slideshowSlider" style={{ background: `url(${imgs[imgsLength - 1]}) no-repeat center center`, backgroundSize: 'cover' }} >
                </div>
                {imgs.map((v, i) => {
                    return (
                        <div className="course-slideshowSlider" key={v4()} style={{ background: `url(${imgs[i]}) no-repeat center center`, backgroundSize: 'cover' }} >
                        </div>
                    );
                })}
                <div className="course-slideshowSlider" style={{ background: `url(${imgs[0]}) no-repeat center center`, backgroundSize: 'cover' }} >
                </div>

            </div>
            <ul className="Ellipse-wrap d-flex">
                {imgs.map((v, i) => {
                    return (
                        <li
                            className={`Ellipse ${page === i + 1 ? "course-Ellipse-focus" : ""}`}
                            key={v4()}
                            onClick={() => {
                                setPage(i + 1);
                            }}
                        ></li>
                    );
                })}
            </ul>
            <div className="arror-left" onClick={leftPage}>
                <div></div>
            </div>
            <div className="arror-right" onClick={rightPage}>
                <div></div>
            </div>
        </div>
    );
}

export default Carousel;
