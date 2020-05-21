import { combineReducers } from "redux";
import search from './reducers/searchParamsReducer';
import preview from './reducers/previewReducer';

const rootReducer = combineReducers({
    search,
    preview
})

export default rootReducer;