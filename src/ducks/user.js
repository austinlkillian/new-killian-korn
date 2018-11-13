const initialState = {
    user: null
}

const UPDATE_USER = 'UPDATE_USER'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER:

        const {userObj} = action.payload

        state.user = userObj
        return state

        default:
        return state;
    }
}

export function updateUser(userObj) {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}