import "./CourseContent.css";
import CourseContentItem from "./CourseContentItem/CourseContentItem";
import CourseComtentObject from "./CourseComtentObject/CourseComtentObject";
import CourseContentMaterial from "./CourseContentMaterial/CourseContentMaterial";
import CourseContentSignup from "./CourseContentSignup/CourseContentSignup";
import CourseContentNotice from "./CourseContentNotice/CourseContentNotice";

function CourseContent({
    courseDataPrice,
    setContentScrollHeight,
    contentScrollHeight,
}) {
    // console.log(contentScrollHeight);
    return (
        <div className="CourseContent">
            <CourseContentItem>課程內容</CourseContentItem>
            <CourseComtentObject
                setContentScrollHeight={setContentScrollHeight}
                contentScrollHeight={contentScrollHeight}
            />
            <CourseContentMaterial />
            <CourseContentSignup courseDataPrice={courseDataPrice} />
            <CourseContentNotice />
        </div>
    );
}

export default CourseContent;
