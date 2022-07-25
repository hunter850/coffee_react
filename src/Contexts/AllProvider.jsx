import SuperProvider from "./SuperProvider";
import StateProvider from "./StateProvider";

function AllProvider(props) {
    const { children } = props;
    return (
        <StateProvider>
            <SuperProvider>{children}</SuperProvider>
        </StateProvider>
    );
}

export default AllProvider;
