import "./CourseAddListDetailed.css";

function CourseAddListDetailed({
    formData,
    setFormData,
    formDataFk,
    setFormDataFk,
}) {
    const { course_content, course_people, course_material } = formData;
    const { course_date, course_time } = formDataFk;

    return (
        <div className="CourseAddListDetailed d-flex f-jcc">
            <div className="CourseAddListDetailedCenter">
                <div>
                    <p style={{ paddingBottom: 10, paddingTop: 44 }}>
                        內頁輪播圖片 :
                    </p>
                    <p style={{ fontWeight: 400, paddingBottom: 5 }}>圖片1 :</p>
                    <div
                        className="CourseAddListDetailed-img"
                        style={{ marginBottom: 19 }}
                    ></div>
                    <button className="CourseAddListDetailed-imgbtn">
                        上傳圖片
                    </button>
                    <button className="CourseAddListDetailed-btn">
                        + 新增圖片
                    </button>
                </div>
                <div>
                    <p>課程內容 :</p>
                    <textarea
                        type="text"
                        className="CourseAddListDetailed-inp"
                        value={course_content}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course_content: e.target.value,
                            })
                        }
                    ></textarea>
                </div>
                <div>
                    <p>適合對象 :</p>
                    <textarea
                        type="text"
                        className="CourseAddListDetailed-object-inp"
                        value={course_people}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course_people: e.target.value,
                            })
                        }
                    ></textarea>
                </div>
                <div>
                    <p>需求材料 :</p>
                    <textarea
                        type="text"
                        className="CourseAddListDetailed-material-inp"
                        value={course_material}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course_material: e.target.value,
                            })
                        }
                    ></textarea>
                </div>
                <div>
                    <p>注意事項 :</p>
                    <textarea
                        type="text"
                        className="CourseAddListDetailed-inp"
                    ></textarea>
                </div>
                <div>
                    <p style={{ paddingBottom: 6 }}>報名資訊 :</p>
                    <div style={{ paddingBottom: 6 }}>
                        <p style={{ fontWeight: 400 }}>報名時間 1 :</p>

                        <div className="CourseAddListDetailed-select-inp ">
                            <input
                                type="text"
                                className="CourseAddListDetailed-date-inp"
                                placeholder="選擇日期"
                                value={course_date.data1}
                                onChange={(e) =>
                                    setFormDataFk({
                                        ...formDataFk,
                                        course_date: {
                                            ...course_date,
                                            date1: e.target.value,
                                        },
                                    })
                                }
                            />
                            <input
                                type="text"
                                className="CourseAddListDetailed-time-inp"
                                placeholder="選擇時段"
                                value={course_time.time1}
                                onChange={(e) => {
                                    setFormDataFk({
                                        ...formDataFk,
                                        course_time: {
                                            ...course_time,
                                            time1: e.target.value,
                                        },
                                    });
                                }}
                            />
                            <div className="delet-img"></div>
                        </div>
                    </div>
                    <div style={{ paddingBottom: 21 }}>
                        <p style={{ fontWeight: 400 }}>報名時間 2 :</p>
                        <div className="CourseAddListDetailed-select-inp ">
                            <input
                                type="text"
                                className="CourseAddListDetailed-date-inp"
                                placeholder="選擇日期"
                                value={course_date.data2}
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
                            <div className="delet-img"></div>
                        </div>
                    </div>
                    <button
                        className="CourseAddListDetailed-btn"
                        style={{ marginBottom: 92 }}
                    >
                        + 報名時間
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseAddListDetailed;
