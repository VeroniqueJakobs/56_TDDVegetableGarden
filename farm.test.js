const { 
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit     
} = require("./farm");

//getYieldForPlant
describe("getYieldForPlant", () => {
    test("Get yield for corn without environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for pumpkin without environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 20,
        };
        expect(getYieldForPlant(pumpkin)).toBe(20);
    });
});

describe("getYieldForPlant with environment factors", () => {
    test("Get yield for corn with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
        const environmentFactors = {
        sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

    test("Get yield for corn with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                low: -60,
                medium: 0,
                high: 50,
                },
            },
        };
        const environmentFactors = {
        sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(12);
    });

    test("Get yield for corn with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 60,
                },
            },
        };
        const environmentFactors = {
        sun: "high",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(48);
    });

    test("Get yield for pumpkin with multiple environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 40,
            factor: {
                sun: {
                    low: -70,
                    medium: 0,
                    high: 70,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 50,
                }
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
        expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(18);
    });
});

//getYieldForCrop
describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

//getTotalYield
describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

//getCostsForCrop
describe("getCostsForCrop", () => {
    test("Get costs for crops", () => {
        const corn = {
            name: "corn",
            yield:3,
        };
        const crops = { crop: corn, numCrops: 10, costPerCrop:1 };
        expect(getCostsForCrop(crops)).toBe(10);
    });

    test("Get costs for crops", () => {
        const pumpkin = {
            name: "pumpkin",
            yield:4,
        };
        const crops = { crop: pumpkin, numCrops: 12, costPerCrop:2 };
        expect(getCostsForCrop(crops)).toBe(24);
    });
})

//getRevenueForCrop   
describe("getRevenueForCrop", () => {
    test("Get revenue for crop", () => {
        const corn = {
            name: "corn",
            yield:3,
        };
        const crops = { crop: corn, numCrops: 10, salesPrice:2 };
        expect(getRevenueForCrop(crops)).toBe(60);   //(numCrops * yield) * salesprice
    });

    test("Get costs for crop", () => {
        const pumpkin = {
            name: "pumpkin",
            yield:4,
        };
        const crops = { crop: pumpkin, numCrops: 12, salesPrice:4 };
        expect(getRevenueForCrop(crops)).toBe(192);  //12 * 4= 48  48 + 4 = 196
    });

})


//getProfitForCrop 
describe("getProfitForCrop", () => {
    test("Get profit for crop", () => {
        const corn = {
            name: "corn",
            yield:3,
        };
        const crops = { crop: corn, numCrops: 10, costPerCrop:1, salesPrice:2 };
        expect(getProfitForCrop(crops)).toBe(50);
    });  

    test("Get profit for crop", () => {
        const pumpkin = {
            name: "pumpkin",
            yield:4,
        };
        const crops = { crop: pumpkin, numCrops: 12, costPerCrop:2, salesPrice:4 };
        expect(getProfitForCrop(crops)).toBe(168);
    });
})

//getTotalProfit 
describe("getTotalProfit ", () => {
    test("Get total profit for crops", () => {
        const corn = {
            name: "corn",
            yield:3,
        };
     
        const pumpkin = {
            name: "pumpkin",
            yield:4,
        };

        const crops = [
            {crop: corn, numCrops: 10, costPerCrop:1, salesPrice:2},  
            {crop: pumpkin, numCrops: 12, costPerCrop:2, salesPrice:4}
        ];
        expect(getTotalProfit({crops})).toBe(218);
    });
})
