const useScrollTo = () => {
    return function (position) {
        window.scrollTo({
            top: position,
            behavior: "smooth",
        });
    };
};

export default useScrollTo;
