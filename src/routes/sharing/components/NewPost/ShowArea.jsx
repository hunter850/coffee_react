import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { cloneDeep } from "lodash";
import { motion, Reorder } from "framer-motion";
import { MdCancel, MdOutlineAddCircle } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import styles from "./scss/ShowArea.module.scss";

function ShowArea(props) {
    const { blobList, uploadInput, setBlobList } = props;
    const {
        wrap,
        selector,
        img_wrap,
        cancel_btn,
        upload_btn,
        ratio_selector,
        selector_btn,
        selector_btn_seleted,
    } = styles;
    const constraintsRef = useRef(null);
    const [selected, setSelected] = useState(0);
    const [ratioSelect, setRatioSelect] = useState("auto");
    const [onSelect, setOnSelect] = useState(true);

    const cancelPhoto = useCallback(
        (i) => {
            if (i === selected) {
                setSelected(0);
            }
            setBlobList((pre) => {
                const arr = cloneDeep(pre);
                arr.splice(i, 1);
                return arr;
            });
        },
        [selected]
    );

    useEffect(() => {
        //watch ratioSelect改變當下被選照片的ratio
        setBlobList((pre) => {
            const arr = cloneDeep(pre);
            arr[selected].ratio = ratioSelect;
            return arr;
        });
    }, [ratioSelect]);

    useEffect(() => {
        // 換照片把當下照片ratio丟改ratioSelect
        setRatioSelect(blobList[selected].ratio);
    }, [selected]);

    const imgStyle = useMemo(() => {
        const asp_rto = blobList[selected]?.naturalRatio;
        const style = {
            display: "block",
            aspectRatio: blobList[selected]?.ratio,
            objectPosition: "center center",
            objectFit: "cover",
        };

        // 選擇是auto且圖片原始比例<1 || 選擇4/5用高來壓
        if ((ratioSelect === "auto" && asp_rto < 1) || ratioSelect === "4/5") {
            style.height = "100%";
        } else {
            style.width = "100%";
        }
        return style;
    }, [ratioSelect, blobList, selected]);

    const mDivStyle = useMemo(() => {
        const asp_rto = blobList[selected]?.naturalRatio;

        // 選擇是auto且圖片原始比例<1 || 選擇4/5用高來壓
        if ((ratioSelect === "auto" && asp_rto < 1) || ratioSelect === "4/5") {
            return { height: "100%" };
        } else {
            return { width: "100%" };
        }
    }, [ratioSelect, blobList, selected]);

    return (
        <div className={wrap}>
            <motion.div style={mDivStyle} ref={constraintsRef}>
                <motion.img
                    drag
                    dragConstraints={constraintsRef}
                    src={blobList[selected].url}
                    alt=""
                    style={imgStyle}
                />
            </motion.div>
            {onSelect === true && (
                <Reorder.Group
                    values={blobList}
                    onReorder={setBlobList}
                    axis="x"
                    className={selector}
                >
                    {blobList.map((v, i) => {
                        return (
                            <Reorder.Item
                                key={i + v.url}
                                value={v}
                                className={img_wrap}
                                onClick={(e) => {
                                    setSelected(i);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                whileDrag={{ opacity: 0.5 }}
                                style={{
                                    background: `url('${v.url}') no-repeat center /cover`,
                                }}
                            >
                                <MdCancel
                                    fill="white"
                                    size="18px"
                                    className={cancel_btn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        cancelPhoto(i);
                                    }}
                                />
                            </Reorder.Item>
                        );
                    })}

                    <MdOutlineAddCircle
                        onClick={(e) => uploadInput.current.click(e)}
                        className={upload_btn}
                        size="48px"
                        fill="#fff"
                    />
                </Reorder.Group>
            )}

            <div className={onSelect ? selector_btn_seleted : selector_btn}>
                <IoMdPhotos onClick={() => setOnSelect(!onSelect)}>
                    開關
                </IoMdPhotos>
            </div>
            <div className={ratio_selector}>
                <select
                    name=""
                    id=""
                    multiple={false}
                    value={ratioSelect}
                    onChange={(e) => setRatioSelect(e.target.value)}
                >
                    <option value="auto">原始</option>
                    <option value="4/5">4:5</option>
                    <option value="1">1:1</option>
                    <option value="16/9">16:9</option>
                </select>
            </div>
        </div>
    );
}

export default ShowArea;
