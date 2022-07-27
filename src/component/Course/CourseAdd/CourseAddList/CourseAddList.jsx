import "./CourseAddList.css";

function CourseAddList({ setFormData, formData }) {
    const { course_name, course_price, course_level, course_img_s } = formData;
    return (
        <div className="CourseAddList">
            <div className="d-flex CourseAddList-wrap">
                <div style={{ paddingRight: 63 }}>
                    <p>標題圖片 :</p>
                    <div
                        className="CourseAddList-img"
                        value={course_img_s}
                    ></div>
                    <button className="CourseAddList-btn">上傳圖片</button>
                </div>
                <div>
                    <div>
                        <p>課程名稱 :</p>
                        <input
                            type="text"
                            placeholder="限制11字"
                            className="coursenameinp"
                            value={course_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    course_name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <p>課程價格 :</p>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="coursepriceinp"
                                value={course_price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        course_price: Number(e.target.value),
                                    })
                                }
                            />
                            <p style={{ color: "#3E3E3E", paddingLeft: 20 }}>
                                NT$/ 人
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>課程難度 :</p>
                        <select
                            className="courselevelinp"
                            value={course_level}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    course_level: Number(e.target.value),
                                })
                            }
                        >
                            <option value={""}>選擇課程難度</option>
                            <option value={1}>初級</option>
                            <option value={2}>中級</option>
                            <option value={3}>高級</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="d-flex f-jcc">
                <div>
                    <p>課程簡介 :</p>
                    <textarea
                        type="text"
                        className="courseintroduceinp"
                        placeholder="限制34字"
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default CourseAddList;
