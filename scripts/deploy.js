//imports
const { ethers, run } = require("hardhat");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("simpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to : ${simpleStorage.address}`);

  if (process.env.ETHERSCAN_API_KEY && network.config.chainId === 11155111) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentvalue = await simpleStorage.retrieve();
  console.log(`current value : ${currentvalue}`);

  const transactionResponse = await simpleStorage.store(7);
  console.log("Waiting for txes response...");

  const updatedValue = await simpleStorage.retrieve();
  console.log(`updated value : ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
