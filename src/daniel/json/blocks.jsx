import React from 'react';
import Droppable from '../dndComponents/Droppable';

export const blocksConfig = [
  {
    type: "textBlock",
    content: <div>Texto Ejemplo</div>,
    isDroppable: false
  },
  {
    type: "imageBlock",
    content: <img src='https://aztecaimagenes.online/upload/-waco-lectura-de-cartas.png' alt='Imagen Ejemplo' style={{ width: "100px" }} />,
    isDroppable: false
  },
  {
    type: "droppableBlock",
    content: <div style={{ backgroundColor: "green", width: "100px" }}> bloque interno</div>,
    isDroppable: true
  }
];
