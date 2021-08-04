/*
*
*
*/


export const UPDATE_MODAL = 'UPDATE_MODAL';

export function modalUpdate (data) {
    return {
        type: UPDATE_MODAL,
        data
    };
}