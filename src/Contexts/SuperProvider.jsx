import React, { useEffect, useState, useContext } from "react";

const BreakContext = React.createContext();
export function useStyleChange() {
    return useContext(BreakContext);
}
function SuperProvider({ children }) {
    const [breakPoint, setBreakPoint] = useState(0);
    // const checkWidth = useCallback(() => {
    //     if (window.innerWidth <= 375) {
    //         setBreakPoint(1);
    //     } else {
    //         setBreakPoint(0);
    //     }
    // }, []);
    useEffect(() => {
        function checkWidth() {
            if (window.innerWidth <= 375) {
                setBreakPoint(1);
            } else {
                setBreakPoint(0);
            }
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);
    return (
        <BreakContext.Provider value={breakPoint}>
            {children}
        </BreakContext.Provider>
    );
}

export default SuperProvider;
