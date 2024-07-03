import React, { useState, useCallback } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Droppable from "./daniel/dndComponents/Droppable";
import Draggable from "./daniel/dndComponents/Draggable";
import { SHA256 } from "crypto-js";
import { blocksConfig } from "./daniel/json/blocks";

function App() {
  const [blocks, setBlocks] = useState([]);
  const [cloneInfo, setCloneInfo] = useState({ cloning: false, cloneId: null, type: null });
  const [activeId, setActiveId] = useState(null);

  const handleStaticClick = useCallback((type) => () => {
    const currentTimestamp = new Date().toISOString();
    const newCloneId = `clone-${SHA256(currentTimestamp).toString()}`;
    setCloneInfo({ cloning: true, cloneId: newCloneId, type });
  }, []);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { over, active } = event;
    setActiveId(null);

    if (cloneInfo.cloning && over) {
      const blockType = blocksConfig.find(b => b.type === cloneInfo.type);
      const newBlock = { id: cloneInfo.cloneId, parent: over.id, content: blockType.content, style: blockType.style, isDroppable: blockType.isDroppable };
      setBlocks(prevBlocks => [...prevBlocks, newBlock]);
      setCloneInfo({ cloning: false, cloneId: null, type: null });
    } else if (over && active.id !== cloneInfo.cloneId) {
      const updatedBlocks = blocks.map(block =>
        block.id === active.id ? { ...block, parent: over.id } : block
      );
      setBlocks(updatedBlocks);
    }
  }, [cloneInfo, blocks]);

  const renderBlocks = (parentId) => {
    return blocks.filter(block => block.parent === parentId).map(block => (
      <div key={block.id} >
        <Draggable id={block.id} style={block.style}>
          {block.content}
          {block.isDroppable && <Droppable id={block.id}>
            {renderBlocks(block.id)}
          </Droppable>}
        </Draggable>
      </div>
    ));
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {blocksConfig.map((block, index) => (
        <button key={index} onClick={handleStaticClick(block.type)} style={{ margin: 5 }}>
          Agregar {block.type}
        </button>
      ))}

      {cloneInfo.cloning && (
        <div>
          <Draggable key={cloneInfo.cloneId} id={cloneInfo.cloneId}>
            {blocksConfig.find(b => b.type === cloneInfo.type).content}
          </Draggable>
        </div>
      )}

      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(id => (
        <Droppable key={id} id={id}>
          {renderBlocks(id)}
          Drop here
        </Droppable>
      ))}

      <DragOverlay>
        {activeId && (
          <div style={{
            width: '100px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            fontSize: '0.75rem'
          }}>
            {blocks.find(b => b.id === activeId)?.content || "Cargando..."}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
