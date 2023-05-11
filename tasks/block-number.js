const { task } = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
  // async function blockNumber() {}
  // const blocknumber = async () => {}
  async (taskArgs, hre) => {
    const blocknumber = await hre.ethers.provider.getBlockNumber();
    console.log(`block number : ${blocknumber}`);
  }
);

module.exports = {};
