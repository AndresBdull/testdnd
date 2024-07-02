// sortablesection funcional
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem.jsx';

const SortableSection = ({ id, items = [], isOverlay }) => {
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
    transition: isOverlay ? undefined : transition,
    padding: '16px',
    border: isDragging ? '5px solid #4A90E2' : '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    marginBottom: '16px',
    cursor: 'grab',
    boxShadow: isDragging ? '0 4px 8px rgb(0, 0, 0)' : 'none',
  };

  const sectionTitle = id.charAt(0).toUpperCase() + id.slice(1).replace(/\d/, (m) => ` ${m}`);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h2>{sectionTitle}</h2>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default SortableSection;
