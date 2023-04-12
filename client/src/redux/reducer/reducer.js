import { ADD_FAVORITE, REMOVE_FAVORITE, FILTER_CARDS, ORDER_CARDS } from "../actions/types";

const initialState = {
    allFavorites: [],
    filteredCharacters: [],
}

const compareCharacterIdAscendant = (a, b) => {
    if(a.id < b.id){
        return -1;
    } else if(a.id > b.id){
        return 1;
    } else{
        return 0;
    }
}

const compareCharacterIdDescendant = (a, b) => {
    if(a.id < b.id){
        return 1;
    } else if(a.id > b.id){
        return -1;
    } else{
        return 0;
    }
}

export default function rootReducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case ADD_FAVORITE:
            return { ...state, allFavorites: payload };

        case REMOVE_FAVORITE:
            return { ...state, allFavorites: payload };
        
        case FILTER_CARDS:
            let filterByGender = [...state.allFavorites].filter((character) => character.gender === payload);
            return (payload === 'All') ? {...state, filteredCharacters: state.allFavorites} : {...state, filteredCharacters: filterByGender};
        
        case ORDER_CARDS:
            let sortedCharacters = [...state.filteredCharacters];
            return (payload === 'A') ? 
            {...state, filteredCharacters: sortedCharacters.sort(compareCharacterIdAscendant)} 
            : {...state, filteredCharacters: sortedCharacters.sort(compareCharacterIdDescendant)};

        default:
            return state;
    }
}