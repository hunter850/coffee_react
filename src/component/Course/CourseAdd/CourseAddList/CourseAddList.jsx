import "./CourseAddList.css";
import Btn from "../../../Item/Btn/Btn";
function CourseAddList() {
    return (
        <div className="CourseAddList">
            <div className="d-flex CourseAddList-wrap">
                <div style={{ paddingRight: 63 }}>
                    <p>標題圖片 :</p>
                    <div className="CourseAddList-img"></div>
                    <Btn
                        backgroundColor={"#6E7B83"}
                        color={"#fff"}
                        width={"245px"}
                    >
                        上傳圖片
                    </Btn>
                </div>
                <div>
                    <div>
                        <p>課程名稱 :</p>
                        <input
                            type="text"
                            placeholder="限制11字"
                            className="coursenameinp"
                        />
                    </div>
                    <div>
                        <p>課程價格 :</p>
                        <div className="d-flex">
                            <input type="text" className="coursepriceinp" />
                            <p style={{ color: "#3E3E3E", paddingLeft: 20 }}>
                                NT$/ 人
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>課程難度 :</p>
                        <select className="courselevelinp">
                            <option>選擇課程難度</option>
                            <option>初級</option>
                            <option>中級</option>
                            <option>高級</option>
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
