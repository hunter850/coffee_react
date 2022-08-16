import { useEffect, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import ElementWrap from "./ElementWrap";

function SpinnerWrap(props) {
    const { children, component = null, time = 2000 } = props;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, time);
    }, [time]);
    return (
        <ElementWrap component={component}>
            {loading ? (
                <>
                    <NavBar />
                    <div className="storeLoadingBox">
                        <div className="StoreLoading">
                            <div className="StoreLoadingWrap00">
                                <img
                                    src={"/spinner/0Bicon.png"}
                                    alt=""
                                    className="animateStore popStore"
                                    style={{ animationDuration: `${time}ms` }}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                children
            )}
        </ElementWrap>
    );
}

export default SpinnerWrap;
