import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./css/NewPost.module.scss";

import EditPhoto from "./components/NewPost/EditPhoto";
import CancelBtn from "./components/CancelBtn";
import NewNav from "./components/NewPost/NewNav";
import Upload from "./components/NewPost/Upload";

function NewPost({ post_sid, setTabs, windowScrollY = 0 }) {
    const { wrap, new_post, nav } = styles;
    const uploadInput = useRef(null);
    const [step, setStep] = useState(0);
    const [nameList, setNameList] = useState([]);
    const [blobList, setBlobList] = useState([]);

    const goPrev = () => {
        setTabs("home");
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
                setNameList((pre) => {
                    return [...pre, f.name];
                });
                setBlobList((pre) => {
                    return [...pre, blobURL];
                });
            }
        }
    };

    return (
        <div className={wrap} style={{ top: windowScrollY }}>
            <div className={new_post}>
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
                    />
                )}
                {step === 1 && <EditPhoto blobList={blobList} />}
            </div>

            <CancelBtn goPrev={goPrev} />
        </div>
    );
}

export default NewPost;
