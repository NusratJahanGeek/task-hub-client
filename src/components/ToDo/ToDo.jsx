const ToDo = ({ toDo, handleCompleteTask, handleDeleteTask, draggable, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop }) => {

  const handleComplete = (taskId, completed) => {
    const updatedTask = {
      ...toDo,
      status: completed ? "Completed" : "Pending",
    };
    handleCompleteTask(taskId, updatedTask);
  };
  

const handleDelete = (taskId) => {
  handleDeleteTask(taskId);
};


  return (
    <li
      className="bg-white p-4 rounded mb-4 shadow space-y-3"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">{toDo.title}</h3>
        <p className="text-md text-gray-500">{toDo.description}</p>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={toDo.status === "Completed"}
          onChange={() => handleComplete(toDo._id, toDo.status === "Pending")}
        />
        <button
          className="text-red-500 hover:text-red-700 ml-4"
          onClick={() => handleDelete(toDo._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ToDo;