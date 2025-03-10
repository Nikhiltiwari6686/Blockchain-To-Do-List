import React, { useState, useEffect, useCallback } from "react";
import { connectWallet, fetchTasks, addTask, toggleComplete, deleteTask } from "./blockchain";

const App = () => {
  const [account, setAccount] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const loadTasks = useCallback(async () => {
    console.log("Loading tasks...");
    const tasksData = await fetchTasks();
    console.log("Tasks loaded:", tasksData);
    setTasks(tasksData);
  }, []);

  const checkWallet = useCallback(async () => {
    console.log("Checking wallet...");
    const userAccount = await connectWallet();
    if (userAccount) {
      setAccount(userAccount);
      await loadTasks();
    }
  }, [loadTasks]);

  useEffect(() => {
    checkWallet();
  }, [checkWallet]);

  const handleAddTask = async () => {
    if (!newTask) return;
    console.log("Adding task:", newTask);
    await addTask(newTask);
    setNewTask("");
    setTimeout(() => loadTasks(), 2000); 
  };

  const handleToggleComplete = async (id) => {
    console.log("Toggling task:", id);
    await toggleComplete(id);
    setTimeout(() => loadTasks(), 2000);
  };

  const handleDeleteTask = async (id) => {
    console.log("Deleting task:", id);
    await deleteTask(id);
    setTimeout(() => loadTasks(), 2000);
  };

  return (
    <div>
      <h1>Blockchain To-Do List</h1>
      <button onClick={checkWallet}>
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.content} - {task.completed ? "✅" : "❌"}
            <button onClick={() => handleToggleComplete(task.id)}>Toggle</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
