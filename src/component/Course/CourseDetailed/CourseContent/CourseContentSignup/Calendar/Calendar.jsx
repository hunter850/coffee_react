/* eslint-disable prettier/prettier */
import { useState } from "react";
import "./Calendar.css";

// const serverDate = [
//     {
//         course_date: new Date(),
//     },
// ];

// console.log(serverDate[0].course_date);

const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

function Calendar() {
    // const [myYear, setMyYear] = useState(new Date().getFullYear());
    // const [myMonth, setMyMonth] = useState(new Date().getMonth() + 1);
    // const [myDate, setMyDate] = useState([14, 16, 22, 27, 5, 2, 24]);
    // const [doNotSelect, setDoNotSelect] = useState(myDate);
    // 一開始未選中日期
    const myDate = [18, 28];
    const [dateClcik, setDateClcik] = useState(myDate[0]);
    const dataBtnFocus = (item) => {
        setDateClcik(item);
    };
    // 年
    const myYear = new Date().getFullYear();
    // 月
    const myMonth = new Date().getMonth() + 1;


    // 呈現yearAndMonth
    const now = new Date();

    // 要得到今天的西元年使用Date物件的getFullYear()，要得到月份使用getMonth()(注意回傳為 0~11)
    const nowY = myYear ? myYear : now.getFullYear();

    // nowM =1-12
    const nowM = myMonth ? myMonth : now.getMonth() + 1; //注意回傳為 0~11

    // 本月有幾天
    // (上個月的最後一天是幾號)
    const days = new Date(nowY, nowM, 0).getDate();

    // 本月所有日期的陣列資料
    const daysDataArray = [];

    // 加入本月所有的日期資料
    for (let i = 0; i < days; i++) {
        daysDataArray.push(i + 1);
    }

    // 準備要呈現在網頁上
    const daysDisplayArray = chunk(daysDataArray, 7);
    return (
        <div>
            <p className="courseCalendarTitle">選擇日期</p>
            <div className="courseCalendarWrap">
                <p className="courseYearAndMonth">{nowY + "/" + nowM}</p>
                <table className="courseDate-table">
                    <tbody className="courseDate">
                        {daysDisplayArray.map((v, i) => {
                            return (
                                <tr key={i}>
                                    {v.map((item, index) => (
                                        <td key={index}>
                                            <div
                                                onClick={() =>
                                                    dataBtnFocus(item)
                                                }
                                                className={`${myDate.includes(item)
                                                    ? ""
                                                    : "pointerEvents"
                                                    } courseDateBtn ${dateClcik === item ? 'courseDateBtnClick' : ''}`}
                                            >
                                                {item < 10
                                                    ? "0" + item
                                                    : item + 0}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="Calendar-arror-left"></div>
                <div className="Calendar-arror-right"></div>
            </div>
        </div>
    );
}

export default Calendar;
