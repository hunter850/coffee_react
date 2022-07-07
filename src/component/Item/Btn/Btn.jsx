import React, { useMemo } from 'react'
import './Btn.css'

const defaultButtonStyle = {
    backgroundColor: '#253945',
    color: '#fff',
}

export default function Btn({
    style = defaultButtonStyle,
    children,
    type = 'button',
    width = '120px',
    backgroundColor = '#253945',
    color = '#fff',
}) {
    const buttonStyle = useMemo(() => {
        return { ...style, width, backgroundColor, color }
    }, [width, backgroundColor, color, style])

    return (
        <div>
            <button type={type} className="coffeeBtn" style={buttonStyle}>
                {children}
            </button>
        </div>
    )
}
