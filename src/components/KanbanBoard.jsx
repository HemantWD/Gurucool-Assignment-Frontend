import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  reorderTask,
} from "../store/slices/taskSlice";
import Modal from "./Modal";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("tasks"));
    if (storedTask) {
      dispatch({ type: "tasks/loadTaskFromLocalStorage", payload: storedTask });
    }
  }, [dispatch, selectedTask]);

  const handleDrag = (result) => {
    if (!result.destination) return;

    dispatch(
      reorderTask({
        source: {
          droppableId: result.source.droppableId,
          index: result.source.index,
        },
        destination: {
          droppableId: result.destination.droppableId,
          index: result.destination.index,
        },
      })
    );
  };

  const handleActions = (action, status, taskTitle) => {
    if (action === "add") {
      const newTask = { id: Date.now(), title: taskTitle, status };
      dispatch(addTask({ status, task: newTask }));

      const updatedTask = {
        ...tasks,
        [status]: [...tasks[status], newTask],
      };

      localStorage.setItem("tasks", JSON.stringify(updatedTask));

      alert(`${status} Added`);
    } else if (action === "update" && selectedTask) {
      const updatingTask = { ...selectedTask, title: taskTitle };
      dispatch(updateTask({ status, task: updatingTask }));

      const updatedTask = {
        ...tasks,
        [status]: tasks[status].map((t) =>
          t.id === selectedTask.id ? updatingTask : t
        ),
      };
      localStorage.setItem("tasks", JSON.stringify(updatedTask));
      alert(`${status} Added`);
    }
    //  else if (action === "delete" && selectedTask) {
    //   console.log("Before deletion - Redux state:", tasks);

    //   dispatch(deleteTask({ status, taskId: selectedTask.id }));
    //   const updatedTask = {
    //     ...tasks,
    //     [status]: tasks[status].filter((t) => t.id !== selectedTask.id),
    //   };
    //   console.log("After deletion - Redux state:", updatedTask);

    //   localStorage.setItem("tasks", JSON.stringify(updatedTask));
    // }

    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (status, task) => {
    if (window.confirm("Are you sure you want to delete this task")) {
      dispatch(deleteTask({ status, taskId: task.id }));
      const updatedTask = {
        ...tasks,
        [status]: tasks[status].filter((t) => t.id !== task.id),
      };
      // console.log("After deletion - Redux state:", updatedTask);

      localStorage.setItem("tasks", JSON.stringify(updatedTask));
      dispatch({
        type: "tasks/loadTaskFromLocalStorage",
        payload: updatedTask,
      });
    }
    alert(`${task.title} Deleted`);
  };

  const openModal = (status, action, task) => {
    setSelectedStatus(status);
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const closeModal = (status, action, task) => {
    setSelectedStatus(null);
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap justify-center mt-8 space-x-4">
      {Object.keys(tasks).map((status) => (
        <div
          key={status}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 border rounded-md bg-gray-200 mb-4"
        >
          <h2 className="text-xl text-center font-bold mb-4 text-stone-600">
            {status}
          </h2>

          <div className="space-y-4">
            {tasks[status].map((task) => (
              <div
                key={task.id}
                className="p-4 border-2 bg-white rounded-md cursor-pointer hover:bg-blue-200"
              >
                <li className=" text-stone-500">{task.title}</li>

                <div className="flex justify-end">
                  <button
                    onClick={() => openModal(status, "update", task)}
                    className="mr-2"
                  >
                    <FaRegEdit />
                  </button>
                  <button onClick={() => handleDeleteTask(status, task)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => openModal(status, "add")}
            className=" px-6 py-2 rounded-md bg-stone-500 text-stone-50 mt-10 w-full hover:bg-stone-950"
          >
            Add Task
          </button>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedStatus ? `${selectedStatus} Task ` : "Task"}
        onSubmit={(taskTitle) =>
          handleActions(
            selectedTask ? "update" : "add",
            selectedStatus,
            taskTitle
          )
        }
      />
    </div>
  );
};

export default KanbanBoard;
