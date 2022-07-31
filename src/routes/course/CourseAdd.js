/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState } from "react";
import FakeNav from "../../component/FakeNav";
import Path from "../../component/Item/Path/Path";
import CourseAddList from "../../component/Course/CourseAdd/CourseAddList/CourseAddList";
import CourseAddListDetailed from "../../component/Course/CourseAdd/CourseAddListDetailed/CourseAddListDetailed";
import {
    courseDataAdd,
    courseDataAddFk,
    courseDataGetSid,
    courseDataFkGet,
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

    // 新增資料的請求
    const handleSubmission = (e) => {
        e.preventDefault();
        // console.log(formData);
        // 這裡需要檢查欄位 (還沒做)
        axios({
            method: "post",
            url: courseDataAdd,
            data: formData,
            "content-type": "application/x-www-form-urlencoded",
        }).then((response) => {
            // console.log(response.config.data);
            console.log(response);
            // 確定拿到sid後塞給外鍵的formData
            setFormDataFk({ ...formDataFk, course_sid: response.data });
            setMonitor(true);
        });
    };

    useEffect(() => {
        // console.log(formDataFk.course_sid);
        // 確定有sid後發送外鍵的請求
        if (monitor === true) {
            axios({
                method: "post",
                url: courseDataAddFk,
                data: formDataFk,
                "content-type": "application/x-www-form-urlencoded",
            }).then((response) => {
                // console.log(response.config.data);
                console.log(response);
                setMonitor(false);
            });
        }
    }, [monitor]);

    const add = (
        <Fragment>
            <div style={{ backgroundColor: "#E3E7E7", minWidth: "1440px" }}>
                <FakeNav />
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
                <FakeNav />
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
