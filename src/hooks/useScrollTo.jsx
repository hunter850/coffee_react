const useScrollTo = () => {
    return function(position) {
        window.scroll({
            top: position, 
            behavior: 'smooth' 
          });
    }
}

export default useScrollTo