/* eslint-disable prettier/prettier */
import "./CoursePath.css";
import { useState, useEffect } from "react";

function CoursePath({ object, material, signup, notice, item, topZeroSure }) {
    // 麵包屑跳轉指向的ID
    const pathId = ['#CourseContentItem', '#CourseContentMaterial', '#CourseContentSignup', '#CourseContentNotice', '#CourseComtentObject'];
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
        "需求材料",
        "報名資訊",
        "注意事項",
        "適合對象",
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
            if (confirmFixed === true) {
                if (document.documentElement.scrollTop <= 798) {
                    setFixedRemoteControl(false);
                } else {
                    setFixedRemoteControl(true);
                }
            }

            // 頁面滾動後開啟Fixed開關
            if (document.documentElement.scrollTop > scrollTop) {
                setConfirmFixed(true);
            }

            // 視窗滾動path高亮的function 參數 - scrollHeight : DOM離top的距離 , number第幾個path顯示高亮
            const pathFocus = (scrollHeight, number) => {
                if (scrollTop >= scrollHeight) {
                    setStart(number);
                    setClickSure(defaultCoursePaths);
                }
            };


            // 一滾動視窗關閉確認點擊的狀態
            if (scrollTop !== document.documentElement.scrollTop) {
                setConfirmClick(false);
            }


            if (confirmClick === false) {
                // 確定網頁已經定位到top0的位子才執行
                if (topZeroSure === true) {
                    pathFocus(item, 1);
                    pathFocus(material, 2);
                    pathFocus(signup, 3);
                    pathFocus(notice, 4);
                    pathFocus(object, 5);
                }

            }
        };
    }, [defaultCoursePaths, confirmClick, confirmFixed, object, material, signup, notice, item, topZeroSure]);

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
