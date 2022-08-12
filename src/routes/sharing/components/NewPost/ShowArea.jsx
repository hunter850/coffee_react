import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./css/ShowArea.module.scss";

function ShowArea(props) {
    const { blobList, selector } = props;
    const { wrap } = styles;
    const constraintsRef = useRef(null);

    const [selected, setSelected] = useState(0);

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
                1234
                {blobList.map((v, i) => {
                    return;
                })}
            </div>
        </div>
    );
}

export default ShowArea;
