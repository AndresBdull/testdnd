// CustomComponent.jsx
import React from 'react';
import { useSortable, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SortableInnerItem from './SortableInnerItem.jsx';

const CustomComponent = ({ id, text1, text2 }) => {
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
    backgroundColor: isDragging ? '#6c676770' : '#ebbb84',
    cursor: 'grab',
    boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  const innerItems = [
    { id: `${id}-text1`, text: text1 },
    { id: `${id}-text2`, text: text2 },
  ];

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SortableContext items={innerItems.map(item => item.id)} strategy={horizontalListSortingStrategy}>
        {innerItems.map(item => (
          <SortableInnerItem key={item.id} id={item.id} text={item.text} />
        ))}
      </SortableContext>
    </div>
  );
};

export default CustomComponent;
