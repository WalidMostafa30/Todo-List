import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeFilter, deleteAllTodos } from "../../store/todoSlice";

const FilterTodos = () => {
  const dispatch = useAppDispatch();
  const { mainData, todoStatus } = useAppSelector((state) => state.todo);
  const todoLength = mainData.filter((item) => item.finished === false).length;
  const finishedLength = mainData.filter(
    (item) => item.finished === true
  ).length;

  const deleteTodos = () => {
    dispatch(deleteAllTodos())
    toast.success("All todos deleted")
  }
  return (
    <div className="px-4 flex justify-between gap-2">
      <button
        className={`mainBtn ${todoStatus === "todo" ? "active" : ""}`}
        onClick={() => dispatch(changeFilter("todo"))}
      >
        Todos
        {todoLength > 0 && (
          <span className="mainBtn-span">
            {todoLength > 9 ? "+9" : todoLength}
          </span>
        )}
      </button>
      <button
        className={`mainBtn ${todoStatus === "finished" ? "active" : ""}`}
        onClick={() => dispatch(changeFilter("finished"))}
      >
        Finished
        {finishedLength > 0 && (
          <span className="mainBtn-span">
            {finishedLength > 9 ? "+9" : finishedLength}
          </span>
        )}
      </button>
      <button
        className="p-2 rounded-md bg-red-600 hover:bg-red-800 duration-150 text-white text-xl w-fit"
        onClick={deleteTodos}
      >
        Clear all
      </button>
    </div>
  );
};

export default FilterTodos;
