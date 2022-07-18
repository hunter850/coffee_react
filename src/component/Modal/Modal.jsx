import { useEffect, useState, useMemo, useCallback } from "react";
import useSetNow from "../../hooks/useSetNow";
import useScrollbar from "../../hooks/useScrollbar";
import ModalBody from "./components/ModalBody";
import ModalHeader from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";
import "./modal.css";

function Modal({
    children,
    isOpen,
    setIsOpen,
    bordY = -30,
    time = 0.5,
    closeButton = true,
}) {
    const setNow = useSetNow();
    const [hideScrollbar, showScrollbar] = useScrollbar();
    const styles = useMemo(() => {
        return {
            bgStyle: {
                position: "fixed",
                top: "0px",
                left: "0px",
                width: "100vw",
                height: "100vh",
                backgroundColor: "#0009",
                display: "none",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0,
                transition: `opacity ${time}s ease`,
                zIndex: "1000",
            },
            bordStyle: {
                maxWidth: "95%",
                maxHeight: "calc(90vh - 60px)",
                overflow: "hidden",
                backgroundColor: "#fff",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                transform: `translateY(${bordY}px)`,
                opacity: 0,
                transition: `
                    transform ${time + 0.2}s ease, opacity ${time + 0.2}s ease
                `,
            },
        };
    }, [bordY, time]);
    const staticStyles = useMemo(() => {
        return {
            button: {
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                position: "absolute",
                right: "0px",
                top: "0px",
            },
        };
    }, []);
    const [modalBackground, setModalBackground] = useState(styles.bgStyle);
    const [modalBord, setModalBord] = useState(styles.bordStyle);
    const closeHandler = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);
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
        <div style={modalBackground} onClick={closeHandler}>
            <div style={modalBord} onClick={(e) => e.stopPropagation()}>
                {closeButton && (
                    <button style={staticStyles.button} onClick={closeHandler}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.6569 0.343378C11.8444 0.530914 11.9497 0.785269 11.9497 1.05049C11.9497 1.3157 11.8444 1.57005 11.6569 1.75759L7.41421 6.00023L11.6569 10.2429C11.8444 10.4304 11.9497 10.6848 11.9497 10.95C11.9497 11.2152 11.8444 11.4695 11.6569 11.6571C11.4693 11.8446 11.215 11.95 10.9497 11.95C10.6845 11.95 10.4302 11.8446 10.2426 11.6571L6 7.41445L1.75736 11.6571C1.56982 11.8446 1.31547 11.95 1.05025 11.95C0.785036 11.95 0.530682 11.8446 0.343146 11.6571C0.155609 11.4695 0.0502522 11.2152 0.0502522 10.95C0.0502522 10.6848 0.155609 10.4304 0.343146 10.2429L4.58579 6.00023L0.343146 1.75759C0.155609 1.57005 0.0502522 1.3157 0.0502522 1.05049C0.0502522 0.785269 0.155609 0.530914 0.343146 0.343378C0.530682 0.155841 0.785036 0.0504846 1.05025 0.0504846C1.31547 0.0504846 1.56982 0.155841 1.75736 0.343378L6 4.58602L10.2426 0.343378C10.4302 0.155841 10.6845 0.0504846 10.9497 0.0504846C11.215 0.0504846 11.4693 0.155841 11.6569 0.343378V0.343378Z"
                                fill="#324A59"
                            />
                        </svg>
                    </button>
                )}
                {children}
            </div>
        </div>
    );
}

export default Object.assign(Modal, {
    Body: ModalBody,
    Header: ModalHeader,
    Footer: ModalFooter,
});
