import React, { useState } from 'react';

function App() {
  // Estado para manejar las tareas y la tarea editada
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // Función para agregar o editar tareas
  const handleTaskSubmit = () => {
    if (taskInput.trim() === '') return;

    if (editMode) {
      // Si estamos en modo edición, actualizamos la tarea
      setTasks(tasks.map(task => 
        task.id === editTaskId ? { ...task, text: taskInput } : task
      ));
      setEditMode(false);
      setEditTaskId(null);
    } else {
      // Si estamos creando una nueva tarea, la agregamos
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    setTaskInput('');
  };

  // Función para eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Función para marcar una tarea como completada
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Función para habilitar el modo de edición
  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setTaskInput(taskToEdit.text);
    setEditMode(true);
    setEditTaskId(id);
  };

  return (
    <div className="min-h-screen bg-pink-500 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">To-Do List</h1>

        {/* Campo de texto y botón de agregar/editar tarea */}
        <div className="flex mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="border border-gray-300 p-2 rounded-l-md w-full"
            placeholder="Añadir o editar tarea"
          />
          <button
            onClick={handleTaskSubmit}
            className="bg-blue-500 text-white p-2 rounded-r-md ml-2"
          >
            {editMode ? 'Actualizar' : 'Agregar'}
          </button>
        </div>

        {/* Lista de tareas */}
        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-2 border-b border-pink-500 rounded-md ${task.completed ? 'bg-pink-300' : ''}`}
            >
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                {task.text}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => editTask(task.id)}
                  className="text-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;



