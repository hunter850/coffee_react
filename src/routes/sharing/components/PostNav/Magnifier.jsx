function Magnifier({ color = "#70757a" }) {
    return (
        <>
            <svg
                width="20"
                height="20"
                viewBox="0 0 32 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_1908_2814)">
                    <circle
                        cx="13.375"
                        cy="13.375"
                        r="8.375"
                        stroke={color}
                        strokeWidth="2"
                    ></circle>
                    <line
                        x1="20.4142"
                        y1="20.5"
                        x2="25"
                        y2="25.0858"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    ></line>
                </g>
                <defs>
                    <filter
                        id="filter0_d_1908_2814"
                        x="0"
                        y="0"
                        width="32"
                        height="32"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                        ></feFlood>
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset dx="1" dy="1"></feOffset>
                        <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
                        <feComposite
                            in2="hardAlpha"
                            operator="out"
                        ></feComposite>
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        ></feColorMatrix>
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1908_2814"
                        ></feBlend>
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1908_2814"
                            result="shape"
                        ></feBlend>
                    </filter>
                </defs>
            </svg>
        </>
    );
}

export default Magnifier;
