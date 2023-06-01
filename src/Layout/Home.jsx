import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import ToDoList from "../components/ToDoList/ToDoList";
import { FaTasks } from "react-icons/fa";
import backgroundImg from "../assets/background.jpg";

const Home = () => {
  const [inputTask, setInputTask] = useState("");
  const [toDos, setToDos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredToDos, setFilteredToDos] = useState([]);

  const handleFilter = () => {
    switch (status) {
      case "completed":
        setFilteredToDos(toDos.filter((toDo) => toDo.completed === true));
        break;
      case "progress":
        setFilteredToDos(toDos.filter((toDo) => toDo.progress === true));
        break;
      case "pending":
        setFilteredToDos(toDos.filter((toDo) => toDo.pending === true));
        break;
      default:
        setFilteredToDos(toDos);
        break;
    }
  };

  useEffect(() => {
    handleFilter();
  }, [toDos, status]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white bg-opacity-75 rounded-md p-8">
        <h1 className="text-3xl font-bold mb-6">
          <FaTasks className="inline-block mr-2" />
          To Do List
        </h1>
        <TaskForm
          inputTask={inputTask}
          setInputTask={setInputTask}
          toDos={toDos}
          setToDos={setToDos}
          setStatus={setStatus}
        />
        <ToDoList
          toDos={toDos}
          setToDos={setToDos}
          filteredToDos={filteredToDos}
        />
      </div>
    </div>
  );
};

export default Home;
