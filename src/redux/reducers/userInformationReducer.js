export default function userInformation(state = {}, action) {
    switch (action.type) {
        case 'ADD_USER_ID': {
            return {
                ...state,
                userId: action.userId
            }
        }

        case 'ADD_USER_FRIENDS': {
            return {
                ...state,
                friends: action.friends
            }
        }

        default: {
            return state
        }
    }
}