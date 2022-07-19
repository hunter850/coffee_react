/* eslint-disable prettier/prettier */
import "./CoursePath.css";
import { useState, useEffect } from "react";

// 此頁待修正**************************************
function CoursePath() {

    const coursePaths = [
        "課程內容",
        "適合對象",
        "需求材料",
        "報名資訊",
        "注意事項",
    ];

    // 麵包屑跳轉指向的ID
    const pathId = ['#CourseContentItem', '#CourseComtentObject', '#CourseContentMaterial', '#CourseContentSignup', '#CourseContentNotice'];
    // 確認點擊事件
    const [confirmClick, setConfirmClick] = useState(false);
    // 初始高亮的狀態
    const [start, setStart] = useState(0);


    // 生成物件型狀態的函式
    const initState = (items) => {
        const menuItems = [];
        for (let i = 0; i < items.length; i++) {
            menuItems.push({
                id: i + 1,
                name: items[i],
                focus: start === i ? true : false,
            });
        }
        return menuItems;
    };

    const defaultCoursePaths = initState(coursePaths);
    const [clickSure, setClickSure] = useState(defaultCoursePaths);
    // console.log(clickSure);

    // 麵包屑fixed開關
    const [fixedRemoteControl, setFixedRemoteControl] = useState(false);


    // scrollTop大於DOM頂部開啟fixed,小於則關閉
    useEffect(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //onscroll滾動事件
        window.onscroll = () => {
            // 如果沒抓到documentElement,就抓body
            // console.log(document.documentElement.scrollTop);
            // console.log('body:' + document.body.scrollTop);
            // 798是這個DOM的頂部,用useRef查的
            if (scrollTop < 798) {
                setFixedRemoteControl(false);
            } else {
                setFixedRemoteControl(true);
            }
            // 一滾動視窗關閉確認點擊的狀態
            if (scrollTop !== document.documentElement.scrollTop) {
                setConfirmClick(false);
            }

            // 內容不同高度不同,待修正 *********************************************************
            if (confirmClick === false) {
                if (scrollTop >= 0) {
                    setStart(1);
                    setClickSure(defaultCoursePaths);
                }
                if (scrollTop >= 1371) {
                    // console.log('適合對象');
                    setStart(2);
                    setClickSure(defaultCoursePaths);
                }

                if (scrollTop >= 1407) {
                    // console.log('需求材料');
                    setStart(3);
                    setClickSure(defaultCoursePaths);
                }
                if (scrollTop >= 1861) {
                    // console.log('報名資訊');
                    setStart(4);
                    setClickSure(defaultCoursePaths);
                }
                if (scrollTop >= 2200) {
                    // console.log('注意事項');
                    setStart(5);
                    setClickSure(defaultCoursePaths);
                }
            }

        };

    }, [defaultCoursePaths, confirmClick]);




    return (
        <div className="CoursePath-wrap">
            <div className={`CoursePath ${fixedRemoteControl === true ? 'CoursePathFixed' : ''}`}>
                {clickSure.map((v, i) => {

                    return (

                        <div
                            key={i}
                            className={`CoursePaths `}
                            onClick={() => {
                                const newCoursePaths =
                                    defaultCoursePaths.map((v, index) => {
                                        if (i === index) {
                                            return { ...v, focus: true };
                                        }
                                        return v;
                                    });
                                setStart(i + 1);
                                setConfirmClick(true);
                                setClickSure(newCoursePaths);
                            }}
                        >
                            <a href={pathId[i]} className={`${clickSure[i].id === start ? "focus" : ""} }`}>{v.name}</a>
                        </div>

                    );
                })}
            </div>
        </div>
    );
}

export default CoursePath;
