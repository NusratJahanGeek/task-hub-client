import { useState } from "react";
import ToDo from "../ToDo/ToDo";

const ToDoList = ({ toDos, updateTask, deleteTask }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);

  const handleDragStart = (taskId) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (event, status) => {
    event.preventDefault();
    setDraggedOver(status);
  };

  const handleDragEnter = (event, status) => {
    event.preventDefault();
    setDraggedOver(status);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggedOver(null);
  };

  const handleDrop = (event, status) => {
    event.preventDefault();
    event.stopPropagation();
  
    if (draggedTask) {
      const updatedTask = {
        ...toDos.find((task) => task._id === draggedTask),
        status,
      };
  
      updateTask(draggedTask, updatedTask);
    }
  
    setDraggedTask(null);
    setDraggedOver(null);
  };
  
  

  const handleCompleteTask = (taskId, completed) => {
    const updatedTask = {
      ...toDos.find((task) => task._id === taskId),
      status: completed ? "Completed" : "In Progress",
    };
    updateTask(taskId, updatedTask);
  };
  

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const inProgressTasks = toDos.filter((task) => task.status === "In Progress");
  const pendingTasks = toDos.filter((task) => task.status === "Pending");
  const completedTasks = toDos.filter((task) => task.status === "Completed");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="card bg-slate-100 p-6 flex-1"
        onDragOver={(event) => handleDragOver(event, "Pending")}
        onDragEnter={(event) => handleDragEnter(event, "Pending")}
        onDragLeave={handleDragLeave}
        onDrop={(event) => handleDrop(event, "Pending")}
      >
        <h2 className="text-2xl font-bold pb-6 border-b-4 text-center">Pending</h2>
        <ul>
          {pendingTasks.map((toDo) => (
            <ToDo
            key={toDo._id} 
            toDo={toDo}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            draggable
            onDragStart={() => handleDragStart(toDo._id)}
            onDragEnd={handleDragEnd}
            onDragOver={(event) => handleDragOver(event, toDo.status)}
            onDragEnter={(event) => handleDragEnter(event, toDo.status)}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, toDo.status)}
          />
          ))}
        </ul>
      </div>

      <div className="card bg-slate-100 p-6 flex-1"
        onDragOver={(event) => handleDragOver(event, "In Progress")}
        onDragEnter={(event) => handleDragEnter(event, "In Progress")}
        onDragLeave={handleDragLeave}
        onDrop={(event) => handleDrop(event, "In Progress")}
      >
        <h2 className="text-2xl font-bold pb-6 border-b-4 text-center">In Progress</h2>
        <ul>
          {inProgressTasks.map((toDo) => (
            <ToDo
              key={toDo._id}
              toDo={toDo}
              handleCompleteTask={handleCompleteTask}
              handleDeleteTask={handleDeleteTask}
              draggable
              onDragStart={() => handleDragStart(toDo._id)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </ul>
      </div>

      <div className="card bg-slate-100 p-6 flex-1"
        onDragOver={(event) => handleDragOver(event, "Completed")}
        onDragEnter={(event) => handleDragEnter(event, "Completed")}
        onDragLeave={handleDragLeave}
        onDrop={(event) => handleDrop(event, "Completed")}
      >
        <h2 className="text-2xl font-bold pb-6 border-b-4 text-center">Completed</h2>
        <ul>
          {completedTasks.map((toDo) => (
            <ToDo
            key={toDo._id}
            toDo={toDo}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            draggable
            onDragStart={() => handleDragStart(toDo._id)}
            onDragEnd={handleDragEnd}
            onDragOver={(event) => handleDragOver(event, toDo.status)}
            onDragEnter={(event) => handleDragEnter(event, toDo.status)}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, toDo.status)}
          />
          
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
