"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

export default function otherTry() {
  type Task = {
    name: string;
    id: string | number;
    content: string;
  };
  type Column = {
    name: string;
    items: Task[];
    id: number;
  };

  const tasks: Task[] = [
    {
      content: "Lavar a casa",
      name: "Lavar",
      id: "123",
    },
    {
      content: "Varrer a  casa",
      name: "Varrer",
      id: "333",
    },
  ];
  const columnsBack: Column[] = [
    {
      name: "Todo",
      items: tasks,
      id: 1,
    },
    {
      name: "In Progress",
      items: [],
      id: 2,
    },
  ];
  const [columns, setColumns] = useState<Column[]>(columnsBack);

  const onDragEnd = (result: any, columns: any[], setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {

        const sourceColumn: Column = columns.find(
            (column) => column.id == source.droppableId
          );
        const destColumn: Column = columns.find(
            (column) => column.id == destination.droppableId
          );
    
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        sourceColumn.items = sourceItems
        destColumn.items = destItems
        columns[columns.indexOf(sourceColumn)] = sourceColumn;
        columns[columns.indexOf(destColumn)] = destColumn;
        setColumns([
            ...columns
        ])
    } else {
      const column: Column = columns.find(
        (column) => column.id == source.droppableId
      );
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      column.items = copiedItems;
      columns[columns.indexOf(column)] = column;

      setColumns([...columns]);
    }
  };

  return (
    <div className="flex justify-center w-screen">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {columns.map((column) => {
          return (
            <div className="flex flex-col items-center" key={column.id}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={`${column.id}`} key={column.id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              draggableId={`${item.id}`}
                              key={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263b4a"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <div><p>{item.name}</p></div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
