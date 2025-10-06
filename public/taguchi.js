const ORTHOGONAL_ARRAYS_2_LEVEL = {
    L4: [
        [1, 1, 1],
        [1, 2, 2],
        [2, 1, 2],
        [2, 2, 1]
    ],
    L8: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 2, 2, 2, 2],
        [1, 2, 2, 1, 1, 2, 2],
        [1, 2, 2, 2, 2, 1, 1],
        [2, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 2, 1, 2, 1],
        [2, 2, 1, 1, 2, 2, 1],
        [2, 2, 1, 2, 1, 1, 2]
    ],
    L16: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2],
        [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
        [1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2],
        [1, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1],
        [1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1],
        [1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1],
        [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
        [2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1],
        [2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2],
        [2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2],
        [2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1]
    ]
};

const ORTHOGONAL_ARRAYS_3_LEVEL = {
    L9: [
        [1, 1, 1, 1],
        [1, 2, 2, 2],
        [1, 3, 3, 3],
        [2, 1, 2, 3],
        [2, 2, 3, 1],
        [2, 3, 1, 2],
        [3, 1, 3, 2],
        [3, 2, 1, 3],
        [3, 3, 2, 1]
    ],
    L27: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 3, 3, 3],
        [1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 1],
        [1, 2, 2, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2],
        [1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 2, 2, 2],
        [1, 3, 3, 3, 2, 2, 2, 1, 1, 1, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1],
        [2, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
        [2, 1, 2, 3, 2, 3, 1, 2, 3, 1, 2, 3, 1],
        [2, 1, 2, 3, 3, 1, 2, 3, 1, 2, 3, 1, 2],
        [2, 2, 3, 1, 1, 2, 3, 2, 3, 1, 3, 1, 2],
        [2, 2, 3, 1, 2, 3, 1, 3, 1, 2, 1, 2, 3],
        [2, 2, 3, 1, 3, 1, 2, 1, 2, 3, 2, 3, 1],
        [2, 3, 1, 2, 1, 2, 3, 3, 1, 2, 2, 3, 1],
        [2, 3, 1, 2, 2, 3, 1, 1, 2, 3, 3, 1, 2],
        [2, 3, 1, 2, 3, 1, 2, 2, 3, 1, 1, 2, 3],
        [3, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2],
        [3, 1, 3, 2, 2, 1, 3, 2, 1, 3, 2, 1, 3],
        [3, 1, 3, 2, 3, 2, 1, 3, 2, 1, 3, 2, 1],
        [3, 2, 1, 3, 1, 3, 2, 2, 1, 3, 3, 2, 1],
        [3, 2, 1, 3, 2, 1, 3, 3, 2, 1, 1, 3, 2],
        [3, 2, 1, 3, 3, 2, 1, 1, 3, 2, 2, 1, 3],
        [3, 3, 2, 1, 1, 3, 2, 3, 2, 1, 2, 1, 3],
        [3, 3, 2, 1, 2, 1, 3, 1, 3, 2, 3, 2, 1],
        [3, 3, 2, 1, 3, 2, 1, 2, 1, 3, 1, 3, 2]
    ]
};

class TaguchiOptimizer {
    constructor(levelType = 2) {
        this.parameters = [];
        this.experiments = [];
        this.results = [];
        this.levelType = levelType;
    }

    setLevelType(levelType) {
        this.levelType = levelType;
    }

    addParameter(name, lowValue, highValue, middleValue = null) {
        const param = {
            name: name,
            low: lowValue,
            high: highValue
        };
        if (this.levelType === 3 && middleValue !== null) {
            param.middle = middleValue;
        }
        this.parameters.push(param);
    }

    setParameters(params) {
        this.parameters = params;
    }

    selectOrthogonalArray() {
        const numParams = this.parameters.length;
        
        if (this.levelType === 2) {
            if (numParams <= 3) {
                return { name: 'L4', array: ORTHOGONAL_ARRAYS_2_LEVEL.L4 };
            } else if (numParams <= 7) {
                return { name: 'L8', array: ORTHOGONAL_ARRAYS_2_LEVEL.L8 };
            } else if (numParams <= 15) {
                return { name: 'L16', array: ORTHOGONAL_ARRAYS_2_LEVEL.L16 };
            } else {
                throw new Error('Too many parameters. Maximum is 15 for 2-level designs.');
            }
        } else {
            if (numParams <= 4) {
                return { name: 'L9', array: ORTHOGONAL_ARRAYS_3_LEVEL.L9 };
            } else if (numParams <= 13) {
                return { name: 'L27', array: ORTHOGONAL_ARRAYS_3_LEVEL.L27 };
            } else {
                throw new Error('Too many parameters. Maximum is 13 for 3-level designs.');
            }
        }
    }

