// SortableItem.js
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id }) {
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
    padding: '16px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: isDragging ? '#6c676770 ' : '#ebbb84',
    cursor: 'grab',
    boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
    touchAction: 'none', // Prevent scrolling on mobile devices
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
}

export default SortableItem;
