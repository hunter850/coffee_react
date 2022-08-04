import SuperProvider from "./SuperProvider";
import StateProvider from "./StateProvider";
import ScrollTop from "./ScrollTop";
import CartCountProvider from "./CartCountProvider";
import NavProvider from "./NavProvider";

function AllProvider(props) {
    const { children } = props;
    return (
        <NavProvider>
            <StateProvider>
                <SuperProvider>
                    <ScrollTop>
                        <CartCountProvider>{children}</CartCountProvider>
                    </ScrollTop>
                </SuperProvider>
            </StateProvider>
        </NavProvider>
    );
}

export default AllProvider;
