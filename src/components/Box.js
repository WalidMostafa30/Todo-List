import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ToDo from "./ToDo";

export default function Box({ col, droppableId, deleteTaskHandle }) {
  return (
    <div className="Box" style={{ backgroundColor: col.color }}>
      <h2 className="Box__title text-center text-light p-2">{col.title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="Box__todos"
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#4a6585" : "white",
            }}
          >
            {col.items.length > 0 ? (
              col.items.map((tsk, index) => (
                <ToDo
                  key={tsk.id}
                  tsk={tsk}
                  index={index}
                  deleteTaskHandle={deleteTaskHandle}
                  droppableId={droppableId}
                  col={col}
                />
              ))
            ) : (
              <h5 className="Box__msg-drop-here d-flex m-auto">
                Drop Here...<span className="ms-1">!</span>
              </h5>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
