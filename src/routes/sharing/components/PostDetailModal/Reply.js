import React from "react";

function Reply({ data }) {
    const { member_sid, nickname, content } = data;
    return (
        <div style={{ marginLeft: "3rem" }}>
            <span>{nickname}</span>
            <span> {content}</span>
        </div>
    );
}

export default Reply;
