import { createContext } from 'react';
import { ADD_GENRE } from './types';

export const initialState = {
  selectedItems: [],
  addItem: (item) => {},
};

const storage = JSON.parse(localStorage.getItem('genre'));
if (storage) {
  initialState.selectedItems = storage.selectedItems;
}

export const ItemsContext = createContext(initialState);

const addGenre = (selectedItem, state) => {
  // const newItem = [...state.selectedItems, selectedItem];
  if (storage) {
    localStorage.setItem(
      'genre',
      JSON.stringify({
        selectedItems: [...storage.selectedItems, ...selectedItem],
      })
    );

    const items = JSON.parse(localStorage.getItem('genre'));

    return { ...state, selectedItems: items.selectedItems };
  } else {
    localStorage.setItem(
      'genre',
      JSON.stringify({
        selectedItems: selectedItem,
      })
    );
    const items = JSON.parse(localStorage.getItem('genre'));

    return { ...state, selectedItems: items.selectedItems };
  }
};

export default (state, action) => {
  switch (action.type) {
    case ADD_GENRE:
      return addGenre(action.payload, state);

    default:
      return state;
  }
};
