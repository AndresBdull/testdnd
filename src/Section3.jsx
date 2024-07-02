// section3 funcional
import React from 'react';
import SortableItem from './SortableItem';

const Section3 = ({ items }) => (
  <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#c62b2b' }}>
    <h2>Sección 3</h2>
    {items.map((item) => (
      <SortableItem key={item} id={item} content={item} />
    ))}
  </div>
);

export default Section3;
