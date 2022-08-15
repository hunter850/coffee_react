import cumulativeOffset from "./cumulativeOffset";

function isEnter(node, offsetStart = 0, mode = "DOMPosition") {
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
            cumulativeOffset(node).top + offsetStart - window.innerHeight
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export default isEnter;
