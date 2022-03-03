const { 
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop   
} = require("./farm");

//getYieldForPlant
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
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
