let initialState = {
    playStatus: false
}

export default function preview(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_PREVIEW_PLAY_STATUS': {
            return {
                ...state,
                previewId: action.previewId,
                playStatus: action.playStatus,
            }
        }

        default: {
            return state
        }
    }
}