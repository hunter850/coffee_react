import { useEffect } from "react";
import useTimeout from "./useTimeout";

const useDebounce = (callback, delay, dependencies) => {
    const [timer, clear] = useTimeout(callback, delay);
    useEffect(timer, [...dependencies, timer]);
    useEffect(clear, [clear]);
};

export default useDebounce;
