import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "../utils/widgetSlice";

const store = configureStore({
    reducer: {
        widgets: widgetReducer,
    },
});

export default store;