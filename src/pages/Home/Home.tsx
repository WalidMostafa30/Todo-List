import { useEffect } from "react";
import FilterTodos from "../../components/FilterTodos/FilterTodos";
import Inputs from "../../components/Inputs/Inputs";
import Todos from "../../components/Todos/Todos";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getTodos } from "../../store/todoSlice";

const Home = () => {
  const { todos, todoStatus, mainData } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, todoStatus, mainData]);

  return (
    <section className="w-full h-dvh flex justify-center items-center px-4 py-20">
      <div className="w-full md:w-[600px] max-h-full bg-white rounded-md shadow-lg flex flex-col gap-3 py-4">
        <h1 className="text-2xl font-semibold text-center">Todo App</h1>
        <Inputs />

        {mainData.length > 0 && (
          <>
            <Todos items={todos} />
            <FilterTodos />
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
