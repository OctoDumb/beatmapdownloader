import { combineReducers } from "redux";
import search from './reducers/searchParamsReducer';
import preview from './reducers/previewReducer';
import userInformation from './reducers/userInformationReducer';

const rootReducer = combineReducers({
    search,
    preview,
    userInformation
});

export default rootReducer;