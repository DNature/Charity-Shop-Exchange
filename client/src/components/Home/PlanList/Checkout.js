import React, { useContext } from 'react';
import { Card, TextStyle } from '@shopify/polaris';
import { ItemsContext } from '../../context/Provider';
import items from '../../../import/planList';
import Button from '../../Button';

export default function Checkout({ current, setCurrent }) {
  const { dvds, books } = useContext(ItemsContext);

  return (
    <Card.Section title={'Checkout'}>
      <div className='mb-6'>
        <h3>
          <TextStyle variation='strong'>DVDs</TextStyle>
        </h3>
        <ul>
          {dvds &&
            dvds.map((item) => (
              <li key={item}>
                <TextStyle variation='positive'>{item}</TextStyle>
              </li>
            ))}
        </ul>
      </div>
      <div className='mb-6'>
        <h3>
          <TextStyle variation='strong'>Books</TextStyle>
        </h3>
        <ul>
          {books &&
            books.map((item) => (
              <li key={item}>
                <TextStyle variation='positive'>{item}</TextStyle>
              </li>
            ))}
        </ul>
      </div>
      <div className='mb-6'>
        <h3>
          <TextStyle variation='subdued'>
            Total : {books.length + dvds.length} Items
          </TextStyle>
        </h3>
      </div>
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
            onClick={() => {
              console.log({ books, dvds });
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Card.Section>
  );
}
