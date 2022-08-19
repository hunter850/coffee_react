import { LoadScript } from "@react-google-maps/api";

class LoadScriptOnlyIfNeeded extends LoadScript {
    componentDidMount() {
        const cleaningUp = true;
        const isBrowser = typeof document !== "undefined"; // require('@react-google-maps/api/src/utils/isbrowser')
        const isAlreadyLoaded =
            window.google &&
            window.google.maps &&
            document.querySelector("body.first-hit-completed"); // AJAX page loading system is adding this class the first time the app is loaded
        if (!isAlreadyLoaded && isBrowser) {
            // @ts-ignore
            if (window.google && !cleaningUp) {
                // console.error("google api is already presented");
                return;
            }

            this.isCleaningUp().then(this.injectScript);
        }

        if (isAlreadyLoaded) {
            this.setState({ loaded: true });
        }
    }
}

export default LoadScriptOnlyIfNeeded;
