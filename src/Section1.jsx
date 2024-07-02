// Section1.jsx funcional
import React from 'react';
import SortableItem from './SortableItem';

const Section1 = ({ items }) => (
  <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#e13e3e' }}>
    <h2>Sección 1</h2>
    {items.map((item) => (
      <SortableItem key={item} id={item} content={item} />
    ))}
  </div>
);

export default Section1;
