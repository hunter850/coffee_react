import "./GoogleMap.scss";
import SingleMapDetail from "./SingleMapDetail";
import { useEffect, useState } from "react";
import "../DateTime.scss";

function GoogleMap({
    setShowMap,
    setSelectedAddress,
    setDataFromDate,
    setDataFromDateTime,
}) {
    const [storeInfo, setStoreInfo] = useState({});

    useEffect(() => {
        console.log("did update");
    }, [storeInfo]);

    const handleChildClick = (e) => {
        e.stopPropagation();
    };

    // 以下是時間------------------
    const store_time = [
        { store_time_sid: "1", time: "08:00" },
        { store_time_sid: "2", time: "08:30" },
        { store_time_sid: "3", time: "09:00" },
        { store_time_sid: "4", time: "09:30" },
        { store_time_sid: "5", time: "10:00" },
        { store_time_sid: "6", time: "10:30" },
        { store_time_sid: "7", time: "11:00" },
        { store_time_sid: "8", time: "11:30" },
    ];
    const getdate = new Date();
    const month = getdate.getMonth() + 1; //  拿到月份
    const date = getdate.getDate(); // 拿到日期
    const day = getdate.getDay(); // 拿到星期
    const dayName = ["日", "一", "二", "三", "四", "五", "六"];

    const dateGet = [
        { id: 1, timeperiod: [`${month}月`, `${date}日`, `週${dayName[day]}`] },
        {
            id: 2,
            timeperiod: [
                `${month}月`,
                `${date + 1}日`,
                `週${dayName[day + 1]}`,
            ],
        },
        {
            id: 3,
            timeperiod: [
                `${month}月`,
                `${date + 2}日`,
                `週${dayName[day + 2]}`,
            ],
        },
    ];
    const [inputTime, setInputTime] = useState(store_time[0].time);
    const [inputDate, setInputDate] = useState(`2022-0${month}-0${date}`);
    const submitBtn = storeInfo && inputDate ? "bottoms" : "bottoms disabled";
    return (
        <>
            <div
                className="google-lightbox"
                onClick={() => {
                    setShowMap(false);
                }}
            >
                <div className="detail" onClick={handleChildClick}>
                    <div className="top">
                        <h6>選擇自取門市 & 時間</h6>
                    </div>

                    <div className="middle2 ">
                        <SingleMapDetail
                            setStoreInfo={setStoreInfo}
                            storeInfo={storeInfo}
                        />
                    </div>
                    <div className="selectTime">
                        <div className="middle">
                            <h6 className="select">自取日期</h6>
                            <select
                                className="datetime"
                                value={inputDate}
                                onChange={(e) => {
                                    setInputDate(e.target.value);
                                }}
                            >
                                {dateGet.map(({ id, timeperiod }, i) => {
                                    return (
                                        <option
                                            key={`dateGet${id}`}
                                            value={`2022-0${month}-0${date + i
                                                }`}
                                        >
                                            {/* {timeperiod} */}
                                            {`${month}月${date + i}日`}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="middle1">
                            <h6 className="select">自取時間</h6>
                            <select
                                className="datetime"
                                value={inputTime}
                                onChange={(e) => {
                                    setInputTime(e.target.value);
                                }}
                            >
                                {store_time.map(({ time, store_time_sid }) => {
                                    return (
                                        <option key={store_time_sid}>
                                            {time}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="bottomarea">
                        <div
                            className={submitBtn}
                            onClick={() => {
                                setShowMap(false);
                                setSelectedAddress(storeInfo);
                                setDataFromDate(inputDate);
                                setDataFromDateTime(inputTime);
                            }}
                        >
                            <h6>送出</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GoogleMap;
