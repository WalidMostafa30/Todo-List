import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { addTodo, changeFilter } from "../../store/todoSlice";
import toast from "react-hot-toast";
import PlusIcon from "../../assets/icons/PlusIcon";

const Inputs = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const onsubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim().length !== 0) {
      dispatch(
        addTodo({
          content: input.trim(),
          id: new Date().getTime(),
          finished: false,
        })
      );
      dispatch(changeFilter("todo"));
      setInput("");
      toast.success("Task added successfully");
    } else {
      toast.error("Enter your Todo to add");
    }
  };

  return (
    <form onSubmit={onsubmitHandler} className="px-4">
      <div className="flex gap-1 rounded-full overflow-hidden shadow-md">
        <input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.currentTarget.value)
          }
          type="text"
          placeholder="Add Todo..."
          className="outline-none text-xl px-3 rounded-md w-full"
        />

        <button className="min-w-[55px] h-[55px] text-2xl flex items-center justify-center rounded-full bg-mainColor-1 text-white border-mainColor-1 hover:rotate-90 hover:bg-mainColor-2 duration-300">
          <PlusIcon />
        </button>
      </div>
    </form>
  );
};

export default Inputs;
