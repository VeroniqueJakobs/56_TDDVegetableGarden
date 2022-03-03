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
    test("Get yield for crop pumpkin without environment factors", () => {
        const corn = {
            name: "corn",
            yield: 8,
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

        const input = {
            crop: corn,
            numCrops: 21,
        };

        expect(getYieldForCrop(input)).toBe(168);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop pumpkin with environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 3,
            factor: {
                sun: {
                    low: -80,
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
        const input = {
            crop: pumpkin,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(6);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop corn with multiple environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
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
        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(13.5);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop pumpkin with multiple environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 8,
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
        const input = {
            crop: pumpkin,
            numCrops: 21,
        };

        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(114.24);
    });
});

//getTotalYield
describe("getTotalYield", () => {
    test("Get total yield for crops with multiple environment factors", () => {
        const corn = {
            name: "corn",
            yield: 8, 
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
            }
        };
        const pumpkin = {
             name: "pumpkin",
             yield: 3,
             factor: {
                 sun: {
                     low: -80,
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
        const crops = [
            {crop: corn, numCrops: 20},
            {crop: pumpkin, numCrops: 20}
        ];

        const environmentFactors = {
            sun: "high", 
           wind: "high"
          }
        
        expect(getTotalYield(crops, environmentFactors)).toBe(561);
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
    test("Get revenue for crop corn without environment factors", () => {
        const corn = {
            name: "corn",
            yield:3,
        };
        
        const crop = { crop: corn, numCrops: 10, salesPrice:2 };
        expect(getRevenueForCrop(crop)).toBe(60);   
    });
})

describe("getRevenueForCrop", () => {
    test("Get revenue for crop corn with multiple environment factors", () => {
        const corn = {
            name: "corn",
            yield:3,
            factor: {
                sun: {
                    low: -80,
                    medium: 0,
                    high: 70,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 50,
                }
            }
        };
        const environmentFactors = {
            sun: "high", 
           wind: "high"
        }

        const crop = { crop: corn, numCrops: 10, salesPrice:2 };
        expect(getRevenueForCrop(crop, environmentFactors)).toBe(153);  
    });

    test("Get revenue for crop pumpkin with multiple environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield:4,
            factor: {
                sun: {
                    low: -60,
                    medium: 0,
                    high: 70,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 70,
                }
            }
        };
        const environmentFactors = {
            sun: "low", 
           wind: "high"
        }
        
        const crop = { crop: pumpkin, numCrops: 10, salesPrice:5 };
        expect(getRevenueForCrop(crop, environmentFactors)).toBe(136);
    });
})

//getProfitForCrop 
describe("getProfitForCrop", () => {
    test("Get profit for crop corn without multiple environment factors", () => {
        const corn = {
            name: "corn",
            yield:3,
        };
        
        const crop = { crop: corn, numCrops: 10, salesPrice:2, costPerCrop:2 };
        expect(getProfitForCrop(crop)).toBe(40);  
    });
})

describe("getProfitForCrop", () => {
    test("Get profit for crop corn with multiple environment factors", () => {
        const corn = {
            name: "corn",
            yield:3,
            factor: {
                sun: {
                    low: -80,
                    medium: 0,
                    high: 70,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 50,
                }
            }
        };
        const environmentFactors = {
            sun: "high", 
           wind: "high"
        }

        const crop = { crop: corn, numCrops: 20, salesPrice:2, costPerCrop:2 };
        expect(getProfitForCrop(crop, environmentFactors)).toBe(266);  
    });

    test("Get profit for crop pumpkin with multiple environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield:4,
            factor: {
                sun: {
                    low: -60,
                    medium: 0,
                    high: 70,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 70,
                }
            }
        };
        const environmentFactors = {
            sun: "low", 
           wind: "high"
        }
        
        const crop = { crop: pumpkin, numCrops: 10, salesPrice:5, costPerCrop:4 };
        expect(getProfitForCrop(crop, environmentFactors)).toBe(96);
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

describe("getTotalProfit", () => {
    test("Get total profit for crops with multiple environment factors", () => {
        const corn = {
            name: "corn",
            yield: 8, 
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
            }
        };
        const pumpkin = {
             name: "pumpkin",
             yield: 3,
             factor: {
                 sun: {
                     low: -80,
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
        const crops = [
            {crop: corn, numCrops: 20, salesPrice:5, costPerCrop:4 },
            {crop: pumpkin, numCrops: 20, salesPrice:7, costPerCrop:1 }
        ];

        const environmentFactors = {
            sun: "high", 
           wind: "high"
          }
        
        expect(getTotalProfit(crops, environmentFactors)).toBe(3011);
    });
});