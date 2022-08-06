import "./ConfirmDeleteBox.scss";
function ConfirmDeleteBox({ content = "" }) {
    return (
        <div className="ConfirmDeleteBox-body">
            <div className="ConfirmDeleteBox">
                <div className="ConfirmDeleteBox-wrap">
                    <div className="success-icon-wrap ConfirmDeleteBox-icon">
                        <div className="success-icon">&#10004;</div>
                    </div>
                    <div className="ConfirmDeleteBox-title">{content}</div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteBox;
