import React from 'react'
import './Btn.css'

export default function Btn({ style, children, type = "button" }) {
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
