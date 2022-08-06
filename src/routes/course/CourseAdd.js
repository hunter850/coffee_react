/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState } from "react";
import NavBar from "../../component/NavBar/NavBar";
import Path from "../../component/Item/Path/Path";
import CourseAddList from "../../component/Course/CourseAdd/CourseAddList/CourseAddList";
import CourseAddListDetailed from "../../component/Course/CourseAdd/CourseAddListDetailed/CourseAddListDetailed";
import {
    courseDataAdd,
    courseDataAddFk,
    courseDataGetSid,
    courseDataFkGet,
    courseDataEdit,
    courseDataEditFk,
} from "../../config/api-path";
import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const CourseAdd = () => {
    // 取得資料庫資料
    const [getCourseData, setGetCourseData] = useState([]);
    const [getCourseDataFk, setGetCourseDataFk] = useState([]);
    const [start, setStart] = useState(false);
    // console.log(getCourseData);
    // console.log(getCourseDataFk);
    // 選擇的檔案 - s是給外鍵用的
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState(null);
    // 是否有檔案被挑選
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isFilePickeds, setIsFilePickeds] = useState(false);
    // 預覽圖片
    const [preview, setPreview] = useState("");
    const [previews, setPreviews] = useState([]);
    // 要發給資料庫的照片檔名
    const [imgName, setImgName] = useState("");
    const [imgNames, setImgNames] = useState("");
    // console.log("要給資料庫的檔名: " + imgName);
    // 監聽後端是否回傳sid
    const [monitor, setMonitor] = useState(false);
    const [monitorFk, setMonitorFk] = useState(false);
    // 要新增的資料狀態
    const [formData, setFormData] = useState({
        course_name: "",
        course_price: "",
        course_level: "",
        course_img_s: "",
        course_content: "",
        course_people: "",
        course_material: "",
    });
    const [errorName, setErrorName] = useState("");
    const [errorPrice, setErrorPrice] = useState("");
    const [errorContent, setErrorContent] = useState("");
    const [errorPeople, setErrorPeople] = useState("");
    const [errorMaterial, setErrorMaterial] = useState("");
    const [formCheck, setFormCheck] = useState(false);
    // 外鍵狀態
    const [formDataFk, setFormDataFk] = useState({
        course_sid: "",
        course_date: {
            date1: "",
            date2: "",
        },
        course_time: {
            time1: "",
            time2: "",
        },
        course_img_l: [],
    });

    // 取得網址sid
    const { sid } = useParams();

    useEffect(() => {
        // 取得當前要修改的資料
        // 如果有sid才做
        if (sid) {
            axios.get(`${courseDataGetSid}/${sid}`).then((res) => {
                setGetCourseData(res.data);
                setStart(true);
            });
            // 外鍵
            axios.get(courseDataFkGet).then((res) => {
                const newCourseDataFk = res.data.filter((v, i) => {
                    return Number(v.course_sid) === Number(sid);
                });
                setGetCourseDataFk(newCourseDataFk);
            });
        }
    }, []);
    // 新增資料的請求,如果有取得sid會進行資料修改(編輯功能)
    const handleSubmission = (e) => {
        e.preventDefault();
        if (sid) {
            axios({
                method: "put",
                url: courseDataEdit,
                data: { ...formData, course_sid: sid },
                "content-type": "application/x-www-form-urlencoded",
            }).then((res) => {
                console.log(res);
                setMonitorFk(true);
            });
        } else {
            // console.log(formData);
            // 這裡需要檢查欄位 (還沒做)
            const {
                course_content,
                course_level,
                course_material,
                course_name,
                course_price,
                course_people,
            } = formData;

            if (course_name === "") {
                setErrorName("請輸入名稱");
            }
            if (course_price === "") {
                setErrorPrice("請輸入價格");
            }
            if (course_content === "") {
                setErrorContent("請輸入課程內容");
            }
            if (course_people === "") {
                setErrorPeople("請輸入適合對象");
            }
            if (course_material === "") {
                setErrorMaterial("請輸入需求材料");
            }
            // 欄位都不是空值時才發送給後端
            const keys = [];
            for (let key in formData) {
                if (formData[key] === "") {
                    keys.push(key);
                }
            }
            if (keys.length === 0) {
                axios({
                    method: "post",
                    url: courseDataAdd,
                    data: formData,
                    "content-type": "application/x-www-form-urlencoded",
                }).then((response) => {
                    console.log(response.config.data);
                    console.log(response);
                    // 確定拿到sid後塞給外鍵的formData
                    setFormDataFk({
                        ...formDataFk,
                        course_sid: response.data,
                    });
                    setMonitor(true);
                    setFormCheck(false);
                });
            }
        }
    };
    // input獲得焦點時取消error
    const inputOnFocus = (e) => {
        if (e === "name") {
            setErrorName("");
        } else if (e === "price") {
            setErrorPrice("");
        } else if (e === "content") {
            setErrorContent("");
        } else if (e === "people") {
            setErrorPeople("");
        } else if (e === "material") {
            setErrorMaterial("");
        }
    };

    useEffect(() => {
        // 發送請求前將資料整理成陣列
        const dataArr = [];
        const timeArr = [];
        dataArr.push(
            formDataFk.course_date.date1,
            formDataFk.course_date.date2
        );
        timeArr.push(
            formDataFk.course_time.time1,
            formDataFk.course_time.time2
        );
        // 確定有sid後發送新增外鍵的請求
        if (monitor === true) {
            axios({
                method: "post",
                url: courseDataAddFk,
                data: {
                    ...formDataFk,
                    course_date: dataArr,
                    course_time: timeArr,
                },
                "content-type": "application/x-www-form-urlencoded",
            }).then((response) => {
                // console.log(response.config.data);
                console.log(response);
                setMonitor(false);
                // 確定新增完成後跳轉頁面
                if (response.status === 200) {
                    // 這樣localhost是多少都沒關係
                    const localhost = window.location.origin;
                    window.location.href = `${localhost}/course/manage`;
                }
            });
        }
    }, [monitor]);
    // 修改外鍵的請求
    useEffect(() => {
        if (monitorFk === true) {
            const dataArr = [];
            const timeArr = [];
            dataArr.push(
                formDataFk.course_date.date1,
                formDataFk.course_date.date2
            );
            timeArr.push(
                formDataFk.course_time.time1,
                formDataFk.course_time.time2
            );
            axios({
                method: "put",
                url: courseDataEditFk,
                data: {
                    ...formDataFk,
                    course_date: dataArr,
                    course_time: timeArr,
                },
                "content-type": "application/x-www-form-urlencoded",
            }).then((res) => {
                console.log(res);
                setMonitorFk(false);
                // 確定修改完成後跳轉
                if (res.status === 200) {
                    // 這樣localhost是多少都沒關係
                    const localhost = window.location.origin;
                    window.location.href = `${localhost}/course/manage`;
                }
            });
        }
    }, [monitorFk]);

    const add = (
        <Fragment>
            <div style={{ backgroundColor: "#E3E7E7", minWidth: "1440px" }}>
                <NavBar />
                <Path
                    pathObj={{ path: ["．課程資訊管理", "．新增課程"] }}
                    backgroundColor={"#E3E7E7"}
                    url={["/course/manage"]}
                />
                <div className="container">
                    <form action="form1">
                        <CourseAddList
                            formData={formData}
                            setFormData={setFormData}
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            isFilePicked={isFilePicked}
                            setIsFilePicked={setIsFilePicked}
                            preview={preview}
                            setPreview={setPreview}
                            imgName={imgName}
                            setImgName={setImgName}
                            inputOnFocus={inputOnFocus}
                            errorName={errorName}
                            errorPrice={errorPrice}
                        />
                        <CourseAddListDetailed
                            formData={formData}
                            setFormData={setFormData}
                            formDataFk={formDataFk}
                            setFormDataFk={setFormDataFk}
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            previews={previews}
                            setPreviews={setPreviews}
                            isFilePickeds={isFilePickeds}
                            setIsFilePickeds={setIsFilePickeds}
                            imgNames={imgNames}
                            setImgNames={setImgNames}
                            errorContent={errorContent}
                            errorPeople={errorPeople}
                            errorMaterial={errorMaterial}
                            inputOnFocus={inputOnFocus}
                        />
                        <div
                            className="d-flex f-jcc"
                            style={{ paddingTop: 33, paddingBottom: 86 }}
                        >
                            <div style={{ paddingRight: 12 }}>
                                <button
                                    className="CourseAdd-grey"
                                    onClick={(e) => handleSubmission(e)}
                                >
                                    確定送出
                                </button>
                            </div>
                            <div>
                                <Link to="/course/manage">
                                    <button className="CourseAdd-red">
                                        取消操作
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );

    const edit = (
        <Fragment>
            <div style={{ backgroundColor: "#E3E7E7", minWidth: "1440px" }}>
                <NavBar />
                <Path
                    pathObj={{ path: ["．課程資訊管理", "．編輯課程"] }}
                    backgroundColor={"#E3E7E7"}
                    url={["/course/manage"]}
                />
                <div className="container">
                    <form action="form1">
                        <CourseAddList
                            formData={formData}
                            setFormData={setFormData}
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            isFilePicked={isFilePicked}
                            setIsFilePicked={setIsFilePicked}
                            preview={preview}
                            setPreview={setPreview}
                            imgName={imgName}
                            setImgName={setImgName}
                            getCourseData={getCourseData}
                            start={start}
                            inputOnFocus={inputOnFocus}
                            errorName={errorName}
                            errorPrice={errorPrice}
                        />
                        <CourseAddListDetailed
                            formData={formData}
                            setFormData={setFormData}
                            formDataFk={formDataFk}
                            setFormDataFk={setFormDataFk}
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            previews={previews}
                            setPreviews={setPreviews}
                            isFilePickeds={isFilePickeds}
                            setIsFilePickeds={setIsFilePickeds}
                            imgNames={imgNames}
                            setImgNames={setImgNames}
                            getCourseDataFk={getCourseDataFk}
                            getCourseData={getCourseData}
                            start={start}
                            sid={sid}
                            errorContent={errorContent}
                            errorPeople={errorPeople}
                            errorMaterial={errorMaterial}
                            inputOnFocus={inputOnFocus}
                        />
                        <div
                            className="d-flex f-jcc"
                            style={{ paddingTop: 33, paddingBottom: 86 }}
                        >
                            <div style={{ paddingRight: 12 }}>
                                <button
                                    className="CourseAdd-grey"
                                    onClick={(e) => handleSubmission(e)}
                                >
                                    確定送出
                                </button>
                            </div>
                            <div>
                                <Link to="/course/manage">
                                    <button className="CourseAdd-red">
                                        取消操作
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );

    return sid ? edit : add;
};

export default CourseAdd;
