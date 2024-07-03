// Sidebar.jsx
const SidebarItem = ({ id, type }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
      id,
      data: {
        type: type, // Tipo de elemento para identificarlo al soltarlo
      },
    });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#c14747',
      marginBottom: '8px',
      cursor: 'grab',
    };
  
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {id}
      </div>
    );
  };
  