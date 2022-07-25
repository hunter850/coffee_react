import "./CourseContent.css";
import CourseContentItem from "./CourseContentItem/CourseContentItem";
import CourseComtentObject from "./CourseComtentObject/CourseComtentObject";
import CourseContentMaterial from "./CourseContentMaterial/CourseContentMaterial";
import CourseContentSignup from "./CourseContentSignup/CourseContentSignup";
import CourseContentNotice from "./CourseContentNotice/CourseContentNotice";

function CourseContent({
    courseDataPrice,
    object,
    materia,
    signup,
    notice,
    setObject,
    setMaterial,
    setSignup,
    setNotice,
    setItem,
    item,
    topZeroSure,
    setCount,
    count,
    sendOrder,
}) {
    return (
        <div className="CourseContent">
            <CourseContentItem setItem={setItem} item={item}>
                課程內容
            </CourseContentItem>
            <CourseContentMaterial
                materia={materia}
                setMaterial={setMaterial}
                topZeroSure={topZeroSure}
            />
            <CourseContentSignup
                courseDataPrice={courseDataPrice}
                signup={signup}
                setSignup={setSignup}
                topZeroSure={topZeroSure}
                setCount={setCount}
                count={count}
                sendOrder={sendOrder}
            />
            <CourseContentNotice
                notice={notice}
                setNotice={setNotice}
                topZeroSure={topZeroSure}
            />
            <CourseComtentObject
                object={object}
                setObject={setObject}
                topZeroSure={topZeroSure}
            />
        </div>
    );
}

export default CourseContent;
