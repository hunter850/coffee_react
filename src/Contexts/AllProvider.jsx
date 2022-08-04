import SuperProvider from "./SuperProvider";
import StateProvider from "./StateProvider";
import ScrollTop from "./ScrollTop";
import CartCountProvider from "./CartCountProvider";

function AllProvider(props) {
    const { children } = props;
    return (
        <StateProvider>
            <SuperProvider>
                <ScrollTop>
                    <CartCountProvider>{children}</CartCountProvider>
                </ScrollTop>
            </SuperProvider>
        </StateProvider>
    );
}

export default AllProvider;
