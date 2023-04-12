import { ADD_FAVORITE, REMOVE_FAVORITE, FILTER_CARDS, ORDER_CARDS } from './types.js'
import axios from 'axios';

export function addFavorite(character){
    const endpoint = 'http://localhost:3001/rickandmorty/favorite';
    return (dispatch) => {
       axios.post(endpoint, character).then(({ data }) => {
          return dispatch({
             type: ADD_FAVORITE,
             payload: data,
          });
       });
    };;
}

export function removeFavorite(idCharacter){
    const endpoint = `http://localhost:3001/rickandmorty/favorite/` + idCharacter
    return (dispatch) => {
        axios.delete(endpoint).then(({data}) => {
            return dispatch({type: REMOVE_FAVORITE, payload: data});
        });
    };
}

export function filterCard(gender){
    return { type: FILTER_CARDS, payload: gender };
}

export function orderCard(order){
    return { type: ORDER_CARDS, payload: order };
}