/*
*
*
*/
export const UPDATE_HOME = 'UPDATE_HOME';


export function update (data) {
    return {
        type: UPDATE_HOME,
        data
    };
}

export function updateHome (data) {
    return function (dispatch) {
        dispatch(update(data))
    };
}