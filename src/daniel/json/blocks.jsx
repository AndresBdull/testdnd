import React from 'react'; // Necesario para interpretar JSX

export const blocksConfig = [
  {
    type: "textBlock",
    content: <div>Texto Ejemplo</div>, // Directamente usando JSX
  },
  {
    type: "imageBlock",
    content: <img src='https://aztecaimagenes.online/upload/-waco-lectura-de-cartas.png' alt='Imagen Ejemplo' style={{ width: "100px" }} />, // Componente React para una imagen
  },
  {
    type: "customComponent",
    content: <button> UN BOTON CABRON </button>, // Componente funcional

  }
];
