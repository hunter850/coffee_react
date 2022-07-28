import CartProvider from "./contexts/cartContext/CartProvider";
import Cart from "./Cart";

function CartContextWrap() {
    return (
        <CartProvider>
            <Cart />
        </CartProvider>
    );
}

export default CartContextWrap;
