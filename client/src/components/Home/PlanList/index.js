import React, { useState } from 'react';
import DVD from './DVD';
import Books from './Books';
import Checkout from './Checkout';

export default function PlanList() {
  const [current, setCurrent] = useState(0);
  const pages = [
    <DVD current={current} setCurrent={setCurrent} />,
    <Books current={current} setCurrent={setCurrent} />,
    <Checkout current={current} setCurrent={setCurrent} />,
  ];
  return <>{pages[current]}</>;
}
