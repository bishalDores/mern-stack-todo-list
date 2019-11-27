import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from '../actions/types';

const initialState = {
    items:[
        {id: uuid(), name:'Gym'},
        {id: uuid(), name:'Peanut Butter'},
        {id: uuid(), name:'Banana'},
        {id: uuid(), name:'Eggs'},
    ]
};

export default function(state=initialState,action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state
            }
            default:
                return state;
    }
}