const useToggleScroll = () => {
    return function () {
        if (getComputedStyle(document.body).overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    };
};

export default useToggleScroll;
