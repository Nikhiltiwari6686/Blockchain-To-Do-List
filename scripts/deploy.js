const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.getContractFactory("ToDoList");
  const todo = await ToDoList.deploy();

  await todo.waitForDeployment();
  console.log("ToDoList contract deployed to:", await todo.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
