/* eslint-disable prettier/prettier */
import "./CoursePath.css";
import { useState, useEffect } from "react";

function CoursePath() {
    // 麵包屑fixed開關
    const [fixedRemoteControl, setFixedRemoteControl] = useState(false);
    // scrollTop大於DOM頂部開啟fixed,小於則關閉
    useEffect(() => {
        window.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 798是這個DOM的頂部,用useRef查的
            if (scrollTop < 798) {
                setFixedRemoteControl(false);
            } else {
                setFixedRemoteControl(true);
            }
        };
    }, []);

    // 麵包屑初次渲染預設高亮顯示
    useEffect(() => {
        setStart(0);
    }, []);

    const coursePaths = [
        "課程內容",
        "適合對象",
        "需求材料",
        "報名資訊",
        "注意事項",
    ];
    // 麵包屑跳轉指向的ID
    const pathId = ['#CourseContentItem', '#CourseComtentObject', '#CourseContentMaterial', '#CourseContentSignup', '#CourseContentNotice'];
    // 初始高亮的狀態
    const [start, setStart] = useState(1);
    // 生成物件型狀態的函式
    const initState = (items) => {
        const menuItems = [];
        for (let i = 0; i < items.length; i++) {
            menuItems.push({
                id: i + 1,
                name: items[i],
                focus: start === 1 && i === 0 ? true : false,
            });
        }
        return menuItems;
    };

    const defaultCoursePaths = initState(coursePaths);
    const [clickSure, setClickSure] = useState(defaultCoursePaths);
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
                                setClickSure(newCoursePaths);
                            }}
                        >
                            <a href={pathId[i]} className={`${v.focus ? "focus" : ""
                                }`}>{v.name}</a>
                        </div>

                    );
                })}
            </div>
        </div>
    );
}

export default CoursePath;
