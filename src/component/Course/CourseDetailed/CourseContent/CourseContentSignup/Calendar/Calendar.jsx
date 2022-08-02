/* eslint-disable prettier/prettier */
import { useState } from "react";
import "./Calendar.css";
import { chunk } from '../../../../helper/chunk';

function Calendar({ date }) {

    // 一開始未選中日期 - 可報名日期的陣列
    const myDate = date;
    const [dateClcik, setDateClcik] = useState(myDate[0]);
    const dataBtnFocus = (item) => {
        setDateClcik(item);
    };
    // 年
    const myYear = new Date().getFullYear();
    // 月
    const Month = new Date().getMonth() + 1;
    // 當前月份
    const [myMonth, setMyMonth] = useState(Month);

    // 控制日曆上月份切換
    const handleFlipPage = (direction) => {
        // 傳進來的參數如果為previous,往前一個月
        if (direction === 'previous') {
            if (myMonth > 1) {
                setMyMonth(myMonth - 1);
            }
        }
        // 傳進來的參數如果為next,往後一個月
        if (direction === 'next') {
            if (myMonth < 12) {
                setMyMonth(myMonth + 1);
            }
        }
    };

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
                                                className={`${myDate.includes(item) && Month <= myMonth
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
                <div className="Calendar-arror-left" onClick={() => handleFlipPage('previous')}></div>
                <div className="Calendar-arror-right" onClick={() => handleFlipPage('next')}></div>
            </div>
        </div>
    );
}

export default Calendar;
