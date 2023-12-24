import React, { useState } from "react";

const Modal = ({ isOpen, onClose, title, onSubmit, task }) => {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
    onClose();
  };
  return (
    isOpen && (
      <div className=" fixed inset-0 flex items-center justify-center">
        <div className=" bg-slate-600 fixed opacity-75 inset-0"></div>
        <div className=" bg-stone-200 p-6 rounded-lg z-10">
          <h2 className=" text-xl font-bold mb-4">{title}</h2>
          <input
            type="text"
            className=" w-full border p-2 mb-4 "
            placeholder="Enter your task"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className=" px-6 py-2 rounded-md bg-stone-500 text-stone-50 mt-10  hover:bg-stone-950"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className=" ml-2 px-6 py-2 rounded-md bg-stone-500 text-stone-50 mt-10 hover:bg-stone-950"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
