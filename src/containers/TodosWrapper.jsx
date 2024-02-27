import Filter from "../components/Filter";
import Heading from "../components/Heading";
import TasksList from "../components/TasksList";
import TaskInput from "../components/TaskInput";
import { useEffect, useState, useCallback } from "react";

import "./TodosWrapper.css";

const apiUrl = import.meta.env.VITE_API_URL;

const TodosApp = () => {
  // valor del input
  const [description, setDescription] = useState("");
  //array de tareas
  const [tasks, setTasks] = useState([]);
  //valor de la tarea modificada
  const [updatedDescription, setUpdatedDescription] = useState();
  //refresh
  const [refresh, toggle] = useState(false);
  const [isSelected, setIsSelected] = useState(null);

  //añadir una tarea a la lista de tasks con el input
  const addTask = useCallback(
    async (e, description) => {
      try {
        e.preventDefault();

        const newTask = {
          description,
        };

        const backendResponse = await fetch(`${apiUrl}tasks`, {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!backendResponse.ok) {
          throw new Error(
            `Error: ${backendResponse.status} - ${backendResponse.statusText}`
          );
        }

        toggle(!refresh);
        setDescription("");
      } catch (error) {
        console.error("Error en la operación de agregar tarea:", error.message);
      }
    },
    [refresh]
  );

  //eliminar una tarea de la lista de tasks con el buton de eliminar
  const handleDeleteClick = useCallback(
    async (task) => {
      try {
        const backendResponse = await fetch(
          `${apiUrl}/tasks/${task._id}`,
          {
            method: "DELETE",
            body: JSON.stringify(task),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!backendResponse.ok) {
          throw new Error(
            `Error: ${backendResponse.status} - ${backendResponse.statusText}`
          );
        }
        toggle(!refresh);
      } catch (error) {
        console.error(
          "Error en la operación de eliminar tarea:",
          error.message
        );
      }
    },
    [refresh]
  );

  //completar una tarea de la lista de tasks
  const handleCompletedTask = useCallback(
    async (task) => {
      try {
        const updatedTask = { ...task, completed: !task.completed };

        const backendResponse = await fetch(
          `${apiUrl}/tasks/complete/${task._id}`,
          {
            method: "PATCH",
            body: JSON.stringify(updatedTask),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!backendResponse.ok) {
          throw new Error(
            `Error: ${backendResponse.status} - ${backendResponse.statusText}`
          );
        }
        toggle(!refresh);
      } catch (error) {
        console.error(
          "Error en la operación de completar tarea:",
          error.message
        );
      }
    },
    [refresh]
  );

  //editar una tarea de la lista de tasks
  const enterInEditingMode = (task) => {
    const updatedTask = { ...task, editing: true };
    const updatedList = tasks.map((t) => {
      return t === task ? updatedTask : t;
    });
    setTasks(updatedList);
    setUpdatedDescription(task.description);
    console.log("editando");
  };
  const handleUpdateTask = useCallback(
    async (e, task) => {
      try {
        e.preventDefault();

        const updatedTask = {
          ...task,
          description: updatedDescription,
          editing: false,
        };
        const backendResponse = await fetch(
          `${apiUrl}/tasks/${task._id}`,
          {
            method: "PATCH",
            body: JSON.stringify(updatedTask),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!backendResponse.ok) {
          throw new Error(
            `Error: ${backendResponse.status} - ${backendResponse.statusText}`
          );
        }

        toggle(!refresh);
      } catch (error) {
        console.error(
          "Error en la operación de modificar tarea:",
          error.message
        );
      }
    },
    [refresh, updatedDescription]
  );

  const getDateOffset = (offset) => {
    const today = new Date();
    today.setDate(today.getDate() + offset);
    return today;
  };
  const getMonthOffset = (fecha) => {
    const monthNames = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const currentMonthIndex = monthNames[fecha.getMonth()];
    return currentMonthIndex;
  };

  const filterDate = async (clickedDate) => {
    try {
      setIsSelected(clickedDate);
      if (!clickedDate) {
        console.error("La fecha seleccionada es undefined");
        return;
      }

      const formattedDate = clickedDate.toISOString().split("T")[0];

      const response = await fetch(
        `${apiUrl}/tasks/date/${formattedDate}`
      );
      const data = await response.json();
      // Actualiza el estado del componente con las tareas filtradas

      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas por fecha:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await filterDate(new Date());
      } catch (error) {
        console.error("Error al obtener tareas por fecha:", error);
      }
    };

    fetchData();
  }, [refresh]);
  //visual
  return (
    <div className="todos-container">
      <Heading />
      <TaskInput
        addTask={addTask}
        description={description}
        setDescription={setDescription}
      />
      <Filter
        getDateOffset={getDateOffset}
        filterDate={filterDate}
        getMonthOffset={getMonthOffset}
        isSelected={isSelected}
      />
      <TasksList
        tasks={tasks}
        handleDeleteClick={handleDeleteClick}
        handleCompletedTask={handleCompletedTask}
        enterInEditingMode={enterInEditingMode}
        updatedDescription={updatedDescription}
        setUpdatedDescription={setUpdatedDescription}
        updateTask={handleUpdateTask}
      />
    </div>
  );
};

export default TodosApp;
