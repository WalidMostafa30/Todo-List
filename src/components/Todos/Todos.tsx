import { useAppSelector } from "../../store/store";
import { FormObj } from "../../types/types";
import Todo from "../Todo/Todo";

interface TodosProps {
  items: FormObj[];
}

const Todos: React.FC<TodosProps> = ({ items }) => {
  const { todoStatus } = useAppSelector((state) => state.todo);

  return (
    <div className="max-h-full overflow-y-auto flex flex-col gap-2 px-4 py-2">
      {items.length > 0 ? (
        items.map((item) => <Todo key={item.id} item={item} />)
      ) : (
        <p className="text-xl font-semibold text-center">
          {todoStatus === "todo"
            ? "All todos is finished"
            : "No tasks in finished yet"}
        </p>
      )}
    </div>
  );
};

export default Todos;
