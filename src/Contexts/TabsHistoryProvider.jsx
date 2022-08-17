import React, { useContext, useState, useMemo } from "react";
import { useCallback } from "react";
const TabsHistory = React.createContext();

export function useTabsHistory() {
    return useContext(TabsHistory);
}

function TabsHistoryProvider({ children }) {
    const [tabs, setTabs] = useState(["home"]);
    const nowTabs = useMemo(() => tabs.at(-1), [tabs]);
    const lastTabs = useMemo(() => tabs.at(-2), [tabs]);

    const pushTabs = useCallback(
        (v) => {
            setTabs((pre) => {
                if (pre.at(-1) === v) {
                    return pre;
                } else {
                    return [...pre, v];
                }
            });
        },
        [tabs]
    );

    return (
        <>
            <TabsHistory.Provider
                value={{
                    tabs,
                    setTabs,
                    nowTabs,
                    lastTabs,
                    pushTabs,
                }}
            >
                {children}
            </TabsHistory.Provider>
        </>
    );
}

export default TabsHistoryProvider;
