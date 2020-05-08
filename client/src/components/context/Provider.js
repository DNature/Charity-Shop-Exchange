import React, { createContext, useReducer } from 'react';
import { ADD_ITEM, ADD_DVD, ADD_BOOK } from './types';

export const initialState = {
  dvds: [],
  books: [],
};

const cache = JSON.parse(localStorage.getItem('genres'));

if (cache) {
  if (cache.dvds) initialState.dvds = cache.dvds;
  if (cache.books) initialState.books = cache.books;
}

const addDvd = (state, selectedItem) => {
  const newCache = JSON.parse(localStorage.getItem('genres'));
  let items;

  if (newCache && newCache.books) {
    items = {
      books: newCache.books,
      dvds: selectedItem,
    };
  } else {
    items = {
      dvds: selectedItem,
    };
  }

  localStorage.setItem('genres', JSON.stringify(items));
  const result = { ...state, ...items };

  return result;
};

const addBook = (state, selectedItem) => {
  const newCache = JSON.parse(localStorage.getItem('genres'));
  let items;

  if (newCache && newCache.dvds) {
    items = {
      dvds: newCache.dvds,
      books: selectedItem,
    };
  } else {
    items = {
      books: selectedItem,
    };
  }

  localStorage.setItem('genres', JSON.stringify(items));
  const result = { ...state, ...items };

  return result;
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case ADD_DVD:
      return addDvd(state, action.payload);

    case ADD_BOOK:
      return addBook(state, action.payload);

    default:
      return state;
  }
};

export const ItemsContext = createContext({
  ...initialState,
  addDvd: (id) => {},
  addBook: (id) => {},
});

const ItemsProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function addItem(id) {
    dispatch({
      type: ADD_ITEM,
      payload: id,
    });
  }

  function addBook(id) {
    dispatch({
      type: ADD_BOOK,
      payload: id,
    });
  }

  function addDvd(id) {
    dispatch({
      type: ADD_DVD,
      payload: id,
    });
  }

  return (
    <ItemsContext.Provider
      value={{
        dvds: state.dvds,
        books: state.books,
        addDvd,
        addBook,
      }}
      {...props}
    />
  );
};

export default ItemsProvider;
