import SuperProvider from "./SuperProvider";
import StateProvider from "./StateProvider";
import ScrollTop from "./ScrollTop";
import NavProvider from "./NavProvider";
import TabsHistoryProvider from "./TabsHistoryProvider";

function AllProvider(props) {
    const { children } = props;
    return (
        <NavProvider>
            <StateProvider>
                <TabsHistoryProvider>
                    <SuperProvider>
                        <ScrollTop>{children}</ScrollTop>
                    </SuperProvider>
                </TabsHistoryProvider>
            </StateProvider>
        </NavProvider>
    );
}

export default AllProvider;
