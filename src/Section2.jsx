// section2 funcional
import React from 'react';
import SortableItem from './SortableItem';

const Section2 = ({ items }) => (
  <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fb5c5c' }}>
    <h2>Sección 2</h2>
    {items.map((item) => (
      <SortableItem key={item} id={item} content={item} />
    ))}
  </div>
);

export default Section2;
