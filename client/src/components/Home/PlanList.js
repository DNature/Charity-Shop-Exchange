import React, { useState, useCallback, useReducer  } from 'react';
import {
  Filters,
  ResourceItem,
  Card,
  ResourceList,
  TextStyle,
} from '@shopify/polaris';
import Reducer, { ItemsContext, initialState } from '../context/Reducer';
import { ADD_GENRE } from '../context/types';

export default function PlanList({
  items = [],
  resourceName = { singular: 'Item', plural: 'Items' },
}) {
  const [queryValue, setQueryValue] = useState(null);
  const [listValue, setListValue] = useState(items);

  const [state, dispatch] = useReducer( Reducer, initialState );

  const handleQueryValueChange = useCallback(
    (value) => {
      setQueryValue(value);
      if (value) {
        setListValue(
          items.filter((elem) => {
            return (
              elem.name &&
              elem.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            );
          }),
        );
      } else {
        setListValue(items);
      }
    },
    [items],
  );

  const handleQueryValueRemove = useCallback(() => {
    setListValue(items);
    setQueryValue(null);
  }, [items]);

  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={[]}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    ></Filters>
  );

  const onPlanSelect = ( id ) => {
    console.log( 'Plan ' + id + ' is slected' );
    dispatch( {
      type: ADD_GENRE,
      payload: id,
    } );
  };

  return (
    <ItemsContext.Provider
      value={{
        selectedItems: state.selectedItems,
        addItem: handleQueryValueChange,
      }}
    >
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={listValue}
          selectable
          renderItem={renderItem}
          filterControl={filterControl}
          selectedItems={state.selectedItems}
          onSelectionChange={onPlanSelect}
        />
      </Card>
    </ItemsContext.Provider>
  );

  function renderItem(item) {
    const { id, name } = item;

    return (
      <ResourceItem id={id} onClick={() => onPlanSelect(id)}>
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
      </ResourceItem>
    );
  }
}
