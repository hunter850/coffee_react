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
import { Link, useParams, useNavigate } from "react-router-dom";
import ConfirmDeleteBox from "../../component/Item/ConfirmDeleteBox/ConfirmDeleteBox";
import Modal from "../../component/Modal/Modal";

const CourseAdd = () => {
    // 防止連續送出表單
    const [banContinuous, setBanContinuous] = useState(false);
    // Modal控制器
    const [isOpen, setIsOpen] = useState(false);
    // 取得資料庫資料
    const [getCourseData, setGetCourseData] = useState([]);
    const [getCourseDataFk, setGetCourseDataFk] = useState([]);
    const [start, setStart] = useState(false);
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
    // 表單驗證
    const [errorName, setErrorName] = useState("");
    const [errorPrice, setErrorPrice] = useState("");
    const [errorContent, setErrorContent] = useState("");
    const [errorPeople, setErrorPeople] = useState("");
    const [errorMaterial, setErrorMaterial] = useState("");
    const [errorLevel, setErrorLevel] = useState("選擇課程難度");
    const [errorDate, setErrorDate] = useState("");
    const [errorTime, setErrorTime] = useState("");
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
    // 跳轉路由
    const navigate = useNavigate();
    // 一鍵輸入資料
    const handleAutoForm = (e) => {
        e.preventDefault();
        // 表單檢查初始化
        setErrorName("");
        setErrorPrice("");
        setErrorContent("");
        setErrorPeople("");
        setErrorMaterial("");
        setErrorLevel("選擇課程難度");
        setErrorDate("");
        setErrorTime("");
        if (!sid) {
            setFormData({
                course_name: "咖啡生豆認識及風味鑑嘗",
                course_price: "8700",
                course_level: "3",
                course_img_s: "2c0a2a3b5f7b841c9c2db4ad1b3f5e0d.jpg",
                course_content: `‧認識不同咖啡產地及品種，加強自己品嚐咖啡思維
‧可以品嚐到不同產地咖啡豆
‧了解不同品種咖啡豆對風味影響
‧了解不同處理法對風味影響
‧如何區分咖啡生豆
‧咖啡生豆分類
‧了解咖啡瑕疵豆類型
‧教授cupping 方法去了解咖啡品種及產地
‧咖啡生豆生長過程`,
                course_people: `‧適合年滿12歲以上對拉花有興趣的各位!如未滿18歲則需家長陪同參加。
‧對咖啡有興趣者，無須任何品飲、沖煮經驗。
‧想增加第二專長進修者。
‧企業專業進修增加工作職能者。
‧欲從事咖啡相關工作者必學證照。
‧已經從業或是已在教授咖啡課程者。
`,
                course_material: `‧磨豆機
‧手沖壺
‧濾杯
‧濾紙
‧溫度計
‧電子秤`,
            });
            setFormDataFk({
                course_sid: "",
                course_date: {
                    date1: "2022-08-07",
                    date2: "2022-08-22",
                },
                course_time: {
                    time1: "AM 03:00",
                    time2: "PM 06:00",
                },
                course_img_l: [
                    "43f80f6e4c0675fd0dde0def963a0f3b.jpg",
                    "38aecb3ddaaf82eb59cda7acde393780.jpg",
                    "73c9ba4ec7f6c5af179f5fc994057424.jpg",
                    "2421496a84b1b5134a89744e09a85c83.jpg",
                    "f83c89cb0f3f09a323f1e3fae18f9d6d.jpg",
                ],
            });
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
        } else if (e === "level") {
            setErrorLevel("選擇課程難度");
        } else if (e === "date") {
            setErrorDate("");
        } else if (e === "time") {
            setErrorTime("");
        }
    };

    // 新增資料的請求,如果有取得sid會進行資料修改(編輯功能)

    const handleSubmission = (e) => {
        e.preventDefault();
        if (sid && banContinuous === false) {
            setBanContinuous(true);
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
            const {
                course_content,
                course_level,
                course_material,
                course_name,
                course_price,
                course_people,
            } = formData;
            const {
                course_date: { date1, date2 },
                course_time: { time1, time2 },
            } = formDataFk;
            // 表單驗證
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
            if (course_level === "") {
                setErrorLevel("請選擇課程難度");
            }
            if (date1 === "") {
                setErrorDate("至少輸入一個日期");
            }
            if (time1 === "") {
                setErrorTime("至少輸入一個時段");
            }

            // 欄位都不是空值時才發送給後端
            const keys = [];
            if (date1 === "") {
                keys.push("date");
            }
            if (date1 === "") {
                keys.push("time");
            }
            for (let key in formData) {
                if (formData[key] === "") {
                    keys.push(key);
                }
            }
            if (keys.length === 0 && banContinuous === false) {
                setBanContinuous(true);
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
                });
            }
        }
    };

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
                    setIsOpen(true);
                    setTimeout(() => {
                        setIsOpen(false);
                        navigate("/course/manage", { replace: false });
                    }, 1800);
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
                    setIsOpen(true);
                    setTimeout(() => {
                        setIsOpen(false);
                        navigate("/course/manage", { replace: false });
                    }, 1800);
                }
            });
        }
    }, [monitorFk]);

    const add = (
        <Fragment>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                style={{ overflow: "visible" }}
            >
                <Modal.Body style={{ padding: "0" }}>
                    <ConfirmDeleteBox content={"新增成功"} />
                </Modal.Body>
            </Modal>
            <div className="CourseAdd-container">
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
                            errorLevel={errorLevel}
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
                            errorDate={errorDate}
                            errorTime={errorTime}
                            handleAutoForm={handleAutoForm}
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
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                style={{ overflow: "visible" }}
            >
                <Modal.Body style={{ padding: "0" }}>
                    <ConfirmDeleteBox content={"修改成功"} />
                </Modal.Body>
            </Modal>
            <div className="CourseAdd-container">
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
                            errorLevel={errorLevel}
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
                            errorDate={errorDate}
                            errorTime={errorTime}
                            handleAutoForm={handleAutoForm}
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
