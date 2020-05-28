export function addUserId(userId) {
    return {
        type: 'ADD_USER_ID',
        userId,
    }
}

export function addUserFriends(friends) {
    return {
        type: 'ADD_USER_FRIENDS',
        friends,
    }
}