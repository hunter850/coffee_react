import "./CoursePath.css";
import { useState, useEffect } from "react";

function CoursePath() {
    // 初次渲染預設高亮顯示
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
        <div className="CoursePath">
            {clickSure.map((v, i) => {
                return (
                    <div
                        key={i}
                        className={`CoursePaths ${v.focus ? "focus" : ""} `}
                        onClick={() => {
                            const newCoursePaths = defaultCoursePaths.map(
                                (v, index) => {
                                    if (i === index) {
                                        return { ...v, focus: true };
                                    }
                                    return v;
                                }
                            );
                            setClickSure(newCoursePaths);
                        }}
                    >
                        {v.name}
                    </div>
                );
            })}
        </div>
    );
}

export default CoursePath;
