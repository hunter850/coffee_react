import { useEffect, useState } from "react"
import useSetNow from "../hooks/useSetNow"

const Modal = ({ children, isOpen, setIsOpen, bordPadding = "24px 36px", bordY = -30, time = 0.5}) => {

    const setNow = useSetNow();

    const bgStyle = {
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
    }

    const bordStyle = {
        backgroundColor: "#fff",
        padding: bordPadding,
        borderRadius: "10px",
        position: "relative",
        transform: `translateY(${bordY}px)`,
        opacity: 0,
        transition: `transform ${time + 0.2}s ease, opacity ${time + 0.2}s ease`
    }

    const buttonStyle = {
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        width: "36px",
        height: "36px",
        cursor: "pointer",
        position: "absolute",
        right: "0px",
        top: "0px"
    }

    const [modalBackground, setModalBackground] = useState(bgStyle);
    const [modalBord, setModalBord] = useState(bordStyle)

    const closeHandler = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            setModalBackground(pre => ({ ...pre, display: "flex" }));
            setNow(() => {
                setModalBackground(pre => ({ ...pre, opacity: 1 }));
                setModalBord(pre => ({ ...pre, transform: "translateY(0px)", opacity: 1 }))
            });
        } else {
            setModalBackground(pre => ({ ...pre, display: "none", opacity: 0 }));
            setModalBord(pre => ({ ...pre, transform: `translateY(${bordY}px)`, opacity: 0 }));
        }
    }, [isOpen]);

    const el = (
        <div style={modalBackground} onClick={closeHandler}>
            <div style={modalBord} onClick={e => e.stopPropagation()}>
                <button style={buttonStyle} onClick={closeHandler}>X</button>
                {children}
            </div>
        </div>
    )

    return el;
}

export default Modal