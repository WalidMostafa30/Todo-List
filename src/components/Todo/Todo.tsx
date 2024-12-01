import { useAppDispatch } from "../../store/store";
import { changeStatus, openEditForm, removeTodo } from "../../store/todoSlice";
import toast from "react-hot-toast";
import { FormObj } from "../../types/types";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import RightIcon from "../../assets/icons/RightIcon";
import DoubleRightIcon from "../../assets/icons/DoubleRightIcon";

interface TodoProps {
  item: FormObj;
}
const Todo: React.FC<TodoProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const removeTask = (id: number) => {
    dispatch(removeTodo(id));
    toast.success("Task removed");
  };

  const todoActions = (id: number, finished: boolean) => {
    dispatch(changeStatus(id));
    toast.success(finished ? "Task back to todo" : "Task is finished");
  };
  return (
    <div
      className={`w-full shadow-md p-2 rounded-md flex items-center justify-between gap-2 ${
        item.finished ? "finished" : ""
      }`}
    >
      <h2 className="text-2xl line-clamp-1">{item.content}</h2>
      <div className="flex items-center justify-between gap-3">
        <span
          className="text-2xl cursor-pointer"
          onClick={() => todoActions(item.id, item.finished)}
        >
          {item.finished ? <DoubleRightIcon /> : <RightIcon />}
        </span>
        <span
          className="text-2xl cursor-pointer"
          onClick={() =>
            dispatch(openEditForm({ id: item.id, content: item.content }))
          }
        >
          <EditIcon />
        </span>
        <span
          className="text-2xl cursor-pointer text-red-500"
          onClick={() => removeTask(item.id)}
        >
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
};

export default Todo;
