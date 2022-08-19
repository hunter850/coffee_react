/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import "./Carousel.css";
import { useState, useEffect, useRef } from "react";
import useSetNow from "../../../../hooks/useSetNow";
import { v4 } from "uuid";
import { imgSrc } from "../../../../config/api-path";

function Carousel({ imgs, height = 500, width = '100%', router = '', isAuto = true }) {
    const autoCarousel = useRef();
    const delay = 'ease 1000ms';
    const imgsLength = imgs.length;
    // 控制輪播圖片顯示哪一張
    const [page, setPage] = useState(1);
    // 控制transition關掉的時機,達成無限輪播
    const [transitionDelay, setTransitionDelay] = useState(true);
    // 判斷照片往哪個方向移動
    const [direction, setDirection] = useState('');
    // 連按限制器
    const [remoteControl, setRemoteControl] = useState(true);
    // 是否開啟自動輪播
    const [myIsAuto, setMyIsAuto] = useState(isAuto);

    const setNow = useSetNow();

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
    // 自動輪播
    useEffect(() => {
        if (myIsAuto === true) {
            if (direction === '') {
                setDirection('auto');
            }

            if (direction === 'auto') {
                const autoNextPage = setTimeout(() => {
                    if (page < imgsLength + 1 && page !== 0) {
                        setPage(page + 1);
                        setNow(() => {
                            clearTimeout(autoNextPage);
                        });
                    }
                }, 3000);

                if (autoCarousel) {
                    // 滑鼠移出
                    autoCarousel.current.addEventListener('mouseleave', () => {
                        setDirection('');
                        setNow(() => {
                            clearTimeout(autoNextPage);
                        });
                    });
                    // 滑鼠移入
                    autoCarousel.current.addEventListener('mouseenter', () => {
                        setDirection('stop');
                        setNow(() => {
                            clearTimeout(autoNextPage);
                        });
                    });
                    // 點擊取消setTimeout
                    autoCarousel.current.addEventListener('click', () => {
                        clearTimeout(autoNextPage);
                    });
                }

                if (page === imgsLength + 1) {
                    setTransitionDelay(false);
                    setPage(0);
                }
                setNow(() => {
                    if (page === 0) {
                        setTransitionDelay(true);
                        setPage(1);
                    }
                });
            }
        }
    }, [page, direction, myIsAuto]);

    useEffect(() => {
        if (remoteControl === false) {
            setTimeout(() => {
                setRemoteControl(true);
            }, 1000);
        }
    }, [remoteControl]);

    useEffect(() => {

        // 往右的無限輪播
        if (direction === 'right') {
            if (page === imgsLength + 1) {
                setTransitionDelay(false);
                setPage(0);
            }
            setNow(() => {
                if (page === 0) {
                    setTransitionDelay(true);
                    setPage(1);
                }
            });
        }
        // 往左的無限輪播
        if (direction === 'left') {
            if (page === 0) {
                setTransitionDelay(false);
                setPage(imgsLength + 1);
            }
            setNow(() => {
                if (page === imgsLength + 1) {
                    setTransitionDelay(true);
                    setPage(imgsLength);
                }
            });
        }
    }, [page, direction, imgsLength]);

    const routerCarousel = (
        <div className="course-Carousel" ref={autoCarousel} >
            <div
                className="course-slideshow d-flex"
                style={{ transform: `translateX(${page * -100}vw)`, transition: `${transitionDelay === true ? delay : ''}`, width: `${imgsLength + 2}00vw` }}
            >

                <div className="course-slideshowSlider" style={{ background: `url(${imgSrc}${router}/${imgs[imgsLength - 1]}) center center / cover no-repeat`, height: height, width: width }} >
                </div>
                {imgs.map((v, i) => {
                    return (
                        <div className="course-slideshowSlider" key={v4()} style={{ background: `url(${imgSrc}${router}/${imgs[i]}) center center / cover no-repeat`, height: height, width: width }} >
                        </div>
                    );
                })}
                <div className="course-slideshowSlider" style={{ background: `url(${imgSrc}${router}/${imgs[0]}) center center / cover no-repeat`, height: height, width: width }} >
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
            <div className="arror-left" onClick={() => leftPage()}>
                <div></div>
            </div>
            <div className="arror-right" onClick={() => rightPage()}>
                <div></div>
            </div>
        </div>
    );

    const myCarousel = (
        <div className="course-Carousel" ref={autoCarousel}>
            <div
                className="course-slideshow d-flex"
                style={{ transform: `translateX(${page * -100}vw)`, transition: `${transitionDelay === true ? delay : ''}`, width: `${imgsLength + 2}00vw` }}
            >

                <div className="course-slideshowSlider" style={{ background: `url(${imgs[imgsLength - 1]}) center center / cover no-repeat`, height: height, width: width }} >
                </div>
                {imgs.map((v, i) => {
                    return (
                        <div className="course-slideshowSlider" key={v4()} style={{ background: `url(${imgs[i]}) center center / cover no-repeat`, height: height, width: width }} >
                        </div>
                    );
                })}
                <div className="course-slideshowSlider" style={{ background: `url(${imgs[0]}) center center / cover no-repeat`, height: height, width: width }} >
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

    return router !== '' ? routerCarousel : myCarousel;
}

export default Carousel;
