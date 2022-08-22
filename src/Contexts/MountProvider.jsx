import React, { useRef, useContext } from "react";

const MountContext = React.createContext();
export function useMount() {
    return useContext(MountContext);
}

function MountProvider(props) {
    const mountRef = useRef(false);
    const { children } = props;
    return (
        <MountContext.Provider value={mountRef}>
            {children}
        </MountContext.Provider>
    );
}

export default MountProvider;
