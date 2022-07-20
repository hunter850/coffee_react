import "./CourseContent.css";
import CourseContentItem from "./CourseContentItem/CourseContentItem";
import CourseComtentObject from "./CourseComtentObject/CourseComtentObject";
import CourseContentMaterial from "./CourseContentMaterial/CourseContentMaterial";
import CourseContentSignup from "./CourseContentSignup/CourseContentSignup";
import CourseContentNotice from "./CourseContentNotice/CourseContentNotice";

function CourseContent({ courseDataPrice }) {
    return (
        <div className="CourseContent">
            <CourseContentItem>課程內容</CourseContentItem>
            <CourseComtentObject />
            <CourseContentMaterial />
            <CourseContentSignup courseDataPrice={courseDataPrice} />
            <CourseContentNotice />
        </div>
    );
}

export default CourseContent;
