import { configureStore } from "@reduxjs/toolkit";
import filterReducer, {FILTER_SLICE_NAME} from "./filterSlice";
import todoListReducer, {TODO_LIST_SLICE_NAME} from "./todoListSlice";

const store = configureStore({
    reducer: {
        [FILTER_SLICE_NAME]: filterReducer,
        [TODO_LIST_SLICE_NAME]: todoListReducer,
    },
    devTools: true
})

export default store