/* eslint-disable prettier/prettier */
import "./CoursePath.css";
import { useState, useEffect } from "react";

// 此頁待修正**************************************
function CoursePath() {

    // 麵包屑跳轉指向的ID
    const pathId = ['#CourseContentItem', '#CourseComtentObject', '#CourseContentMaterial', '#CourseContentSignup', '#CourseContentNotice'];
    // 確認點擊事件
    const [confirmClick, setConfirmClick] = useState(false);
    // 初始高亮的狀態
    const [start, setStart] = useState(1);

    // 生成物件型狀態的函式
    const initState = (items) => {
        const menuItems = [];
        for (let i = 0; i < items.length; i++) {
            menuItems.push({
                id: i + 1,
                name: items[i],
            });
        }
        return menuItems;
    };

    const coursePaths = [
        "課程內容",
        "適合對象",
        "需求材料",
        "報名資訊",
        "注意事項",
    ];

    const defaultCoursePaths = initState(coursePaths);
    const [clickSure, setClickSure] = useState(defaultCoursePaths);

    // 麵包屑fixed開關
    const [fixedRemoteControl, setFixedRemoteControl] = useState(false);
    // 限制不要一進頁面就Fixed
    const [confirmFixed, setConfirmFixed] = useState(document.documentElement.scrollTop === 0 ? true : false);

    // scrollTop大於DOM頂部開啟fixed,小於則關閉
    useEffect(() => {
        // 如果沒抓到documentElement,就抓body
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //onscroll滾動事件
        window.onscroll = () => {
            // console.log(document.documentElement.scrollTop);
            // console.log('scrollTop: ' + scrollTop);
            // 798是這個DOM的頂部,用useRef查的
            if (confirmFixed === true) {
                if (document.documentElement.scrollTop <= 798) {
                    setFixedRemoteControl(false);
                } else {
                    setFixedRemoteControl(true);
                }
            }

            // console.log(document.documentElement.scrollTop > scrollTop);
            // 頁面滾動後開啟Fixed開關
            if (document.documentElement.scrollTop > scrollTop) {
                setConfirmFixed(true);
            }

            // 一滾動視窗關閉確認點擊的狀態
            if (scrollTop !== document.documentElement.scrollTop) {
                setConfirmClick(false);
            }

            const pathFocus = (scrollHeight, number) => {
                if (scrollTop >= scrollHeight) {
                    setStart(number);
                    setClickSure(defaultCoursePaths);
                }
            };
            // 內容不同高度不同,待修正 *********************************************************
            if (confirmClick === false) {
                pathFocus(0, 1);
                pathFocus(1371, 2);
                pathFocus(1407, 3);
                pathFocus(1861, 4);
                pathFocus(2200, 5);
            }
        };
    }, [defaultCoursePaths, confirmClick, confirmFixed]);

    return (
        <div className="CoursePath-wrap">
            <div className={`CoursePath ${fixedRemoteControl === true ? 'CoursePathFixed' : ''}`}>
                {clickSure.map((v, i) => {
                    return (
                        <div
                            key={i}
                            className={`CoursePaths`}
                            onClick={() => {
                                setStart(i + 1);
                                setConfirmClick(true);
                                setConfirmFixed(true);
                                setClickSure(defaultCoursePaths);
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
