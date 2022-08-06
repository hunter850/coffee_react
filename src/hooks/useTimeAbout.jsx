import { useCallback } from "react";

function useTimeAbout() {
    return useCallback((timeString = "") => {
        const now = Date.now();
        const inputTime = Date.parse(timeString);
        if (isNaN(inputTime)) return;

        const timeDiff = now - inputTime;
        let aboutTime = "";
        switch (true) {
            case timeDiff < 60000: {
                aboutTime = "剛剛";
                break;
            }
            case timeDiff < 60000 * 60: {
                aboutTime = Math.floor(timeDiff / 1000 / 60) + "分鐘前";
                break;
            }
            case timeDiff < 60000 * 60 * 24: {
                aboutTime = Math.floor(timeDiff / 1000 / 60 / 60) + "小時前";
                break;
            }
            case timeDiff < 60000 * 60 * 24 * 30: {
                aboutTime = Math.floor(timeDiff / 1000 / 60 / 60 / 24) + "天前";
                break;
            }
            case timeDiff < 60000 * 60 * 24 * 30 * 12: {
                aboutTime =
                    Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 30) + "個月前";
                break;
            }
            default:
                aboutTime = timeString.slice(0, 10);
                break;
        }
        return aboutTime;
    }, []);
}

export default useTimeAbout;
