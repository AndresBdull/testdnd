// section4 funcional
import React from 'react';
import SortableItem from './SortableItem';

const Section4 = ({ items }) => (
  <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#db3e3e' }}>
    <h2>Sección 4</h2>
    {items.map((item) => (
      <SortableItem key={item} id={item} content={item} />
    ))}
  </div>
);

export default Section4;
