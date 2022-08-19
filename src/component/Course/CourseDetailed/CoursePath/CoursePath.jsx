/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import "./CoursePath.css";
import { useState, useEffect } from "react";

function CoursePath({ object, material, signup, notice, item, topZeroSure, setIndex, index, clickPaths, setClickPaths, pathFixed }) {

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

    // 初始高亮的狀態
    const [start, setStart] = useState(1);

    // 麵包屑fixed開關
    const [fixedRemoteControl, setFixedRemoteControl] = useState(false);

    useEffect(() => {
        //onscroll滾動事件
        window.addEventListener('scroll', () => {
            // 達到指定的scrollTop,開啟Fixed
            if (document.documentElement.scrollTop <= 798 || document.documentElement.scrollTop >= pathFixed) {
                setFixedRemoteControl(false);
            }
            else {
                setFixedRemoteControl(true);
            };
            // 確定網頁已經定位到top0的位子才執行
            // 減掉的30是margin
            if (topZeroSure === true) {
                if (item - 30 <= window.scrollY && material - 30 >= window.scrollY) {
                    setIndex(0);
                } else {
                    setIndex(0);
                }
                if (material - 30 <= window.scrollY && signup - 30 >= window.scrollY) {
                    setIndex(1);
                }
                if (signup - 30 <= window.scrollY && notice - 30 >= window.scrollY) {
                    setIndex(2);
                }
                if (notice - 30 <= window.scrollY && object - 30 >= window.scrollY) {
                    setIndex(3);
                }
                if (object - 30 <= window.scrollY) {
                    setIndex(4);
                }
            }
        });
    }, [defaultCoursePaths, topZeroSure, start]);

    // Path點擊後位移
    const courseClickMove = (i) => {
        const pathArr = [item, material, signup, notice, object];
        window.scrollTo({ top: pathArr[i] - 30, behavior: "smooth" });
    };

    // path位移function
    const movePath = (i) => {
        // path被點擊
        setClickPaths(true);
        // 位移的索引
        setIndex(i);
        // 高亮的索引
        setStart(i + 1);
    };

    useEffect(() => {
        // 點擊path的時候才執行
        setStart(index + 1);
        if (clickPaths === true) {
            courseClickMove(index);
            setTimeout(() => {
                setClickPaths(false);
            }, 0);
        }
    }, [index, start, clickPaths]);

    return (
        <div className="CoursePath-wrap">
            <div className={`CoursePath ${fixedRemoteControl === true ? 'CoursePathFixed' : ''}`}>
                {clickSure.map((v, i) => {
                    return (
                        <div
                            key={i}
                            className={`CoursePaths`}
                            onClick={() => movePath(i)}

                        >
                            <a href="#/" className={`${clickSure[i].id === start ? "focus" : ""} }`} >{v.name}</a>
                        </div>

                    );
                })}
            </div>
        </div>
    );
}

export default CoursePath;
