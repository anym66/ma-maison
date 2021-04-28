const initialState = { favoritesLog: [] };

function toggleactionReducer(state = initialState, action){
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteLogIndex = state.favoritesLog.findIndex(item => item.id === action.value.id)
            if (favoriteLogIndex !== -1) {
                nextState = {
                ...state,
                favoritesLog: state.favoritesLog.filter( (item, index) => index !== favoriteLogIndex)
              }
            }
            else {
                nextState = {
                ...state,
                favoritesLog: [...state.favoritesLog, action.value]
              }
            }
return nextState || state
default:
return state
    }
}

export default toggleactionReducer