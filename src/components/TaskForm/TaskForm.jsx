import { useState } from "react";
import { FaPlus, FaTasks, FaTimes } from "react-icons/fa";

const TaskForm = ({ addTask }) => {
  const [closedForm, showClosedForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleFormToggler = () => {
    showClosedForm(!closedForm);
  };

  const handleAddTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleAddDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAddStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim() !== "") {
      addTask({ title: taskTitle, description: taskDescription, status });
      setTaskTitle("");
      setTaskDescription("");
      setStatus("Pending");
      showClosedForm(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-12 scroll-m-3">
        <h1 className="text-4xl font-bold mr-6">
          <FaTasks className="inline-block mr-2" />
          Task Manager
        </h1>
        <div className="flex items-center">
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded mt-2 flex items-center"
            onClick={handleFormToggler}
          >
            <FaPlus className="mr-2" />
            Add Task
          </button>
        </div>
      </div>

      {closedForm && (
        <div className="fixed inset-0 flex justify-center items-center z-10 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-10 rounded w-96">
            <div className="flex justify-end -mt-4 mb-4">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={handleFormToggler}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <input
                  onChange={handleAddTitle}
                  type="text"
                  name="task"
                  placeholder="Enter Task Title Here"
                  className="border border-gray-300 px-4 py-2 rounded w-full"
                  value={taskTitle}
                />
              </div>
              <div>
                <textarea
                  onChange={handleAddDescription}
                  name="description"
                  placeholder="Enter Task Description Here"
                  className="border border-gray-300 px-4 py-2 rounded w-full"
                  value={taskDescription}
                ></textarea>
              </div>
              <div className="mb-4">
                <select
                  onChange={handleAddStatus}
                  value={status}
                  className="border border-gray-300 px-4 py-2 rounded w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button
                onClick={handleAddTask}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Submit Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
