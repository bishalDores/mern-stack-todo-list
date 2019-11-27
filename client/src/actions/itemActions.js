import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from '../actions/types';

export const getItems = () => {
    return {
        type: GET_ITEMS
    }
}
export const deleteItems = id => {
    return {
        type: DELETE_ITEMS,
        payload:id
    }
}
