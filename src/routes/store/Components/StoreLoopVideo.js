import React from "react";

export const StoreLoopVideo = (props) => {
    const { src, id, muted, autoplay, ratio, loop } = props;
    let mutedParam = "";
    if (muted) {
        mutedParam = "muted";
    }
    let autoplayParam = "";
    if (autoplay) {
        autoplayParam = "autoplay";
    }
    let loopParam = "";
    if (loop) {
        loopParam = "loop";
    }
    return (
        <div
            className={`videoContainer ratio-${ratio}`}
            dangerouslySetInnerHTML={{
                __html: `
            <video
                ${mutedParam}
                ${autoplayParam}
                ${loopParam}           
                playsinline
                src="${src}"   
                id="${id}"
            />`,
            }}
        />
    );
};
