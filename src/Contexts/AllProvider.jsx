import SuperProvider from "./SuperProvider";

function AllProvider(props) {
    const { children } = props;
    return <SuperProvider>{children}</SuperProvider>;
}

export default AllProvider;
