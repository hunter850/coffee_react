import { useEffect, useState, useMemo, useCallback } from "react";
// import useSetNow from "../../hooks/useSetNow";
import useSetNow from "../../../hooks/useSetNow";
import useScrollbar from "../../../hooks/useScrollbar";
import ModalBody from "./components/ModalBody";
import ModalHeader from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";
import cssStyles from "./modal.module.scss";

function AlertItem({
    children,
    isOpen,
    setIsOpen,
    bordY = -30,
    time = 0.5,
    closeButton = true,
}) {
    const setNow = useSetNow();
    const [hideScrollbar, showScrollbar] = useScrollbar();
    const { modal_bg, modal_bord } = cssStyles;
    const styles = useMemo(() => {
        return {
            bgStyle: {
                display: "none",
                opacity: 0,
                transition: `opacity ${time}s ease`,
            },
            bordStyle: {
                transform: `translateY(${bordY}px)`,
                opacity: 0,
                transition: `
                    transform ${time + 0.2}s ease, opacity ${time + 0.2}s ease
                `,
            },
        };
    }, [bordY, time]);
    const [modalBackground, setModalBackground] = useState(styles.bgStyle);
    const [modalBord, setModalBord] = useState(styles.bordStyle);
    // const closeHandler = useCallback(() => {
    //     setIsOpen(false);
    // }, [setIsOpen]);
    useEffect(() => {
        if (isOpen) {
            hideScrollbar();
            setModalBackground((pre) => ({ ...pre, display: "flex" }));
            setNow(() => {
                setModalBackground((pre) => ({ ...pre, opacity: 1 }));
                setModalBord((pre) => ({
                    ...pre,
                    transform: "translateY(0px)",
                    opacity: 1,
                }));
            });
        } else {
            showScrollbar();
            setModalBackground((pre) => ({
                ...pre,
                display: "none",
                opacity: 0,
            }));
            setModalBord((pre) => ({
                ...pre,
                transform: `translateY(${bordY}px)`,
                opacity: 0,
            }));
        }
    }, [isOpen, bordY, setNow, hideScrollbar, showScrollbar]);
    return (
        <div
            style={modalBackground}
            // onClick={closeHandler}
            className={modal_bg}
        >
            <div
                style={modalBord}
                onClick={(e) => e.stopPropagation()}
                className={modal_bord}
            >
                {children}
            </div>
        </div>
    );
}

export default Object.assign(AlertItem, {
    Body: ModalBody,
    Header: ModalHeader,
    Footer: ModalFooter,
});
