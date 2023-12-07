"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Home() {
  const list = ["1 item", "2 item", "3 item", "4 item"];
  const [listed, setListed] = useState<any[]>(list);

  function handleOnDragEnd(result: any) {
    console.log(result)
    const items = Array.from(listed);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setListed(items);
  }
  return (
    <div className="w-screen h-screen flex justify-between">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="test">
          {(provided) => (
            <div
              className="w-screen h-screen flex flex-col gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listed.map((item: string, index: number) => {
                return (
                  <Draggable key={index} draggableId={index + ""} index={index}>
                    {(provided) => (
                      <p
                        className="w-1/2 py-4 bg-blue-600 text-white"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {item}
                      </p>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="non">
          {(provided) => (
            <div
              className="w-screen h-screen flex flex-col gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listed.map((item: string, index: number) => {
                index = -index * 10;
                return (
                  <Draggable key={index} draggableId={index + ""} index={index}>
                    {(provided) => (
                      <p
                        className="w-1/2 py-4 bg-blue-600 text-white"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {item}
                      </p>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
