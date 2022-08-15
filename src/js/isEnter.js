import cumulativeOffset from "./cumulativeOffset";

function isEnter(node, offsetStart = 0, mode = "DOMPosition") {
    const offset_top =
        node.offsetTop === 0 ? cumulativeOffset(node).top : node.offsetTop;
    if (mode === "renderPosition") {
        if (
            node.getBoundingClientRect().top -
                window.innerHeight +
                offsetStart <=
            0
        ) {
            return true;
        } else {
            return false;
        }
    } else {
        if (
            window.pageYOffset >=
            offset_top + offsetStart - window.innerHeight
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export default isEnter;
