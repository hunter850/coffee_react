// 關鍵字搜尋的function
//searchInp :搜尋框value的狀態 , data:要用來搜尋的資料 , setData: 渲染資料的遙控器,setSearchSure: 判斷是否點擊搜尋按鈕的遙控器
export const courseSearch = (searchInp, data, setData, setSearchSure) => {
    if (searchInp !== "") {
        const newCourseData = data.filter((v, i) => {
            return v.course_name.includes(searchInp);
        });
        setData(newCourseData);
        setSearchSure(true);
    }
};
