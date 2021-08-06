/*
*  全局loading
*  秦国胜
*/


export const UPDATE_SPIN = 'UPDATE_SPIN';

export function updateSpin (data) {
    return {
        type: UPDATE_SPIN,
        data
    };
}