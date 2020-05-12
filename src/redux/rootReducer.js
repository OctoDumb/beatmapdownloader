import { combineReducers } from "redux";
import search from './reducers/searchParamsReducer';

const rootReducer = combineReducers({
    search
})

export default rootReducer;