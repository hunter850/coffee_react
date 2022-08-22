import SuperProvider from "./SuperProvider";
import StateProvider from "./StateProvider";
import ScrollTop from "./ScrollTop";
import NavProvider from "./NavProvider";
import TabsHistoryProvider from "./TabsHistoryProvider";
import MountProvider from "./MountProvider";

function AllProvider(props) {
    const { children } = props;
    return (
        <NavProvider>
            <StateProvider>
                <TabsHistoryProvider>
                    <SuperProvider>
                        <MountProvider>
                            <ScrollTop>{children}</ScrollTop>
                        </MountProvider>
                    </SuperProvider>
                </TabsHistoryProvider>
            </StateProvider>
        </NavProvider>
    );
}

export default AllProvider;
