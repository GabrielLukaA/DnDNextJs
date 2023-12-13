"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable,  } from "@hello-pangea/dnd";

export default function Home() {
  const list = ["1 item", "2 item", "3 item", "4 item"];
  const secondList = ["5 item", "6 item", "7 item", "8 item"];
  const [listed, setListed] = useState<any[]>(list);
  const [otherList, setList] = useState<any[]>(secondList);

  function handleOnDragEnd(result: any) {
  
    let items = [];
    if (result.destination.droppableId == "non") {
      console.log(result)
      items = Array.from(otherList);
      console.log("eu to aqui malandro");
      const [reorderedItems] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItems);
      setList(items);
    } else {
      items = Array.from(listed);
      console.log("CARAIO LITTLE CLEITO", result);
      const [reorderedItems] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItems);
      setListed(items);
    }
  }
  return (
    <div className="w-screen h-screen flex justify-between">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="test" key={3}>
          {(provided) => (
            <div
              className="w-1/2 h-screen flex flex-col gap-2"
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
        <Droppable droppableId="non" key={4}>
          {(provided) => (
            <div
              className="w-screen h-screen flex flex-col gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {otherList.map((item: string, index: number) => {
                index = index;
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
