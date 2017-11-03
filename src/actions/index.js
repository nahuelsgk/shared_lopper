export const previewAudio = url => {
    return {
        type: 'PREVIEW_AUDIO',
        url: url
    }
}

export const cancelPreviewAudio = () => {
    return {
        type: 'CANCEL_PREVIEW_AUDIO'
    }
}

export const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        isAuthenticated: true
    }
}