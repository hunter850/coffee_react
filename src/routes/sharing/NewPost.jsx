import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./scss/NewPost.module.scss";

import { debounce } from "lodash";
import { useAuth } from "../../component/Member/AuthContextProvider";
import { useTabsHistory } from "../../Contexts/TabsHistoryProvider";
import { newPostAPI } from "../../config/api-path";
import EditPhoto from "./components/NewPost/EditPhoto";
import CancelBtn from "./components/CancelBtn";
import NewNav from "./components/NewPost/NewNav";
import Upload from "./components/NewPost/Upload";

function NewPost({ windowScrollY = 0 }) {
    const { token } = useAuth();
    const { wrap, new_post, nav, new_edit } = styles;
    const { lastTabs, pushTabs } = useTabsHistory();

    const cvsRefArr = useRef([]);
    const cvsRef = useRef(null);
    const uploadInput = useRef(null);

    const [step, setStep] = useState(0);
    const [rawBlob, setRawBlob] = useState([]);
    const [nameList, setNameList] = useState([]);
    const [blobList, setBlobList] = useState([]);
    const [photoSize, setPhotoSize] = useState([]);

    const goPrev = () => {
        pushTabs(lastTabs);
        window.history.pushState({}, null, `/sharing/`);
    };

    const enterHandler = (e) => {
        e.currentTarget.style.backgroundColor = "orange";
    };
    const overHandler = (e) => {
        e.preventDefault();
    };
    const leaveHandler = (e) => {
        e.currentTarget.style.backgroundColor = "#fff";
    };
    const dropHandler = (e) => {
        e.currentTarget.style.backgroundColor = "#fff";
        e.preventDefault();
        const f = e.dataTransfer.files[0];

        if (f.type !== "image/png" && f.type !== "image/jpeg") {
            alert("格式不符合");
            return;
        }

        const blobURL = window.URL.createObjectURL(f);

        setRawBlob((pre) => {
            return [...pre, blobURL];
        });

        setNameList((pre) => {
            return [...pre, f.name];
        });
        setBlobList((pre) => {
            return [...pre, blobURL];
        });
    };

    const onChangeHandler = (e) => {
        const length = e.target.files.length;
        if (length > 0) {
            console.log(e.target.files);
            for (let i = 0; i < length; i++) {
                const f = e.target.files[i];

                const blobURL = window.URL.createObjectURL(f);
                setRawBlob((pre) => {
                    return [...pre, blobURL];
                });
                setNameList((pre) => {
                    return [...pre, f.name];
                });
                setBlobList((pre) => {
                    return [...pre, blobURL];
                });
            }
        }
    };

    useEffect(() => {
        return () => {
            rawBlob.forEach((v) => {
                URL.revokeObjectURL(v);
            });
        };
    }, []);

    const handleSubmit = debounce(async (e) => {
        console.log("submit");
        const fd = new FormData(e.target);

        let url = [];
        if (blobList.length === 1) {
            url[0] = cvsRef.current.toDataURL("image/png");
        } else {
            url = cvsRefArr.current.map((v) => v.toDataURL("image/png"));
        }

        const dataURLtoFile = (dataurl, filename) => {
            //將base64轉換為文件
            let uint8 = getUint8Arr(dataurl);
            return new File([uint8.u8arr], filename, { type: uint8.mime });
        };
        const getUint8Arr = (dataurl) => {
            // 截取base64的數據
            let arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = window.atob(arr[1]),
                // 獲取解碼後的二進制數據的長度，用於後面創建二進制數據容器
                n = bstr.length,
                // new Uint8Array
                u8arr = new Uint8Array(n);
            // Binary data存入Uint8Array
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return { u8arr, mime };
        };

        url.forEach((v, i) => {
            fd.append("photos", dataURLtoFile(v, "photo" + i));
        });

        const r = await axios({
            method: "post",
            url: newPostAPI,
            data: fd,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(r.status);
        if (r.status === 200) goPrev();
    }, 150);

    return (
        <div className={wrap} style={{ top: windowScrollY }}>
            <div className={step >= 1 ? new_edit : new_post}>
                <nav className={nav}>
                    <NewNav step={step} setStep={setStep} blobList={blobList} />
                </nav>

                {step === 0 && (
                    <Upload
                        uploadInput={uploadInput}
                        enterHandler={enterHandler}
                        overHandler={overHandler}
                        leaveHandler={leaveHandler}
                        dropHandler={dropHandler}
                        onChangeHandler={onChangeHandler}
                        nameList={nameList}
                        blobList={blobList}
                        setBlobList={setBlobList}
                        setStep={setStep}
                        photoSize={photoSize}
                        setPhotoSize={setPhotoSize}
                    />
                )}
                {step > 0 && (
                    <EditPhoto
                        blobList={blobList}
                        step={step}
                        handleSubmit={handleSubmit}
                        cvsRef={cvsRef}
                        cvsRefArr={cvsRefArr}
                    />
                )}
            </div>

            <CancelBtn goPrev={goPrev} />
        </div>
    );
}

export default NewPost;
