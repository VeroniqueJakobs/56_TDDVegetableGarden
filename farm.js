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

const getYieldForCrop = (input, environmentFactors) => {
       
    if(!environmentFactors){
        return input.crop.yield * input.numCrops
    } 
  
    if(environmentFactors.sun){
        const cropFactorSun = input.crop.factor.sun[environmentFactors.sun] ;
        getSunFactor = 100 + cropFactorSun;
    } else {
        getSunFactor = 100;
    }
  
    if (environmentFactors.wind){
        const cropFactorWind = input.crop.factor.wind[environmentFactors.wind] ;
        getWindFactor = 100 + cropFactorWind;
    } else {
        getWindFactor = 100;
    }

    return (input.crop.yield * input.numCrops) * getSunFactor/100 * getWindFactor/100;
}

const getTotalYield = (crops, environmentFactors) => {

    const eachCrop = crops.map((crop) => {
        if(!environmentFactors){
            return crop.crop.yield * crop.numCrops
        } 
      
        if(environmentFactors.sun){
            const cropFactorSun = crop.crop.factor.sun[environmentFactors.sun];
            getSunFactor = 100 + cropFactorSun;
        } else {
            getSunFactor = 100;
        }
      
        if (environmentFactors.wind){
            const cropFactorWind = crop.crop.factor.wind[environmentFactors.wind] ;
            getWindFactor = 100 + cropFactorWind;
        } else {
            getWindFactor = 100;
        }

        return (crop.crop.yield * crop.numCrops) * getSunFactor/100 * getWindFactor/100;
    })
    
        const totalOfAllYields = eachCrop.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
        })
        
        return totalOfAllYields;    
}

const getCostsForCrop = (crops) => {
    const numberCrops = crops.numCrops
    const costCrop = crops.costPerCrop;
    const total = numberCrops * costCrop;
    return total;
}

const getRevenueForCrop = (crop, environmentFactors) => {

    if(!environmentFactors){
        return (crop.crop.yield * crop.numCrops) * crop.salesPrice;
    }
      
    if(environmentFactors.sun){
        const cropFactorSun = crop.crop.factor.sun[environmentFactors.sun];
        getSunFactor = 100 + cropFactorSun;
    } else {
        getSunFactor = 100;
    }
  
    if (environmentFactors.wind){
        const cropFactorWind =crop.crop.factor.wind[environmentFactors.wind] ;
        getWindFactor = 100 + cropFactorWind;
    } else {
        getWindFactor = 100;
    }

    const amountYield = (crop.crop.yield * crop.numCrops) * getSunFactor/100 * getWindFactor/100;
    const revenuePerCrop = amountYield * crop.salesPrice;
    return revenuePerCrop ;
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