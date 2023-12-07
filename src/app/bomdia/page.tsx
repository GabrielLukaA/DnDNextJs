"use client"
import  { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Item {
  id: string;
  content: string;
}

const MyComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = Array.from(items);
    const [removed] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, removed);

    setItems(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MyComponent;
