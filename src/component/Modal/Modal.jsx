import { useEffect, useState } from "react"

const Modal = ({ children, isOpen, setIsOpen }) => {

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
        transition: "opacity .5s ease",
    }

    const bordStyle = {
        backgroundColor: "#fff",
        padding: "24px 36px",
        borderRadius: "10px",
        position: "relative",
        transform: "translateY(-30px)",
        opacity: 0,
        transition: "transform .7s ease, opacity .7s ease"
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
            setTimeout(() => {
                setModalBackground(pre => ({ ...pre, opacity: 1 }));
                setModalBord(pre => ({ ...pre, transform: "translateY(0px)", opacity: 1 }))
            }, 0);
        } else {
            setModalBackground(pre => ({ ...pre, display: "none", opacity: 0 }));
            setModalBord(pre => ({ ...pre, transform: "translateY(-30px)", opacity: 0 }));
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