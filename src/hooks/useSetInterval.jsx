import { useRef, useCallback, useEffect } from "react";
import useSetTimeout from "./useSetTimeout";

const useSetInterval = () => {
    const canRunRef = useRef(true);
    const [timeout, stopTimeout] = useSetTimeout();
    useEffect(() => {
        return () => {
            canRunRef.current = false;
            stopTimeout();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [
        useCallback((callback, tick) => {
            canRunRef.current = true;
            (function loop() {
                if (canRunRef.current) {
                    timeout(() => {
                        callback();
                        loop();
                    }, tick);
                }
            })();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
        () => {
            canRunRef.current = false;
            stopTimeout();
        },
    ];
};

export default useSetInterval;
