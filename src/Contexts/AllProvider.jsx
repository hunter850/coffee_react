import SuperProvider from "./SuperProvider";
import StateProvider from "./StateProvider";
import ScrollTop from "./ScrollTop";
import NavProvider from "./NavProvider";

function AllProvider(props) {
    const { children } = props;
    return (
        <NavProvider>
            <StateProvider>
                <SuperProvider>
                    <ScrollTop>{children}</ScrollTop>
                </SuperProvider>
            </StateProvider>
        </NavProvider>
    );
}

export default AllProvider;
