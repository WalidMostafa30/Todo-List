import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormObj } from "../types/types";

const mainData = JSON.parse(
  localStorage.getItem("TodosTS") || "[]"
) as FormObj[];

const todoInLocalStorage = (data: FormObj[]) => {
  localStorage.setItem("TodosTS", JSON.stringify(data));
};

interface EditFormType {
  status: boolean;
  id: number | null;
  content: string | null;
}

interface TodoState {
  mainData: FormObj[];
  todos: FormObj[];
  todoStatus: "todo" | "finished";
  editForm: EditFormType;
}

const initialState: TodoState = {
  mainData,
  todos: [],
  todoStatus: "todo",
  editForm: {
    status: false,
    id: null,
    content: null,
  },
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<FormObj>) => {
      state.mainData.push(action.payload);
      todoInLocalStorage(state.mainData);
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      state.mainData = state.mainData.filter(
        (item) => item.id !== action.payload
      );
      todoInLocalStorage(state.mainData);
    },

    deleteAllTodos: (state) => {
      state.mainData = [];
      todoInLocalStorage(state.mainData);
    },

    getTodos: (state) => {
      if (state.todoStatus === "todo") {
        state.todos = state.mainData.filter((item) => item.finished === false);
      } else {
        state.todos = state.mainData.filter((item) => item.finished === true);
      }
    },

    changeFilter: (state, action) => {
      const status = action.payload;
      state.todoStatus = status;
    },

    changeStatus: (state, action) => {
      const id = action.payload;
      const currentItem = state.mainData.find((item) => item.id === id);
      if (currentItem) {
        currentItem.finished = !currentItem.finished;
      }
      todoInLocalStorage(state.mainData);
    },

    editTodo: (state, action) => {
      const { id, content } = action.payload;
      const currentItem = state.mainData.find((item) => item.id === id);

      if (currentItem) {
        currentItem.content = content;
      }
      todoInLocalStorage(state.mainData);
    },

    openEditForm: (state, action) => {
      const { id, content } = action.payload;
      state.editForm.status = true;
      state.editForm.id = id;
      state.editForm.content = content;
    },

    closeEditForm: (state) => {
      state.editForm.status = false;
      state.editForm.id = null;
      state.editForm.content = null;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  openEditForm,
  closeEditForm,
  getTodos,
  changeStatus,
  changeFilter,
  deleteAllTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
