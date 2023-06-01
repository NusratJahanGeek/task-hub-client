import './ToDo.css'
const ToDo = ({ toDoText, toDos, setToDos, toDo }) => {
    const handleCompleteTask = () => {
      setToDos(
        toDos.map((item) => {
          if (item.id === toDo.id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        })
      );
    };
  
    const handleDeleteTask = () => {
      setToDos(toDos.filter((item) => item.id !== toDo.id));
    };
  
    return (
      <div className="flex items-center justify-between py-2">
        <li
          className={`todo ${toDo.completed ? "completed" : ""}`}
          onClick={handleCompleteTask}
        >
          {toDoText}
        </li>
        <div>
          <button
            onClick={handleCompleteTask}
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
          >
            Complete
          </button>
          <button
            onClick={handleDeleteTask}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default ToDo;
  