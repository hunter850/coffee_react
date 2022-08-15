function cumulativeOffset(node) {
    const output = {
        top: 0,
        left: 0,
    };
    do {
        output.top += node.offsetTop || 0;
        output.left += node.offsetLeft || 0;
        node = node.offsetParent;
    } while (node);

    return output;
}

export default cumulativeOffset;
