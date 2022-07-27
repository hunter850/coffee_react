/* eslint-disable prettier/prettier */
// 排序用function
export const sortDataFun = (
    sortStr, // 傳進來判斷用的排序選單value - 字串
    sortFunction, // 排序的方法 - function
    Data, // 排序的資料 - 陣列
    perPage, // 一頁有幾筆資料
    sortData, // 當前排序選單的value值 - 狀態
    setPageTotal, //總頁數
    setCourseData, //最後渲染資料的操控器
    chunk, // 切割用的函式
    numberConvertString = () => { } //數字轉換時傳進來
) => {
    if (sortData === sortStr) {
        Data.sort(sortFunction);
        if (sortData === "levelAsc" || "levelDesc") {
            numberConvertString(Data);
        }
        const pageArray = chunk(Data, perPage);
        if (pageArray.length > 0) {
            setPageTotal(pageArray.length);
            setCourseData(pageArray);
        }
    }
};
