/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./CourseAddListDetailed.css";
import { useRef, useEffect } from "react";
import { courseImages, imgSrc, courseDataFkGet } from "../../../../config/api-path";
import axios from "axios";

function CourseAddListDetailed({
    formData,
    setFormData,
    formDataFk,
    setFormDataFk,
    selectedFiles,
    setSelectedFiles,
    previews,
    setPreviews,
    setIsFilePickeds,
    setImgNames,
    getCourseData,
    start,
    sid,
    errorContent,
    errorPeople,
    errorMaterial,
    inputOnFocus,
    errorTime,
    errorDate,
    handleAutoForm
}) {
    const { course_content, course_people, course_material } = formData;
    const { course_date, course_time } = formDataFk;

    useEffect(() => {
        if (sid) {
            axios.get(courseDataFkGet)
                .then((res) => {
                    const newDataFk = res.data.filter((v, i) => {
                        return Number(v.course_sid) === Number(sid);
                    });
                    // 將資料庫的資料整理成物件格式,塞回儲存資料的狀態
                    const dateArr = newDataFk[0].course_date.split(',');
                    const timeArr = newDataFk[0].course_time.split(',');

                    setFormDataFk({
                        ...formDataFk,
                        course_sid: newDataFk[0].course_sid,
                        course_img_l: newDataFk[0].course_img_l.split(','),
                        course_time: { time1: timeArr[0], time2: timeArr[1] },
                        course_date: { date1: dateArr[0], date2: dateArr[1] },
                    });
                });
        }
    }, []);

    useEffect(() => {
        // 有取得資料才渲染
        if (start === true) {
            setFormData({
                ...formData, course_name: getCourseData[0].course_name,
                course_price: getCourseData[0].course_price,
                course_level: getCourseData[0].course_level,
                course_content: getCourseData[0].course_content,
                course_people: getCourseData[0].course_people,
                course_material: getCourseData[0].course_material,
                course_img_s: getCourseData[0].course_img_s,
            });
        }
    }, [getCourseData]);

    const files = useRef();
    const imgFiles = (event) => {
        event.preventDefault();
        files.current.click();
    };
    // 當選擇檔案更動時建立預覽圖
    useEffect(() => {
        if (!selectedFiles) {
            setPreviews([]);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFiles);
        previews.length < 5 ? previews.push(objectUrl) : setPreviews(previews);

        // 當元件unmounted時清除記憶體
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFiles]);

    const changeHandlers = (e) => {
        const file = e.target.files[0];

        if (file) {
            setIsFilePickeds(true);
            setSelectedFiles(file);
            setImgNames("");
        } else {
            setIsFilePickeds(false);
            setSelectedFiles(null);
            setImgNames("");
        }
    };

    useEffect(() => {
        if (selectedFiles) {
            const fds = new FormData();
            fds.append("avatar", selectedFiles);
            fetch(courseImages, {
                method: "POST",
                body: fds,
            })
                .then((response) => response.json())
                .then((result) => {
                    // 發送到資料庫的照片檔名
                    setImgNames(result.filename);
                    // 限制最多只收5張圖片
                    if (formDataFk.course_img_l.length < 5) {
                        formDataFk.course_img_l.push(result.filename);
                    }
                    // 將檔名存在要發給資料庫的formData裡
                    setFormDataFk({
                        ...formDataFk,
                        course_img_l: formDataFk.course_img_l,
                    });
                });
        }
    }, [selectedFiles]);

    // 刪除輪播圖片
    const deleteImg = (e) => {
        e.preventDefault();
        previews.length > 0 ? previews.pop() : setPreviews(previews);
        if (formDataFk.course_img_l.length > 0) {
            formDataFk.course_img_l.pop();
        }
        setFormDataFk({
            ...formDataFk,
            course_img_l: formDataFk.course_img_l,
        });
    };

    return (
        <div className="CourseAddListDetailed d-flex f-jcc">
            <div className="CourseAddListDetailedCenter">
                <div >
                    <p style={{ paddingBottom: 10, paddingTop: 44 }}>
                        內頁輪播圖片 :
                    </p>
                    <div className={`${formDataFk.course_img_l.length > 0 ? 'course-display-none' : ''}`}>
                        <p
                            style={{
                                fontWeight: 400,
                                paddingBottom: 5,
                            }}
                        >
                            圖片 1 :
                        </p>
                        <div
                            className="CourseAddListDetailed-img"
                            style={{ marginBottom: 19 }}
                        ></div>
                    </div>
                    {formDataFk.course_img_l.map((v, i) => {
                        return (
                            <div key={i}>
                                <p
                                    style={{
                                        fontWeight: 400,
                                        paddingBottom: 5,
                                    }}
                                >
                                    圖片 {i + 1} :
                                </p>
                                <div
                                    className="CourseAddListDetailed-img"
                                    style={{
                                        background: `url(${imgSrc}/course/${v
                                            })  center center / cover no-repeat`,
                                        marginBottom: 19,
                                    }}
                                ></div>
                            </div>
                        );
                    })}
                    <input
                        type="file"
                        name="file"
                        style={{ display: "none" }}
                        ref={files}
                        onChange={(e) => changeHandlers(e)}
                    />
                    <button
                        className="CourseAddListDetailed-imgbtn"
                        onClick={(event) => imgFiles(event)}
                    >
                        上傳圖片
                    </button>
                    <button className="CourseAddListDetailed-btn-red" onClick={(e) => deleteImg(e)}>
                        刪除圖片
                    </button>
                </div>
                <div>
                    <p>課程內容 :</p>
                    <textarea
                        type="text"
                        className={`CourseAddListDetailed-inp  ${errorContent !== '' ? 'course-add-error-txt' : ''}`}
                        value={errorContent === '' ? course_content : errorContent}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course_content: e.target.value,
                            })
                        }
                        onFocus={() => inputOnFocus('content')}
                    ></textarea>
                </div>
                <div>
                    <p>適合對象 :</p>
                    <textarea
                        type="text"
                        className={`CourseAddListDetailed-object-inp  ${errorPeople !== '' ? 'course-add-error-txt' : ''}`}
                        value={errorPeople === '' ? course_people.replace(/<br>/g, "\r\n") : errorPeople}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course_people: e.target.value,
                            })
                        }
                        onFocus={() => inputOnFocus('people')}
                    ></textarea>
                </div>
                <div>
                    <p>需求材料 :</p>
                    <textarea
                        type="text"
                        className={`CourseAddListDetailed-material-inp  ${errorMaterial !== '' ? 'course-add-error-txt' : ''}`}
                        value={errorMaterial === '' ? course_material.replace(/<br>/g, "\r\n") : errorMaterial}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course_material: e.target.value,
                            })
                        }
                        onFocus={() => inputOnFocus('material')}
                    ></textarea>
                </div>
                <div>
                    <p style={{ paddingBottom: 6 }}>報名資訊 :</p>
                    <div style={{ paddingBottom: 6 }}>
                        <p style={{ fontWeight: 400 }}>報名時間 1 :</p>
                        <div className="CourseAddListDetailed-select-inp ">
                            <input
                                type="text"
                                className={`CourseAddListDetailed-date-inp  ${errorDate !== '' ? 'course-add-error-txt' : ''}`}
                                placeholder="選擇日期"
                                value={errorDate === '' ? course_date.date1 : errorDate}
                                onChange={(e) =>
                                    setFormDataFk({
                                        ...formDataFk,
                                        course_date: {
                                            ...course_date,
                                            date1: e.target.value,
                                        },
                                    })
                                }
                                onFocus={() => inputOnFocus('date')}
                            />
                            <input
                                type="text"
                                className={`CourseAddListDetailed-time-inp ${errorTime !== '' ? 'course-add-error-txt' : ''}`}
                                placeholder="選擇時段"
                                value={errorTime === '' ? course_time.time1 : errorTime}
                                onChange={(e) => {
                                    setFormDataFk({
                                        ...formDataFk,
                                        course_time: {
                                            ...course_time,
                                            time1: e.target.value,
                                        },
                                    });
                                }}
                                onFocus={() => inputOnFocus('time')}
                            />
                        </div>
                    </div>
                    <div style={{ paddingBottom: 21 }}>
                        <p style={{ fontWeight: 400 }}>報名時間 2 :</p>
                        <div className="CourseAddListDetailed-select-inp ">
                            <input
                                type="text"
                                className="CourseAddListDetailed-date-inp"
                                placeholder="選擇日期"
                                value={course_date.date2}
                                onChange={(e) =>
                                    setFormDataFk({
                                        ...formDataFk,
                                        course_date: {
                                            ...course_date,
                                            date2: e.target.value,
                                        },
                                    })
                                }
                            />
                            <input
                                type="text"
                                className="CourseAddListDetailed-time-inp"
                                placeholder="選擇時段"
                                value={course_time.time2}
                                onChange={(e) => {
                                    setFormDataFk({
                                        ...formDataFk,
                                        course_time: {
                                            ...course_time,
                                            time2: e.target.value,
                                        },
                                    });
                                }}
                            />

                        </div>
                    </div>
                    <button
                        className="CourseAddListDetailed-btn"
                        style={{ marginBottom: 92 }}
                        onClick={(e) => handleAutoForm(e)}
                    >
                        自動填表
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseAddListDetailed;
