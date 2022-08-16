import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MdCancel, MdOutlineAddCircle } from "react-icons/md";
import styles from "./scss/ShowArea.module.scss";

function ShowArea(props) {
    const { blobList, uploadInput, setStep, setBlobList } = props;
    const { wrap, selector, img_wrap, cancel_btn, upload_btn } = styles;
    const constraintsRef = useRef(null);

    const [selected, setSelected] = useState(0);

    const cancelPhoto = useCallback(
        (i) => {
            if (i === selected) {
                setSelected(0);
            }
            setBlobList((pre) => {
                const arr = [...pre];
                arr.splice(i, 1);
                return arr;
            });
        },
        [selected]
    );

    return (
        <div className={wrap}>
            <motion.div
                style={{ width: "100%", height: "100%" }}
                ref={constraintsRef}
            >
                <motion.img
                    drag
                    dragConstraints={constraintsRef}
                    src={blobList[selected]}
                    alt=""
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </motion.div>
            <div className={selector}>
                {blobList.map((v, i) => {
                    return (
                        <div
                            key={i}
                            className={img_wrap}
                            onClick={() => setSelected(i)}
                        >
                            <img src={v} alt="pic" />
                            <MdCancel
                                fill="white"
                                size="18px"
                                className={cancel_btn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    cancelPhoto(i);
                                }}
                            />
                        </div>
                    );
                })}

                <MdOutlineAddCircle
                    onClick={(e) => uploadInput.current.click(e)}
                    className={upload_btn}
                    size="48px"
                    fill="#fff"
                />
            </div>
        </div>
    );
}

export default ShowArea;
