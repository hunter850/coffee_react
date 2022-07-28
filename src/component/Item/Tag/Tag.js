import "./Tag.scss";

function Tag({ tagContext = "標籤", tagBgc = "#ccc", tagPaddingX = "10px" }) {
    return (
        <div className="tagComponent" style={{ backgroundColor: tagBgc }}>
            <p
                className="tagP"
                style={{ paddingLeft: tagPaddingX, paddingRight: tagPaddingX }}
            >
                {tagContext}
            </p>
        </div>
    );
}

export default Tag;
