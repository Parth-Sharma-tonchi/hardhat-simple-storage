const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("simpleStorage", function () {
    let simpleStorage, simpleStorageFactory
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("simpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a number 0", async function () {
        const currentvalue = await simpleStorage.retrieve()
        const expectedvalue = "0"
        assert.equal(currentvalue.toString(), expectedvalue)
    })

    it("Should update when we call ", async function () {
        const expectedvalue = "24"
        const transactionResponse = await simpleStorage.store("24")
        await transactionResponse.wait(1)

        const updatedvalue = await simpleStorage.retrieve()
        assert.equal(expectedvalue, updatedvalue.toString())
    })

    // it("Should store favourite number and name", async function () {
    //     const people1 = await simpleStorage.addmember("29", "Parth")
    // })
})
