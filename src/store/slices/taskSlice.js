import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    TODO: [],
    InProgress: [],
    Completed: [],
  },
  reducers: {
    addTask: (state, action) => {
      const { task, status } = action.payload;
      state[status].push(task);
    },
    updateTask: (state, action) => {
      const { id, status } = action.payload;
      const taskIndex = state[status].findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state[status][taskIndex].title = action.payload.title;
      }
    },
    deleteTask: (state, action) => {
      const { id, status } = action.payload;
      state[status] = state[status].filter((task) => task.id !== id);
    },
    loadTaskFromLocalStorage: (state, action) => {
      return action.payload;
    },
    reorderTask: (state, action) => {
      const { source, destination } = action.payload;
      const [removed] = state[source.droppableId].splice(source.index, 1);
      state[destination.droppableId].splice(destination.index, 0, removed);
    },
  },
});

export const { addTask, updateTask, deleteTask, reorderTask } =
  taskSlice.actions;

export default taskSlice.reducer;
