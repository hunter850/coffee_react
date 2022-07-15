import "./CoursePath.css";

import { useState } from "react";
const initState = (items) => {
    const menuItems = [];
    for (let i = 0; i < items.length; i++) {
        menuItems.push({
            id: i + 1,
            name: items[i],
            focus: false,
        });
    }

    return menuItems;
};

function CoursePath() {
    const coursePaths = [
        "課程內容",
        "適合對象",
        "需求材料",
        "報名資訊",
        "注意事項",
    ];
    const defaultCoursePaths = initState(coursePaths);
    const [clickSure, setClickSure] = useState(defaultCoursePaths);

    return (
        <div className="CoursePath">
            {clickSure.map((v, i) => {
                console.log(v);
                return (
                    <div
                        key={i}
                        className={`CoursePaths ${v.focus ? "focus" : ""}`}
                        onClick={() => {
                            const newCoursePaths = defaultCoursePaths.map(
                                (v, index) => {
                                    if (i === index)
                                        return { ...v, focus: true };

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
