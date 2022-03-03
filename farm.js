const getYieldForPlant = (plant, environmentFactors) => {
    
    if(!environmentFactors){
        return plant.yield;
    }
    
    let getSunFactor;
    let getWindFactor;

    if(environmentFactors.sun){
        const plantFactorSun = plant.factor.sun[environmentFactors.sun];
        getSunFactor = 100 + plantFactorSun;
    } else {
        getSunFactor = 100;
    }
  
    if (environmentFactors.wind){
        const plantFactorWind = plant.factor.wind[environmentFactors.wind] 
        getWindFactor = 100 + plantFactorWind;
    } else {
        getWindFactor = 100;
    }

    return plant.yield * getSunFactor/100 * getWindFactor/100;
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

const getCostsForCrop = (crops) => {
    const numberCrops = crops.numCrops
    const costCrop = crops.costPerCrop;
    const total = numberCrops * costCrop;
    return total;
}

const getRevenueForCrop = (crops) => {
    const numberCrops = crops.numCrops;
    const pricePerKiloCrop = crops.salesPrice;
    const yieldOfCrop = crops.crop.yield;

    const totalKiloCrops = numberCrops * yieldOfCrop;
    const revenuePerCrop = totalKiloCrops * pricePerKiloCrop;
    return revenuePerCrop;
}

const getProfitForCrop = (crops) => {
    const getCosts = getCostsForCrop(crops);
    const getRevenue = getRevenueForCrop(crops);
    const profitPerCrop = getRevenue - getCosts;
    return profitPerCrop;
}

const getTotalProfit = ({crops}) => {
    const eachCrop = crops.map((plant) => {
        const getCosts = getCostsForCrop(plant);
        const getRevenue = getRevenueForCrop(plant);
        const profitPerCrop = getRevenue - getCosts;
        return profitPerCrop;
    })
    const totalProfits = eachCrop.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
    });
    return totalProfits;    
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit    
};