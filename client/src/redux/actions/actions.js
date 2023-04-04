import { ADD_FAVORITE, REMOVE_FAVORITE, FILTER_CARDS, ORDER_CARDS } from './types.js'

export function addFavorite(character){
    return { type: ADD_FAVORITE,  payload: character };
}

export function removeFavorite(idCharacter){
    return { type: REMOVE_FAVORITE,  payload: idCharacter };
}

export function filterCard(gender){
    return { type: FILTER_CARDS, payload: gender };
}

export function orderCard(order){
    return { type: ORDER_CARDS, payload: order };
}