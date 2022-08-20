import { useCallback } from "react";

const useSetNow = () => {
    return useCallback((fn) => {
        return fn
            ? new Promise((resolve) => {
                  let start;
                  (function step(timestamp) {
                      if (!start) {
                          start = timestamp;
                          window.requestAnimationFrame(step);
                          return;
                      }
                      resolve();
                  })();
              }).then(this ? fn.bind(this) : fn)
            : Promise.resolve();
    }, []);
};

export default useSetNow;
