import React from 'react'
import './Btn.css'

const defaultButtonStyle = {
    backgroundColor: "#253945",
    color: "#fff",
    width: "120px"
}

export default function Btn({ style = defaultButtonStyle, children, type = "button" }) {
    return (
        <div>
            <button
                type={type}
                className="coffeeBtn"
                style={{
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                    width: style.width,
                }}>
                {children}
            </button>
        </div>
    )
}
