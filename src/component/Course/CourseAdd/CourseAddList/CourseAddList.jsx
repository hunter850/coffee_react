/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import "./CourseAddList.css";
import { useRef, useEffect } from "react";
import { courseImages, imgSrc } from "../../../../config/api-path";

function CourseAddList({ start, setFormData, formData, selectedFile, setSelectedFile, setIsFilePicked, setPreview, setImgName, getCourseData, errorName, errorPrice, errorLevel, inputOnFocus }) {
    const { course_name, course_price, course_level, course_img_s } = formData;

    useEffect(() => {
        // 有取得資料才渲染
        if (start === true) {
            setPreview(`${imgSrc}/course/${getCourseData[0].course_img_s}`);
        }
    }, [getCourseData]);
    // 取得上傳照片的input
    const file = useRef();
    // 模擬點擊上傳照片的input,本身已經display:none
    const imgFile = (event) => {
        event.preventDefault();
        file.current.click();
    };

    // 當選擇檔案更動時建立預覽圖
    useEffect(() => {
        if (!selectedFile) {
            setPreview("");
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // 當元件unmounted時清除記憶體
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const changeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsFilePicked(true);
            setSelectedFile(file);
            setImgName("");
        } else {
            setIsFilePicked(false);
            setSelectedFile(null);
            setImgName("");
        }
    };
    useEffect(() => {
        if (selectedFile) {
            const fd = new FormData();
            fd.append("avatar", selectedFile);
            fetch(courseImages, {
                method: "POST",
                body: fd,
            })
                .then((response) => response.json())
                .then((result) => {
                    // 發送到資料庫的照片檔名
                    setImgName(result.filename);
                    // 將檔名存在要發給資料庫的formData裡
                    setFormData({ ...formData, course_img_s: result.filename });
                });
        }
    }, [selectedFile]);
    const add = (
        <div className="CourseAddList">
            <div className="d-flex CourseAddList-wrap">
                <div style={{ paddingRight: 63 }}>
                    <p>標題圖片 :</p>
                    <div
                        className="CourseAddList-img"
                        style={{
                            background: `url(${imgSrc}/course/${formData.course_img_s
                                })  center center / cover no-repeat`,
                        }}
                    ></div>
                    <input
                        type="file"
                        name="file"
                        style={{ display: "none" }}
                        ref={file}
                        onChange={(e) => changeHandler(e)}
                    />
                    <button
                        className="CourseAddList-btn"
                        onClick={(event) => imgFile(event)}
                    >
                        上傳圖片
                    </button>
                </div>
                <div>
                    <div>
                        <p >課程名稱 :</p>
                        <input
                            type="text"
                            placeholder="限制11字"
                            className={`coursenameinp  ${errorName !== '' ? 'course-add-error-txt' : ''}`}
                            value={errorName === '' ? course_name : errorName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    course_name: e.target.value,
                                })
                            }
                            onFocus={() => inputOnFocus('name')}
                        />
                    </div>
                    <div>
                        <p>課程價格 :</p>
                        <div className="d-flex">
                            <input
                                type="text"
                                className={`coursepriceinp  ${errorPrice !== '' ? 'course-add-error-txt' : ''}`}
                                value={errorPrice === '' ? course_price : errorPrice}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        course_price: e.target.value,
                                    })
                                }
                                onFocus={() => inputOnFocus('price')}
                            />
                            <p style={{ color: "#3E3E3E", paddingLeft: 20 }}>
                                NT$/ 人
                            </p>
                        </div>

                    </div>
                    <div>
                        <p>課程難度 :</p>
                        <select
                            className={`courselevelinp  ${errorLevel !== '選擇課程難度' ? 'course-add-error-txt' : ''}`}
                            value={course_level}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    course_level: e.target.value,
                                })
                            }
                            onFocus={() => inputOnFocus('level')}
                        >
                            <option value={""}>{errorLevel === '' ? '選擇課程難度' : errorLevel}</option>
                            <option value={1}>初級</option>
                            <option value={2}>中級</option>
                            <option value={3}>高級</option>
                        </select>

                    </div>
                </div>
            </div>
        </div>
    );



    return add;
}

export default CourseAddList;
