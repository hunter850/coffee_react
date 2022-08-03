import "./Tag.scss";

function Tag({
    tagContext = "標籤",
    tagBgc = "#ccc",
    tagPaddingX = "10px",
    divClassName = "",
    pClassName = "",
}) {
    return (
        <div
            className={`tagComponent ${divClassName}`}
            style={{ backgroundColor: tagBgc }}
        >
            <p
                className={`tagP ${pClassName}`}
                style={{ paddingLeft: tagPaddingX, paddingRight: tagPaddingX }}
            >
                {tagContext}
            </p>
        </div>
    );
}

export default Tag;
