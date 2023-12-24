import React, { useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../store/slices/taskSlice";
import Modal from "./Modal";

const Task = ({ task, status }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask({ status, task: { ...task, ...updatedTask } }));
    closeModal();
  };

  const handleDeleteTask = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask({ status, id: task.id }));
    }
  };
  return (
    <div className="p-4 border-2 bg-white rounded-md cursor-pointer hover:bg-blue-200">
      <li className="text-stone-500">{task.title}</li>
      <div className="flex justify-end">
        <button onClick={openModal} className="mr-2">
          <FaRegEdit />
        </button>
        <button onClick={handleDeleteTask}>
          <FaTrashAlt />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Edit Task - ${task.title}`}
        onSubmit={handleUpdateTask}
        task={task}
      />
    </div>
  );
};

export default Task;
