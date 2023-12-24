import { addTask, updateTask, deleteTask } from "../store/slices/taskSlice";

import tasksReducer from "../store/slices/taskSlice";

describe("Task Slice Reducers", () => {
  test("should add a task to TODO", () => {
    const initialState = {
      TODO: [],
      InProgress: [],
      Completed: [],
    };

    const action = addTask({
      status: "TODO",
      task: { id: 1, title: "Test Task" },
    });

    const nextState = tasksReducer(initialState, action);

    expect(nextState.TODO.length).toBe(1);
    expect(nextState.TODO[0].title).toBe("Test Task");
  });

  test("should update a task title", () => {
    const initialState = {
      TODO: [{ id: 1, title: "Old Title" }],
      InProgress: [],
      Completed: [],
    };

    const action = updateTask({
      status: "TODO",
      id: 1,
      title: "New Title",
    });

    const nextState = tasksReducer(initialState, action);

    expect(nextState.TODO.length).toBe(1);
    expect(nextState.TODO[0].title).toBe("New Title");
  });

  test("should delete a task", () => {
    const initialState = {
      TODO: [{ id: 1, title: "Task to delete" }],
      InProgress: [],
      Completed: [],
    };

    const action = deleteTask({
      status: "TODO",
      id: 1,
    });

    const nextState = tasksReducer(initialState, action);

    expect(nextState.TODO.length).toBe(0);
  });
});
