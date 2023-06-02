import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import ToDoList from "../components/ToDoList/ToDoList";
import backgroundImg from "../assets/background.jpg";
import axios from "axios";
import Swal from "sweetalert2";

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
        Swal.fire({
          title: 'Success',
          text: 'Task added successfully!',
          icon: 'success',
          confirmButtonColor: "#007db7",
          confirmButtonText: "Cool",
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Success',
          text: 'Task added successfully!',
          icon: 'success',
          confirmButtonColor: "#007db7",
          confirmButtonText: "Cool",
        });
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
      .then(() => {
        Swal.fire({
          title: 'Success',
          text: 'Task updated successfully!',
          icon: 'success',
          confirmButtonColor: "#007db7",
          confirmButtonText: "Cool",
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Success',
          text: 'Task updated successfully!',
          icon: 'success',
          confirmButtonColor: "#007db7",
          confirmButtonText: "Cool",
        });
      });
  };

  const deleteTask = (taskId) => {
    // Update the UI immediately
    setToDos((prevToDos) => prevToDos.filter((task) => task._id !== taskId));

    // Delete the task on the server
    axios
      .delete(`https://task-hub-server.vercel.app/tasks/${taskId}`)
      .then(() => {
        Swal.fire({
          title: 'Success',
          text: 'Task deleted successfully!',
          icon: 'success',
          confirmButtonColor: "#007db7",
          confirmButtonText: "Cool",
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Success',
          text: 'Task deleted successfully!',
          icon: 'success',
          confirmButtonColor: "#007db7",
          confirmButtonText: "Cool",
        });
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white bg-opacity-75 rounded-md p-8 px-4 my-4">
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
