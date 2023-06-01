import ToDo from "../ToDo/ToDo";

const ToDoList = ({ toDos, setToDos, filteredToDos }) => {
  return (
    <div>
      <ul>
        {filteredToDos.map((toDo) => (
          <ToDo
            key={toDo.id}
            toDoText={toDo.text}
            toDos={toDos}
            setToDos={setToDos}
            toDo={toDo}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
