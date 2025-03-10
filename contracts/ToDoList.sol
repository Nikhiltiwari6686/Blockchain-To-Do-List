// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ToDoList {
    struct Task {
        string content;
        bool completed;
    }

    Task[] public tasks;
    mapping(uint256 => address) public taskToOwner;
    event TaskCreated(uint256 taskId, string content, address owner);
    event TaskCompleted(uint256 taskId, bool completed);
    event TaskDeleted(uint256 taskId);

    function createTask(string memory _content) public {
        tasks.push(Task(_content, false));
        uint256 taskId = tasks.length - 1;
        taskToOwner[taskId] = msg.sender;
        emit TaskCreated(taskId, _content, msg.sender);
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function toggleTaskCompleted(uint256 _taskId) public {
        require(taskToOwner[_taskId] == msg.sender, "Not your task!");
        tasks[_taskId].completed = !tasks[_taskId].completed;
        emit TaskCompleted(_taskId, tasks[_taskId].completed);
    }

    function deleteTask(uint256 _taskId) public {
        require(taskToOwner[_taskId] == msg.sender, "Not your task!");
        delete tasks[_taskId];
        emit TaskDeleted(_taskId);
    }
}
