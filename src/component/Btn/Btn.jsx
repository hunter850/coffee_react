import React from 'react'
import './Btn.css'

export default function Btn({ style, children }) {
    return (
        <div>
            <button
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
