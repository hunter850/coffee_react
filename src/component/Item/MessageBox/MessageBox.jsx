import "./MessageBox.scss";
function MessageBox({ returnBoolean, courseManageDataCopy, sid, isOpen }) {
    const courseName = courseManageDataCopy.filter((v, i) => {
        return sid === v.course_sid;
    });
    return (
        <>
            <div className="MessageBox-body">
                <div className="MessageBox">
                    <div className="MessageBox-title title-font">警告視窗</div>
                    <div className="MessageBox-txt ">
                        {isOpen
                            ? `確定要刪除"${courseName[0].course_name}"嗎?`
                            : ""}
                    </div>
                    <div className="d-flex MessageBox-btn-wrap">
                        <div
                            className="MessageBox-confirm-btn title-font"
                            onClick={() => returnBoolean(true)}
                        >
                            確認
                        </div>
                        <div
                            className="MessageBox-cancel-btn title-font"
                            onClick={() => returnBoolean(false)}
                        >
                            取消
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MessageBox;
