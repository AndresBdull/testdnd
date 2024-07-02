// app funcional
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  createSnapModifier
} from '@dnd-kit/modifiers';
import SortableSection from './SortableSection.jsx';
import SortableItem from './SortableItem.jsx';

const initialItems = {
  section1: ['Imagen 1'],
  section2: ['About', 'Formulario'],
  section3: ['Imagen 2', 'Texto'],
  section4: ['FAQs'],
};

const initialSections = ['section1', 'section2', 'section3', 'section4'];

const gridSize = 20; // Tamaño de la cuadrícula en píxeles
const snapToGridModifier = createSnapModifier(gridSize);

function App() {
  const [items, setItems] = useState(initialItems);
  const [sections, setSections] = useState(initialSections);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (sections.includes(active.id) && sections.includes(over.id)) {
      // Mover secciones
      setSections((sections) => {
        const oldIndex = sections.indexOf(active.id);
        const newIndex = sections.indexOf(over.id);
        return arrayMove(sections, oldIndex, newIndex);
      });
    } else {
      // Mover items dentro de una sección
      const activeContainer = Object.keys(items).find((key) => items[key].includes(active.id));
      const overContainer = Object.keys(items).find((key) => items[key].includes(over.id));

      if (activeContainer && overContainer) {
        if (activeContainer === overContainer) {
          setItems((prevItems) => ({
            ...prevItems,
            [activeContainer]: arrayMove(prevItems[activeContainer], prevItems[activeContainer].indexOf(active.id), prevItems[activeContainer].indexOf(over.id)),
          }));
        } else {
          setItems((prevItems) => {
            const activeItems = [...prevItems[activeContainer]];
            const overItems = [...prevItems[overContainer]];

            activeItems.splice(activeItems.indexOf(active.id), 1);
            overItems.splice(overItems.indexOf(over.id), 0, active.id);

            return {
              ...prevItems,
              [activeContainer]: activeItems,
              [overContainer]: overItems,
            };
          });
        }
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', backgroundColor: '#f5f5f5' }}>
          {sections.map((sectionId) => (
            <SortableSection key={sectionId} id={sectionId} items={items[sectionId]} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay modifiers={[restrictToWindowEdges, snapToGridModifier]}>
        {activeId ? (
          sections.includes(activeId) ? (
            <SortableSection id={activeId} items={items[activeId]} isOverlay />
          ) : (
            <SortableItem id={activeId} />
          )
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
