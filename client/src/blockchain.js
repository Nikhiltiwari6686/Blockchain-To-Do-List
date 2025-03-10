import { ethers } from "ethers";
import ToDoList from "./TodoListABI.json"; 

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const contractABI = ToDoList.abi;

const getEthereumContract = async () => {
  if (!window.ethereum) {
    console.error("No Ethereum wallet found.");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};

export const fetchTasks = async () => {
  try {
    const contract = await getEthereumContract();
    if (!contract) return [];

    const tasks = await contract.getTasks(); 
    console.log("Fetched tasks:", tasks);

    return tasks.map((task, index) => ({
      id: index,
      content: task.content,
      completed: task.completed,
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const addTask = async (content) => {
  try {
    const contract = await getEthereumContract();
    if (!contract) return;

    const tx = await contract.createTask(content);
    await tx.wait(); // Wait for transaction to be mined
    console.log("Task added:", content);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const toggleComplete = async (taskId) => {
  try {
    const contract = await getEthereumContract();
    if (!contract) return;

    const tx = await contract.toggleTaskCompleted(taskId);
    await tx.wait();
    console.log("Task toggled:", taskId);
  } catch (error) {
    console.error("Error toggling task:", error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const contract = await getEthereumContract();
    if (!contract) return;

    const tx = await contract.deleteTask(taskId);
    await tx.wait();
    console.log("Task deleted:", taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
