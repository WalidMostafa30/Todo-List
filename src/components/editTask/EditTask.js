import React, { useState } from "react";
import toast from "react-hot-toast";

export default function EditTask({
  toggleEditHandle,
  columns,
  setColumns,
  droppableId,
  id,
  content,
}) {
  const [editContent, seteditContent] = useState(content.trim());

  const onChangeEditContent = (e) => {
    seteditContent(e.target.value);
  };

  function submitEditHandler(e) {
    e.preventDefault();
    if (editContent.trim().length > 0) {
      editTaskHandle();
      toggleEditHandle();
    }
    if (content.trim() !== editContent.trim()) {
      toast.success("Task Updated");
    } else {
      toast.error("The Task has not Changed");
    }
  }
  function enterHandler(e) {
    if (e.key === "Enter") {
      submitEditHandler(e);
    }
  }

  function editTaskHandle() {
    const updatedData = [...columns];
    for (let i = 0; i < updatedData.length; i++) {
      if (droppableId === updatedData[i].id) {
        updatedData[i] = {
          ...updatedData[i],
          items: updatedData[i].items.map((item) =>
            item.id === id ? { ...item, content: editContent } : item
          ),
        };
      }
      localStorage.setItem("todo", JSON.stringify(updatedData));
      setColumns(updatedData);
    }
  }

  return (
    <div className="Edit-Task">
      <div className="Edit-Task__BG" onClick={toggleEditHandle} />
      <form className="Edit-Task__form-Edit" onSubmit={submitEditHandler}>
        <textarea
          className="Edit-Task__text-area"
          onChange={onChangeEditContent}
          value={editContent}
          onKeyDown={enterHandler}
        />
        <div className="Edit-Task__group-btns ">
          <button className="Edit-Task__btn Edit-Task__btn--edit">Edit</button>
          <button
            className="Edit-Task__btn Edit-Task__btn--close"
            type="button"
            onClick={toggleEditHandle}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
