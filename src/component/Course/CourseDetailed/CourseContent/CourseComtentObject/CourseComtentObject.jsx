import "./CourseComtentObject.css";

function CourseComtentObject () {
    return (
        <div>
            <div className="CourseContentItem" style={{ marginTop: 30 }}>
                <div
                    className="d-flex f-aic"
                    style={{ justifyContent: "space-between" }}
                >
                    <div className="d-flex CourseContent-title">
                        <svg
                            width="22"
                            height="26"
                            viewBox="0 0 22 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.59234 3.52632H1V7H20.998V3.52632H18.4057V1H3.59234V2.89474V3.52632ZM3.59234 3.52632H14.332H16.554"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.51465 7.3335L3.72665 25.0002H18.2707L19.0787 7.3335"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.91895 12H18.675"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.32324 19.3335H18.2713"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <div style={{ paddingLeft: 17 }}>適合對象</div>
                    </div>
                </div>
                <div className="CourseContent-text">
                    適合年滿12歲以上對拉花有興趣的各位!
                    如未滿18歲則需家長陪同參加
                </div>
            </div>
        </div>
    );
}

export default CourseComtentObject;
