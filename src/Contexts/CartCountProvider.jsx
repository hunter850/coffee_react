import React, { Fragment, useContext, useState } from "react";
import CartCount from "./CartCount";

export function useCartCount() {
    return useContext(CartCount);
}

function CartCountProvider({ children }) {
    const [cartCountNum, setCartCountNum] = useState(0);

    return (
        <>
            <CartCount.Provider value={{ cartCountNum, setCartCountNum }}>
                {children}
            </CartCount.Provider>
        </>
    );
}

export default CartCountProvider;
