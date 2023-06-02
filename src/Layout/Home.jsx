import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import ToDoList from "../components/ToDoList/ToDoList";
import backgroundImg from "../assets/background.jpg";
import axios from "axios";

const Home = () => {
  const [toDos, setToDos] = useState([]);

  const addTask = (newTask) => {
    // Update the UI immediately
    setToDos((prevToDos) => [...prevToDos, newTask]);
  
    // Make the HTTP request to add the task
    axios
    .post("https://task-hub-server.vercel.app/tasks", newTask)
    .then((response) => {
      // Update the UI with the added task
      const addedTask = response.data;
      setToDos((prevToDos) =>
        prevToDos.map((toDo) => (toDo._id === newTask._id ? addedTask : toDo))
      );
    })
    .catch((error) => {
      console.error("Error adding task:", error);
      // Display an error message or perform other actions
    });
  
  };

  useEffect(() => {
    axios
      .get("https://task-hub-server.vercel.app/tasks")
      .then((response) => {
        setToDos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const updateTask = (taskId, updatedTask) => {
    // Update the UI immediately
    const updatedToDos = toDos.map((task) =>
      task._id === taskId ? updatedTask : task
    );
    setToDos(updatedToDos);

    // Update the task on the server
    axios
      .put(`https://task-hub-server.vercel.app/tasks/${taskId}`, updatedTask)
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const deleteTask = (taskId) => {
    // Update the UI immediately
    setToDos((prevToDos) => prevToDos.filter((task) => task._id !== taskId));

    // Delete the task on the server
    axios
      .delete(`https://task-hub-server.vercel.app/tasks/${taskId}`)
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white bg-opacity-75 rounded-md p-8 my-4">
        <TaskForm addTask={addTask} />
        <ToDoList
          toDos={toDos}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Home;
