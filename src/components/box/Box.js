import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ToDo from "../todo/ToDo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Box({
  col,
  droppableId,
  deleteTaskHandle,
  columns,
  setColumns,
}) {
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
                  columns={columns}
                  setColumns={setColumns}
                />
              ))
            ) : (
              <h5 className="Box__msg-drop-here d-flex m-auto">
                Drop Here...
                <span className="ms-1">
                  <FontAwesomeIcon className="icon" icon={faArrowDown} />
                </span>
              </h5>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
