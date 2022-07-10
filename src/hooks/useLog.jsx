import { useEffect } from "react";

const useLog = (...value) => {
    useEffect(() => {
        console.log(...value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, value);
};

export default useLog;
