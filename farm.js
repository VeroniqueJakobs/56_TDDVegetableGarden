const getYieldForPlant = (plant) => {
    return plant.yield;
}

const getYieldForCrop = (input) => {
    const totalYieldForCrop = input.crop.yield * input.numCrops;
    return totalYieldForCrop;
}




module.exports = {
    getYieldForPlant,
    getYieldForCrop 
};