    generateExperiments() {
        const { name, array } = this.selectOrthogonalArray();
        this.experiments = [];

        array.forEach((row, index) => {
            const experiment = {
                id: index + 1,
                settings: {}
            };

            this.parameters.forEach((param, paramIndex) => {
                const level = row[paramIndex];
                let value;
                
                if (this.levelType === 2) {
                    value = level === 1 ? param.low : param.high;
                } else {
                    if (level === 1) {
                        value = param.low;
                    } else if (level === 2) {
                        value = param.middle;
                    } else {
                        value = param.high;
                    }
                }
                
                experiment.settings[param.name] = {
                    level: level,
                    value: value
                };
            });

            this.experiments.push(experiment);
        });

        return {
            arrayName: name,
            experiments: this.experiments
        };
    }

    addResult(experimentId, result) {
        this.results[experimentId - 1] = parseFloat(result);
    }

    analyzeResults() {
        if (this.results.length !== this.experiments.length) {
            throw new Error('Not all experiment results have been entered');
        }

        const analysis = {};

        this.parameters.forEach(param => {
            const level1Results = [];
            const level2Results = [];
            const level3Results = [];

            this.experiments.forEach((exp, index) => {
                const level = exp.settings[param.name].level;
                const result = this.results[index];

                if (level === 1) {
                    level1Results.push(result);
                } else if (level === 2) {
                    level2Results.push(result);
                } else if (level === 3) {
                    level3Results.push(result);
                }
            });

            const avg1 = level1Results.reduce((a, b) => a + b, 0) / level1Results.length;
            const avg2 = level2Results.reduce((a, b) => a + b, 0) / level2Results.length;
            
            let paramAnalysis = {
                level1Average: avg1,
                level2Average: avg2
            };

            if (this.levelType === 3) {
                const avg3 = level3Results.reduce((a, b) => a + b, 0) / level3Results.length;
                paramAnalysis.level3Average = avg3;
                
                const maxAvg = Math.max(avg1, avg2, avg3);
                let optimalLevel, optimalValue;
                
                if (maxAvg === avg1) {
                    optimalLevel = 1;
                    optimalValue = param.low;
                } else if (maxAvg === avg2) {
                    optimalLevel = 2;
                    optimalValue = param.middle;
                } else {
                    optimalLevel = 3;
                    optimalValue = param.high;
                }
                
                paramAnalysis.difference = Math.max(avg1, avg2, avg3) - Math.min(avg1, avg2, avg3);
                paramAnalysis.optimalLevel = optimalLevel;
                paramAnalysis.optimalValue = optimalValue;
            } else {
                paramAnalysis.difference = Math.abs(avg2 - avg1);
                paramAnalysis.optimalLevel = avg2 > avg1 ? 2 : 1;
                paramAnalysis.optimalValue = avg2 > avg1 ? param.high : param.low;
            }

            analysis[param.name] = paramAnalysis;
        });

        return analysis;
    }

    getOptimalSettings() {
        const analysis = this.analyzeResults();
        const optimal = {};

        this.parameters.forEach(param => {
            optimal[param.name] = {
                value: analysis[param.name].optimalValue,
                level: analysis[param.name].optimalLevel
            };
        });

        return optimal;
    }

    predictOptimalResult() {
        const analysis = this.analyzeResults();
        const overallAverage = this.results.reduce((a, b) => a + b, 0) / this.results.length;
        
        let prediction = overallAverage;
        
        this.parameters.forEach(param => {
            const paramAnalysis = analysis[param.name];
            const optimalAvg = paramAnalysis.optimalLevel === 1 ? 
                paramAnalysis.level1Average : paramAnalysis.level2Average;
            prediction += (optimalAvg - overallAverage) / this.parameters.length;
        });

        return prediction;
    }

    exportState() {
        return {
            parameters: this.parameters,
            experiments: this.experiments,
            results: this.results,
            levelType: this.levelType
        };
    }

    importState(state) {
        this.parameters = state.parameters || [];
        this.experiments = state.experiments || [];
        this.results = state.results || [];
        this.levelType = state.levelType || 2;
    }
}

window.TaguchiOptimizer = TaguchiOptimizer;

