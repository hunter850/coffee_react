import { configureStore } from "@reduxjs/toolkit";
import sampleReducer from "../features/sampleSlice";

export default configureStore({
    reducer: {
        sample: sampleReducer,
    },
});
