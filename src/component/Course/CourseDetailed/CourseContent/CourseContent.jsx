import "./CourseContent.css";
import CourseContentItem from "./CourseContentItem/CourseContentItem";
import CourseComtentObject from "./CourseComtentObject/CourseComtentObject";
import CourseContentMaterial from "./CourseContentMaterial/CourseContentMaterial";
import CourseContentSignup from "./CourseContentSignup/CourseContentSignup";
import CourseContentNotice from "./CourseContentNotice/CourseContentNotice";

function CourseContent() {
    return (
        <div className="CourseContent">
            <CourseContentItem>課程內容</CourseContentItem>
            <CourseComtentObject />
            <CourseContentMaterial />
            <CourseContentSignup />
            <CourseContentNotice />
        </div>
    );
}

export default CourseContent;
