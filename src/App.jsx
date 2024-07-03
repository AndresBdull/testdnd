import React, { useState, useCallback } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Droppable from "./daniel/dndComponents/Droppable";
import Draggable from "./daniel/dndComponents/Draggable";
import { SHA256 } from "crypto-js";
import { blocksConfig } from "./daniel/json/blocks.jsx";

function App() {
  const containers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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
      const newBlock = { id: cloneInfo.cloneId, parent: over.id, content: blockType.content, style: blockType.style };
      setBlocks(prevBlocks => [...prevBlocks, newBlock]);
      setCloneInfo({ cloning: false, cloneId: null, type: null });
    } else if (over && active.id !== cloneInfo.cloneId) {
      const updatedBlocks = blocks.map(block =>
        block.id === active.id ? { ...block, parent: over.id } : block
      );
      setBlocks(updatedBlocks);
    }
  }, [cloneInfo, blocks]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {blocksConfig.map((block, index) => (
        <button key={index} onClick={handleStaticClick(block.type)} style={{ margin: 5 }}>
          Agregar {block.type}
        </button>
      ))}

      {cloneInfo.cloning && (
        <div style={{ visibility: activeId ? "hidden" : "visible" }}>
          <Draggable key={cloneInfo.cloneId} id={cloneInfo.cloneId}>
            {blocksConfig.find(b => b.type === cloneInfo.type).content}
          </Draggable>
        </div>
      )}

      {containers.map(id => (
        <Droppable key={id} id={id}>
          {blocks.filter(block => block.parent === id).map(block => (
            <div key={block.id} style={block.id === activeId ? { visibility: "hidden" } : {}}>
              <Draggable id={block.id} style={block.style}>
                {block.content}
              </Draggable>
            </div>
          ))}

          Drop here
        </Droppable>
      ))}

      <DragOverlay>
        {activeId && (
          <div style={{
            width: '100px',  // Tamaño más pequeño para facilitar el manejo
            height: '100px', // Tamaño más pequeño para facilitar el manejo
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            fontSize: '0.75rem' // Tamaño de fuente reducido
          }}>
            {blocks.find(b => b.id === activeId) ? blocks.find(b => b.id === activeId).content : "Cargando..."}
          </div>
        )}
      </DragOverlay>

    </DndContext>
  );
}

export default App;
