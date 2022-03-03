const getYieldForPlant = (plant) => {
    return plant.yield;
}

const getYieldForCrop = (input) => {
    const totalYieldForCrop = input.crop.yield * input.numCrops;
    return totalYieldForCrop;
}

const getTotalYield = ({crops}) => {
    const eachCrop = crops.map((plant) => {
        const yieldOfCrop = plant.crop.yield;
        const numberOfCrops = plant.numCrops;
        const totalYieldOfCrop = yieldOfCrop * numberOfCrops;
        return totalYieldOfCrop;
    })
    const totalOfAllYields = eachCrop.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
    });
    return totalOfAllYields;    
}


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield 
};