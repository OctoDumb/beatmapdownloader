let initialState = {
    query: "",
    status: 'leaderboard',
    mode: null,
    general: []
};

export default function search(state = initialState, action) {
    /* console.log(state) */
    switch (action.type) {
        case 'ADD_MODE': {
            return {
                ...state,
                mode: action.mode
            }
        }

        case 'ADD_CATEGORY': {
            return {
                ...state,
                status: action.category
            };
        }

        case 'SWITCH_GENERAL': {
            return {
                ...state,
                general: state.general.find(g => g === action.general) ?
                    state.general.filter(g => g !== action.general) :
                    [...state.general, action.general]
            };
        }

        case 'ADD_QUERY': {
            return {
                ...state,
                query: action.query
            };
        }

        default:
            return state;
    }
}