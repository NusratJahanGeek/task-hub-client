import { useState } from "react";

const TaskForm = ({ inputTask, setInputTask, setToDos, toDos, setStatus }) => {
  const handleAddTask = (e) => {
    setInputTask(e.target.value);
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    setToDos([
      ...toDos,
      { text: inputTask, completed: false, id: Math.random() * 1000 },
    ]);
    setInputTask("");
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form className="mb-4">
      <input
        onChange={handleAddTask}
        value={inputTask}
        type="text"
        name="task"
        placeholder="Enter Task Here"
        className="border border-gray-300 px-4 py-2 rounded"
      />
      <button
        onClick={handleSubmitTask}
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      <select
        onChange={handleStatus}
        name="todos"
        className="border border-gray-300 px-4 py-2 rounded ml-2"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="progress">In Progress</option>
        <option value="pending">Pending</option>
      </select>
    </form>
  );
};

export default TaskForm;
