// 資料庫course_level 轉 中文 function
const numberConvertString = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (Number(data[i].course_level) === 1) {
            data[i].course_level = "初級";
        }
        if (Number(data[i].course_level) === 2) {
            data[i].course_level = "中級";
        }
        if (Number(data[i].course_level) === 3) {
            data[i].course_level = "高級";
        }
    }
};

export default numberConvertString;
