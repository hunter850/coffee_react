import { Fragment, useState } from "react";
import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import CourseAddList from "../../component/Course/CourseAdd/CourseAddList/CourseAddList";
import CourseAddListDetailed from "../../component/Course/CourseAdd/CourseAddListDetailed/CourseAddListDetailed";
const CourseAdd = () => {
    // 選擇的檔案
    const [selectedFile, setSelectedFile] = useState(null);
    // 是否有檔案被挑選
    const [isFilePicked, setIsFilePicked] = useState(false);
    // 預覽圖片
    const [preview, setPreview] = useState("");
    // 要發給資料庫的照片檔名
    const [imgName, setImgName] = useState("");
    console.log("要給資料庫的檔名: " + imgName);

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
        course_img_l: "",
    });
    const el = (
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
                        />
                        <CourseAddListDetailed
                            formData={formData}
                            setFormData={setFormData}
                            formDataFk={formDataFk}
                            setFormDataFk={setFormDataFk}
                        />
                        <div
                            className="d-flex f-jcc"
                            style={{ paddingTop: 33, paddingBottom: 86 }}
                        >
                            <div style={{ paddingRight: 12 }}>
                                <button className="CourseAdd-grey">
                                    確定送出
                                </button>
                            </div>
                            <div>
                                <button className="CourseAdd-red">
                                    取消操作
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );

    return el;
};

export default CourseAdd;
