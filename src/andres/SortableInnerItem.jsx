// SortableInnerItem.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableInnerItem = ({ id, text }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    margin: '4px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: isDragging ? '#6c676770' : '#ebbb84',
    cursor: 'grab',
    boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
    flex: 1,
    textAlign: 'center',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {text}
    </div>
  );
};

export default SortableInnerItem;
