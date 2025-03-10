require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28", // Ensure this matches the Solidity version in your contract
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
