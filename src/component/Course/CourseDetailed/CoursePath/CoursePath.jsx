/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import "./CoursePath.css";
import { useState, useEffect } from "react";

function CoursePath({ object, material, signup, notice, item, topZeroSure, setClickMove, clickMove, setIndex, index }) {

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
        // 如果沒抓到documentElement,就抓body
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //onscroll滾動事件
        window.onscroll = () => {
            // console.log(item);
            // console.log(material);
            // 達到指定的scrollTop,開啟Fixed
            if (document.documentElement.scrollTop <= 798) {
                setFixedRemoteControl(false);
            } else {
                setFixedRemoteControl(true);
            }

            // 視窗滾動path高亮的function 參數 - scrollHeight : DOM離top的距離 , number第幾個path顯示高亮
            const pathFocus = (scrollHeight, number) => {
                if (scrollTop >= scrollHeight) {
                    setStart(number);
                    setClickSure(defaultCoursePaths);
                }
            };

            // 確定網頁已經定位到top0的位子才執行
            if (topZeroSure === true) {
                pathFocus(item, 1);
                pathFocus(material, 2);
                pathFocus(signup, 3);
                pathFocus(notice, 4);
                pathFocus(object, 5);
            }
        };
    }, [defaultCoursePaths, object, material, signup, notice, item, topZeroSure, start]);

    // Path點擊後位移
    const courseClickMove = (i) => {
        const pathArr = [item, material, signup, notice, object];
        window.scrollTo({ top: pathArr[i] + 200, behavior: "smooth" });
    };

    // 判斷path是否被點擊
    const [clickPaths, setClickPaths] = useState(false);

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
