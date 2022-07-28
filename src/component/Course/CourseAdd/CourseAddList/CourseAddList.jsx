/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import "./CourseAddList.css";
import { useRef, useEffect, useState } from "react";
import { courseImages } from "../../../../config/api-path";

function CourseAddList({ setFormData, formData, selectedFile, setSelectedFile, isFilePicked, setIsFilePicked, preview, setPreview, imgName, setImgName }) {
    const { course_name, course_price, course_level, course_img_s } = formData;
    const file = useRef();
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
        // console.log(objectUrl);
        setPreview(objectUrl);

        // 當元件unmounted時清除記憶體
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const changeHandler = (e) => {
        const file = e.target.files[0];
        // console.log(file);
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
                    // console.log("Success:", result.filename);
                    setImgName(result.filename);
                    setFormData({ ...formData, course_img_s: result.filename });
                });
        }


    }, [selectedFile]);

    const handleSubmission = () => { };

    return (
        <div className="CourseAddList">
            <div className="d-flex CourseAddList-wrap">
                <div style={{ paddingRight: 63 }}>
                    <p>標題圖片 :</p>
                    <div
                        className="CourseAddList-img"
                        style={{
                            background: `url(${preview}) no-repeat center center`,
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
                        <p onClick={handleSubmission}>課程價格 :</p>
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
