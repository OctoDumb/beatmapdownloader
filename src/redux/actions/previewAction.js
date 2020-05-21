export function changePreviewPlayStatus(playStatus, previewId) {
    return {
        type: 'CHANGE_PREVIEW_PLAY_STATUS',
        playStatus,
        previewId
    }
}