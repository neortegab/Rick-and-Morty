import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FILTER_CARDS,
  ORDER_CARDS,
} from "./types.js";
import axios from "axios";

export function addFavorite(character) {
  const endpoint = "http://localhost:3001/rickandmorty/favorite";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);
      return dispatch({
        type: ADD_FAVORITE,
        payload: data,
      });
    } catch (error) {
      return window.alert(error);
    }
  };
}

export function removeFavorite(idCharacter) {
  const endpoint = `http://localhost:3001/rickandmorty/favorite/` + idCharacter;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      return dispatch({ type: REMOVE_FAVORITE, payload: data });
    } catch (error) {
      return window.alert(error);
    }
  };
}

export function filterCard(gender) {
  return { type: FILTER_CARDS, payload: gender };
}

export function orderCard(order) {
  return { type: ORDER_CARDS, payload: order };
}
