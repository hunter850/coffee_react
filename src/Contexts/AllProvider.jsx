import SuperProvider from "./SuperProvider";
import StateProvider from "./StateProvider";
import ScrollTop from "./ScrollTop";

function AllProvider(props) {
    const { children } = props;
    return (
        <StateProvider>
            <SuperProvider>
                <ScrollTop>{children}</ScrollTop>
            </SuperProvider>
        </StateProvider>
    );
}

export default AllProvider;
