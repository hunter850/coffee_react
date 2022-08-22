import React from "react";

import styles from "./scss/Upload.module.scss";
import ShowArea from "./ShowArea";
import icon_photo from "../../../../images/sharing/icon-photo.png";

function Upload(props) {
    const {
        uploadInput,
        enterHandler,
        overHandler,
        leaveHandler,
        dropHandler,
        onChangeHandler,
        blobList,
        setBlobList,
        setStep,
    } = props;

    const { upload_area, show_area, btn, icon } = styles;
    return (
        <>
            {blobList.length <= 0 ? (
                <div
                    className={upload_area}
                    onDragEnter={(e) => enterHandler(e)}
                    onDragOver={(e) => overHandler(e)}
                    onDragLeave={(e) => leaveHandler(e)}
                    onDrop={(e) => dropHandler(e)}
                >
                    <div>
                        <div>
                            <img src={icon_photo} alt="icon" className={icon} />
                        </div>
                        <p>將相片和影片拖曳到這裡</p>
                        <button
                            className={btn}
                            onClick={() => {
                                uploadInput.current.click();
                            }}
                        >
                            從電腦上傳
                        </button>
                    </div>
                </div>
            ) : (
                <div className={show_area}>
                    <ShowArea
                        blobList={blobList}
                        setBlobList={setBlobList}
                        uploadInput={uploadInput}
                        setStep={setStep}
                    />
                </div>
            )}
            <input
                type="file"
                name="uploadInput"
                multiple
                hidden
                ref={uploadInput}
                onChange={(e) => onChangeHandler(e)}
                accept="image/*"
            />
        </>
    );
}

export default Upload;
