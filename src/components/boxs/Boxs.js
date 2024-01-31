import React from "react";
import Box from "../box/Box";
import { DragDropContext } from "react-beautiful-dnd";
import toast from "react-hot-toast";

export default function Boxs({ columns, setColumns }) {
  function onDradEndHandle(result) {
    const { source, destination } = result;

    // out of area
    if (!destination) return;

    // in another column
    if (source.droppableId !== destination.droppableId) {
      const sourceColumnIndex = columns.findIndex(
        (e) => e.id === source.droppableId
      );
      const destColumnIndex = columns.findIndex(
        (e) => e.id === destination.droppableId
      );
      const sourceColumn = columns[sourceColumnIndex];
      const destColumn = columns[destColumnIndex];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      columns[sourceColumnIndex].items = sourceItems;
      columns[destColumnIndex].items = destItems;
      localStorage.setItem("todos", JSON.stringify(columns));
      setColumns(columns);

      // in same column
    } else {
      const sourceColumnIndex = columns.findIndex(
        (e) => e.id === source.droppableId
      );
      const sourceColumn = columns[sourceColumnIndex];
      const sourceItems = [...sourceColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, removed);
      columns[sourceColumnIndex].items = sourceItems;
      localStorage.setItem("todos", JSON.stringify(columns));
      setColumns(columns);
    }
  }

  function deleteTaskHandle(id, droppableId) {
    const updatedData = [...columns];
    for (let i = 0; i < updatedData.length; i++) {
      if (droppableId === updatedData[i].id) {
        const listAfterDelete = updatedData[i].items.filter((t) => t.id !== id);
        updatedData[i] = {
          ...updatedData[i],
          items: [...listAfterDelete],
        };
        localStorage.setItem("todos", JSON.stringify(updatedData));
        setColumns(updatedData);
        toast.success("Task Deleted");
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDradEndHandle}>
      <div className="Boxs">
        {columns.map((col) => (
          <Box
            key={col.id}
            droppableId={col.id}
            deleteTaskHandle={deleteTaskHandle}
            col={col}
            columns={columns}
            setColumns={setColumns}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
