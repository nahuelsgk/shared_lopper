const audio = (state = {}, action) => {
    switch (action.type) {
        case 'PREVIEW_AUDIO':
            var url = action.url;
            var timeout = setTimeout(function (){
                new Audio(url).play();
            }, 1000);
            return {...state, timeout: timeout};
        case 'CANCEL_PREVIEW_AUDIO':
            return {...state, timeout: clearTimeout(state.timeout)}
        default:
            return state;
    }
}

export default audio