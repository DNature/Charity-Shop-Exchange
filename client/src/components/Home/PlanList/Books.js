import React, { useState, useCallback, useContext } from 'react';
import {
  Filters,
  ResourceItem,
  Card,
  ResourceList,
  TextStyle,
} from '@shopify/polaris';
import { ItemsContext } from '../../context/Provider';
import items from '../../../import/planList';
import Button from '../../Button';

export default function Books({ current, setCurrent }) {
  const { addBook, books } = useContext(ItemsContext);
  const [queryValue, setQueryValue] = useState(null);
  const [listValue, setListValue] = useState(items.dvd);

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
          })
        );
      } else {
        setListValue(items);
      }
    },
    [items]
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

  return (
    <Card.Section title={'Select a genre for Books'}>
      <Card>
        <ResourceList
          resourceName={{
            singular: 'Book',
            plural: 'Books',
          }}
          items={listValue}
          renderItem={renderItem}
          filterControl={filterControl}
          selectedItems={books}
          onSelectionChange={addBook}
          selectable
        />
      </Card>
      <div className='flex justify-between flex-wrap mt-6'>
        <div>
          <Button
            onClick={() => {
              setCurrent(current - 1);
            }}
            style={{
              border: '1px solid gray',
              background: '#f4f4f4',
              color: 'gray',
            }}
          >
            Prev
          </Button>
        </div>
        <div>
          <Button
            disabled={books.length !== 0 && books.length < 3}
            onClick={() => {
              setCurrent(current + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </Card.Section>
  );

  function renderItem(item) {
    const { id, name } = item;

    return (
      <ResourceItem
        id={id}
        // onClick={() => onPlanSelect(id)}
      >
        <h3>
          <TextStyle variation='strong'>{name}</TextStyle>
        </h3>
      </ResourceItem>
    );
  }
}
