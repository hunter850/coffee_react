import React from 'react'
import './Btn.css'

export default function Btn({ style }) {
    return (
        <div>
            <button
                className="coffeeBtn"
                style={{
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                    width: style.width,
                }}>
                {style.txt}
            </button>
        </div>
    )
}
