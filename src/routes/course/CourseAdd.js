import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import CourseAddList from "../../component/Course/CourseAdd/CourseAddList/CourseAddList";
import CourseAddListDetailed from "../../component/Course/CourseAdd/CourseAddListDetailed/CourseAddListDetailed";
const CourseAdd = () => {
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
                    <CourseAddList />
                    <CourseAddListDetailed />
                    <div
                        className="d-flex f-jcc"
                        style={{ paddingTop: 33, paddingBottom: 86 }}
                    >
                        <div style={{ paddingRight: 12 }}>
                            <button className="CourseAdd-grey">確定送出</button>
                        </div>
                        <div>
                            <button className="CourseAdd-red">取消操作</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );

    return el;
};

export default CourseAdd;
