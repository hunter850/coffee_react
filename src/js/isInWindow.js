function isInWindow(
    node,
    offsetStart = 0,
    offsetEnd = 0,
    mode = "DOMPosition"
) {
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
                node.offsetTop + offsetStart - window.innerHeight &&
            window.pageYOffset <=
                node.getBoundingClientRect().height + node.offsetTop + offsetEnd
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export default isInWindow;
