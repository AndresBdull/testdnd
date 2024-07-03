import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? 'lightblue' : 'lightgrey',
    padding: '16px',
    margin: '8px',
    minHeight: '100px',
    width: '100%',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
