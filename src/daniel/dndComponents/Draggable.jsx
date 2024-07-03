import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const Draggable = ({ id, style, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const styles = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    touchAction: 'none',
    ...style,
  };

  return (
    <div ref={setNodeRef} style={styles} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;
