import React, { useState } from "react";
import EditTask from "../editTask/EditTask";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";

export default function ToDo({
  tsk,
  index,
  deleteTaskHandle,
  droppableId,
  col,
  columns,
  setColumns,
}) {
  const [openEdit, setOpenEdit] = useState(false);

  const className = `ToDo ${col.class}`;

  function toggleEditHandle() {
    setOpenEdit(!openEdit);
  }
  return (
    <>
      <Draggable key={tsk.id} draggableId={tsk.id} index={index}>
        {(provided) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={className}
          >
            <p className="ToDo__content">
              {tsk.content.length < 60
                ? tsk.content
                : tsk.content.slice(0, 60) + "..."}
            </p>
            <span
              className="ToDo__btn ToDo__btn--delete"
              onClick={() => deleteTaskHandle(tsk.id, droppableId)}
            >
              <FontAwesomeIcon className="icon" icon={faClose} />
            </span>
            <span
              className="ToDo__btn ToDo__btn--edit"
              onClick={toggleEditHandle}
            >
              <FontAwesomeIcon className="icon" icon={faPen} />
            </span>
          </div>
        )}
      </Draggable>
      {openEdit && (
        <EditTask
          toggleEditHandle={toggleEditHandle}
          columns={columns}
          setColumns={setColumns}
          droppableId={droppableId}
          id={tsk.id}
          content={tsk.content}
        />
      )}
    </>
  );
}
