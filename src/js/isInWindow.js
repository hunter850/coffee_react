import cumulativeOffset from "./cumulativeOffset";

function isInWindow(
    node,
    offsetStart = 0,
    offsetEnd = 0,
    mode = "DOMPosition"
) {
    const offset_top =
        node.offsetTop === 0 ? cumulativeOffset(node).top : node.offsetTop;
    if (mode === "renderPosition") {
        if (
            node.getBoundingClientRect().top -
                window.innerHeight +
                offsetStart <=
                0 &&
            node.getBoundingClientRect().bottom + offsetEnd <= 0
        ) {
            return true;
        } else {
            return false;
        }
    } else {
        if (
            window.pageYOffset >=
                offset_top + offsetStart - window.innerHeight &&
            window.pageYOffset <=
                node.getBoundingClientRect().height + offset_top + offsetEnd
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export default isInWindow;
