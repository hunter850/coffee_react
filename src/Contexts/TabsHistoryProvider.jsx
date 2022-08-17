import React, { useContext, useState, useMemo } from "react";
import { useCallback } from "react";
const TabsHistory = React.createContext([]);

export function useTabsHistory() {
    return useContext(TabsHistory);
}

function TabsHistoryProvider({ children }) {
    const [tabsHistory, setTabsHistory] = useState(["home"]);

    const tabLast = useMemo(() => {
        const length = tabsHistory.length;
        console.log("last", tabsHistory);
        return tabsHistory[length - 2];
    }, [tabsHistory]);

    const tabNow = useMemo(() => {
        const last = tabsHistory.pop();
        return last;
    }, [tabsHistory]);

    // console.log("context", tabsHistory);
    const tabPush = useCallback(
        (v) => {
            setTabsHistory((pre) => {
                // 比對Array last value重複push
                if (pre.at(-1) === v) {
                    return pre;
                } else {
                    // pre.push(v);
                    console.log(pre);
                    return [...pre, v];
                }
            });
        },
        [tabsHistory]
    );

    return (
        <>
            <TabsHistory.Provider
                value={{
                    tabsHistory,
                    tabNow,
                    tabLast,
                    setTabsHistory,
                    tabPush,
                }}
            >
                {children}
            </TabsHistory.Provider>
        </>
    );
}

export default TabsHistoryProvider;
