import React, { useState } from "react";
function FoodAsideCount({ item, dataFromFoodDetail }) {
    const {
        foodCount,
        menu_name,
        sugar,
        ice,
        menu_price_m,
        menu_sid,
        menu_photo,
        timeID,
    } = item;

    const subCount = menu_price_m * foodCount;
    const [count, setCount] = useState(foodCount);
    console.log("dataFromFoodDetail", dataFromFoodDetail);
    // 檢核timeID是否一致
    // const confirmTimeID = (timeID) => {
    //     const items = dataFromFoodDetail.find((v) => v.timeID === timeID);
    //     if (items) {
    //         () => {
    //             foodCount + 1;
    //         };
    //     }

    //         const confirmTimeID = (timeID) => {
    //     const items = dataFromFoodDetail.find((v) => v.timeID === timeID);
    //     if (items) {
    //         () => {
    //             foodCount + 1;
    //         };
    //     }

    return (
        <>
            <div key={menu_sid} className="detail">
                <img
                    src={`http://localhost:3500/images/food/${menu_photo}`}
                    alt=""
                />
                <div className="center">
                    <div className="takeout">
                        <p>{menu_name}</p>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M34.375 34.375C35.2038 34.375 35.9987 34.7042 36.5847 35.2903C37.1708 35.8763 37.5 36.6712 37.5 37.5V75C37.5 75.8288 37.1708 76.6237 36.5847 77.2097C35.9987 77.7958 35.2038 78.125 34.375 78.125C33.5462 78.125 32.7513 77.7958 32.1653 77.2097C31.5792 76.6237 31.25 75.8288 31.25 75V37.5C31.25 36.6712 31.5792 35.8763 32.1653 35.2903C32.7513 34.7042 33.5462 34.375 34.375 34.375V34.375ZM50 34.375C50.8288 34.375 51.6237 34.7042 52.2097 35.2903C52.7958 35.8763 53.125 36.6712 53.125 37.5V75C53.125 75.8288 52.7958 76.6237 52.2097 77.2097C51.6237 77.7958 50.8288 78.125 50 78.125C49.1712 78.125 48.3763 77.7958 47.7903 77.2097C47.2042 76.6237 46.875 75.8288 46.875 75V37.5C46.875 36.6712 47.2042 35.8763 47.7903 35.2903C48.3763 34.7042 49.1712 34.375 50 34.375V34.375ZM68.75 37.5C68.75 36.6712 68.4208 35.8763 67.8347 35.2903C67.2487 34.7042 66.4538 34.375 65.625 34.375C64.7962 34.375 64.0013 34.7042 63.4153 35.2903C62.8292 35.8763 62.5 36.6712 62.5 37.5V75C62.5 75.8288 62.8292 76.6237 63.4153 77.2097C64.0013 77.7958 64.7962 78.125 65.625 78.125C66.4538 78.125 67.2487 77.7958 67.8347 77.2097C68.4208 76.6237 68.75 75.8288 68.75 75V37.5Z"
                                fill="black"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M90.625 18.75C90.625 20.4076 89.9665 21.9973 88.7944 23.1694C87.6223 24.3415 86.0326 25 84.375 25H81.25V81.25C81.25 84.5652 79.933 87.7446 77.5888 90.0888C75.2446 92.433 72.0652 93.75 68.75 93.75h41.25C27.9348 93.75 24.7554 92.433 22.4112 90.0888C20.067 87.7446 18.75 84.5652 18.75 81.25V25H15.625C13.9674 25 12.3777 24.3415 11.2056 23.1694C10.0335 21.9973 9.375 20.4076 9.375 18.75V12.5C9.375 10.8424 10.0335 9.25268 11.2056 8.08058C12.3777 6.90848 13.9674 6.25 15.625 6.25h47.5C37.5 4.5924 38.1585 3.00269 39.3306 1.83058C40.5027 0.65848 42.0924 0 43.75 0L56.25 0C57.9076 0 59.4973 0.65848 60.6694 1.83058C61.8415 3.00269 62.5 4.5924 62.5 6.25H84.375C86.0326 6.25 87.6223 6.90848 88.7944 8.08058C89.9665 9.25268 90.625 10.8424 90.625 12.5V18.75ZM25.7375 25L25 25.3688V81.25C25 82.9076 25.6585 84.4973 26.8306 85.6694C28.0027 86.8415 29.5924 87.5 31.25 87.5h48.75C70.4076 87.5 71.9973 86.8415 73.1694 85.6694C74.3415 84.4973 75 82.9076 75 81.25V25.3688L74.2625 25H25.7375ZM15.625 18.75V12.5H84.375V18.75H15.625Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <p>
                        {sugar} / {ice}
                    </p>
                    <div className="calculate">
                        <div
                            className="minusplus"
                            onClick={() => {
                                return foodCount > 1
                                    ? setCount(foodCount - 1)
                                    : undefined;
                            }}
                        >
                            -
                        </div>
                        <h6 className="count">{count}</h6>
                        <div className="minusplus" timeid={timeID}>
                            +
                        </div>
                        <div className="grow"></div>
                        <div>$ {subCount}</div>
                    </div>
                </div>
            </div>
            <div>{timeID}</div>
        </>
    );
}

export default FoodAsideCount;
