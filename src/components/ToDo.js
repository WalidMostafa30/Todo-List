import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function ToDo({ tsk, index, deleteTaskHandle, droppableId, col }) {
  const className = `ToDo ${col.class}`;
  return (
    <Draggable key={tsk.id} draggableId={tsk.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={className}
        >
          <p className="ToDo__content">{tsk.content}</p>
          <span
            className="ToDo__btn"
            onClick={() => deleteTaskHandle(tsk.id, droppableId)}
          >
            +
          </span>
        </div>
      )}
    </Draggable>
  );
}
