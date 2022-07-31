import "./MessageBox.scss";
function MessageBox() {
    return (
        <>
            <div className="MessageBox">
                <div className="MessageBox-title">警告視窗</div>
                <div className="MessageBox-txt">
                    確定要刪除xxx嗎?真的確定嗎?要不要再考慮一下?真的要這樣?
                </div>
                <div className="d-flex MessageBox-btn-wrap">
                    <div className="MessageBox-confirm-btn">確認</div>
                    <div className="MessageBox-cancel-btn">取消</div>
                </div>
            </div>
        </>
    );
}

export default MessageBox;
