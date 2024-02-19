import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import AppContext from './AppContext';
import './App.css'; // Импортируем стили

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <AppContext.Provider value={{ deleteTask, toggleTask }}>
      <div className="container"> {/* Добавляем класс контейнера */}
        <h1>Task Manager</h1>
        <AddTaskForm onAdd={addTask} />
        <div className="task-manager"> {/* Добавляем класс для области задач */}
          <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
