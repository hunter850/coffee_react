import { useState } from "react";

function PointsToCouponItem() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                兌換優惠券張數:
                <button
                    onClick={() => {
                        setCount(count - 1);
                    }}
                    className="PointsToCouponbtn"
                >
                    -
                </button>
                <span>{count < 0 ? 0 : count}</span>
                <button
                    onClick={() => {
                        setCount(count + 1);
                    }}
                    className="PointsToCouponbtn"
                >
                    +
                </button>
            </div>
        </>
    );
}

export default PointsToCouponItem;
