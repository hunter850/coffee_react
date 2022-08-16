import React from "react";

function NewNav(props) {
    const { step, setStep, blobList } = props;
    return (
        <>
            <div>
                {step > 0 && (
                    <span
                        onClick={() => setStep((pre) => pre - 1)}
                        style={{ padding: "0 .75rem" }}
                    >
                        上一步
                    </span>
                )}
            </div>
            <div
                style={{
                    textAlign: "center",
                    color: "black",
                    whiteSpace: "nowrap",
                }}
            >
                <span className="mx-auto">
                    {step === 0 && "建立新分享"}
                    {step === 1 && "編輯相片"}
                    {step === 2 && "發佈分享"}
                </span>
            </div>
            <div style={{ textAlign: "end" }}>
                {step < 2 && blobList.length > 0 && (
                    <span
                        onClick={() => setStep((pre) => pre + 1)}
                        style={{ padding: "0 .75rem" }}
                    >
                        下一步
                    </span>
                )}
            </div>
        </>
    );
}

export default NewNav;
