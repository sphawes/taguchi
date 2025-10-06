let optimizer = new TaguchiOptimizer();
let currentStep = 1;
let currentLevelType = 2;

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeEventListeners();
    
    if (optimizer.parameters.length === 0) {
        addParameterInput();
    } else {
        renderCurrentState();
    }
});

function initializeEventListeners() {
    document.getElementById('addParameterBtn').addEventListener('click', addParameterInput);
    document.getElementById('generateArrayBtn').addEventListener('click', generateExperimentPlan);
    document.getElementById('processResultsBtn').addEventListener('click', processResults);
    document.getElementById('resetBtn').addEventListener('click', resetExperiment);
    
    const levelRadios = document.querySelectorAll('input[name="levelType"]');
    levelRadios.forEach(radio => {
        radio.addEventListener('change', handleLevelTypeChange);
    });
}

function handleLevelTypeChange(e) {
    currentLevelType = parseInt(e.target.value);
    optimizer.setLevelType(currentLevelType);
    
    const instructions = document.getElementById('parameterInstructions');
    if (currentLevelType === 2) {
        instructions.textContent = 'Enter up to 5 parameters you want to test with their low and high values:';
    } else {
        instructions.textContent = 'Enter up to 5 parameters you want to test with their low, middle, and high values:';
    }
    
    const container = document.getElementById('parametersContainer');
    const paramDivs = container.querySelectorAll('.parameter-input');
    paramDivs.forEach(paramDiv => {
        updateParameterInputFields(paramDiv);
    });
    
    saveState();
}

function updateParameterInputFields(paramDiv) {
    const fieldsContainer = paramDiv.querySelector('.parameter-fields');
    
    if (currentLevelType === 2) {
        fieldsContainer.classList.remove('three-level');
        const middleGroup = fieldsContainer.querySelector('.form-group-middle');
        if (middleGroup) {
            middleGroup.remove();
        }
    } else {
        fieldsContainer.classList.add('three-level');
        if (!fieldsContainer.querySelector('.form-group-middle')) {
            const lowGroup = fieldsContainer.querySelector('.form-group:nth-child(2)');
            const middleGroup = document.createElement('div');
            middleGroup.className = 'form-group form-group-middle';
            middleGroup.innerHTML = `
                <label>Middle Value</label>
                <input type="text" class="param-middle" placeholder="e.g., 150" required>
            `;
            lowGroup.insertAdjacentElement('afterend', middleGroup);
        }
    }
}
function addParameterInput() {
    const container = document.getElementById('parametersContainer');
    const paramCount = container.children.length;
    
    if (paramCount >= 5) {
        alert('Maximum 5 parameters allowed');
        return;
    }

    const paramDiv = document.createElement('div');
    paramDiv.className = 'parameter-input';
    paramDiv.dataset.index = paramCount;
    
    const fieldsClass = currentLevelType === 3 ? 'parameter-fields three-level' : 'parameter-fields';
    const middleValueHTML = currentLevelType === 3 ? `
        <div class="form-group form-group-middle">
            <label>Middle Value</label>
            <input type="text" class="param-middle" placeholder="e.g., 150" required>
        </div>
    ` : '';
    
    paramDiv.innerHTML = `
        <div class="parameter-header">
            <h3>Parameter ${paramCount + 1}</h3>
            <button class="btn btn-danger" onclick="removeParameter(${paramCount})">Remove</button>
        </div>
        <div class="${fieldsClass}">
            <div class="form-group">
                <label>Parameter Name</label>
                <input type="text" class="param-name" placeholder="e.g., Temperature" required>
            </div>
            <div class="form-group">
                <label>Low Value</label>
                <input type="text" class="param-low" placeholder="e.g., 100" required>
            </div>
            ${middleValueHTML}
            <div class="form-group">
                <label>High Value</label>
                <input type="text" class="param-high" placeholder="e.g., 200" required>
            </div>
        </div>
    `;
    
    container.appendChild(paramDiv);
    saveState();
}

function removeParameter(index) {
    const container = document.getElementById('parametersContainer');
    const paramDiv = container.querySelector(`[data-index="${index}"]`);
    if (paramDiv) {
        paramDiv.remove();
        renumberParameters();
        saveState();
    }
}

function renumberParameters() {
    const container = document.getElementById('parametersContainer');
    Array.from(container.children).forEach((paramDiv, index) => {
        paramDiv.dataset.index = index;
        paramDiv.querySelector('h3').textContent = `Parameter ${index + 1}`;
        paramDiv.querySelector('.btn-danger').setAttribute('onclick', `removeParameter(${index})`);
    });
}
function generateExperimentPlan() {
    const container = document.getElementById('parametersContainer');
    const paramDivs = container.querySelectorAll('.parameter-input');
    
    if (paramDivs.length === 0) {
        alert('Please add at least one parameter');
        return;
    }

    const parameters = [];
    let valid = true;

    paramDivs.forEach(paramDiv => {
        const name = paramDiv.querySelector('.param-name').value.trim();
        const low = paramDiv.querySelector('.param-low').value.trim();
        const high = paramDiv.querySelector('.param-high').value.trim();
        
        let param = { name, low, high };

        if (currentLevelType === 3) {
            const middle = paramDiv.querySelector('.param-middle').value.trim();
            if (!name || !low || !middle || !high) {
                valid = false;
                return;
            }
            param.middle = middle;
        } else {
            if (!name || !low || !high) {
                valid = false;
                return;
            }
        }

        parameters.push(param);
    });

    if (!valid) {
        alert('Please fill in all parameter fields');
        return;
    }

    optimizer.setLevelType(currentLevelType);
    optimizer.setParameters(parameters);
    const { arrayName, experiments } = optimizer.generateExperiments();

    displayOrthogonalArray(arrayName, experiments);
    displayExperiments(experiments);

    document.getElementById('arraySection').classList.remove('hidden');
    document.getElementById('experimentsSection').classList.remove('hidden');
    document.getElementById('arraySection').scrollIntoView({ behavior: 'smooth' });

    currentStep = 2;
    saveState();
}
function displayOrthogonalArray(arrayName, experiments) {
    const display = document.getElementById('arrayDisplay');
    
    let html = `<p><strong>Orthogonal Array:</strong> ${arrayName} (${experiments.length} experiments)</p>`;
    html += '<div class="array-table"><table>';
    
    html += '<thead><tr><th>Experiment</th>';
    optimizer.parameters.forEach(param => {
        html += `<th>${param.name}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    experiments.forEach(exp => {
        html += `<tr><td><strong>${exp.id}</strong></td>`;
        optimizer.parameters.forEach(param => {
            const setting = exp.settings[param.name];
            let levelText;
            if (currentLevelType === 2) {
                levelText = setting.level === 1 ? 'Low' : 'High';
            } else {
                levelText = setting.level === 1 ? 'Low' : (setting.level === 2 ? 'Middle' : 'High');
            }
            html += `<td>${levelText}<br><small>(${setting.value})</small></td>`;
        });
        html += '</tr>';
    });
    
    html += '</tbody></table></div>';
    display.innerHTML = html;
}
function displayExperiments(experiments) {
    const container = document.getElementById('experimentsContainer');
    container.innerHTML = '';

    experiments.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'experiment-card';
        
        let settingsHtml = '';
        optimizer.parameters.forEach(param => {
            const setting = exp.settings[param.name];
            let levelText;
            if (currentLevelType === 2) {
                levelText = setting.level === 1 ? 'Low' : 'High';
            } else {
                levelText = setting.level === 1 ? 'Low' : (setting.level === 2 ? 'Middle' : 'High');
            }
            settingsHtml += `
                <div class="setting-item">
                    <strong>${param.name}:</strong> ${setting.value} (${levelText})
                </div>
            `;
        });

        const savedResult = optimizer.results[exp.id - 1] || '';

        expDiv.innerHTML = `
            <h3>Experiment ${exp.id}</h3>
            <div class="experiment-settings">
                ${settingsHtml}
            </div>
            <div class="result-input">
                <label for="result-${exp.id}">Success Metric:</label>
                <input 
                    type="number" 
                    id="result-${exp.id}" 
                    class="experiment-result" 
                    data-exp-id="${exp.id}"
                    placeholder="Enter result"
                    value="${savedResult}"
                    step="any"
                >
            </div>
        `;

        container.appendChild(expDiv);
    });

    container.querySelectorAll('.experiment-result').forEach(input => {
        input.addEventListener('change', (e) => {
            const expId = parseInt(e.target.dataset.expId);
            const value = e.target.value;
            if (value) {
                optimizer.addResult(expId, value);
                saveState();
            }
        });
    });
}

function processResults() {
    const allEntered = optimizer.experiments.every((_, index) => {
        return optimizer.results[index] !== undefined && optimizer.results[index] !== '';
    });

    if (!allEntered) {
        alert('Please enter results for all experiments before processing');
        return;
    }

    try {
        const analysis = optimizer.analyzeResults();
        const optimal = optimizer.getOptimalSettings();
        const predicted = optimizer.predictOptimalResult();

        displayResults(analysis, optimal, predicted);
        
        document.getElementById('resultsSection').classList.remove('hidden');
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

        currentStep = 4;
        saveState();
    } catch (error) {
        alert('Error processing results: ' + error.message);
    }
}

function displayResults(analysis, optimal, predicted) {
    const display = document.getElementById('resultsDisplay');
    
    let html = '<div class="results-summary">';
    html += '<h3>Optimal Parameter Settings</h3>';
    html += '<div class="optimal-settings">';
    
    optimizer.parameters.forEach(param => {
        const opt = optimal[param.name];
        let levelText;
        if (currentLevelType === 2) {
            levelText = opt.level === 1 ? 'Low' : 'High';
        } else {
            levelText = opt.level === 1 ? 'Low' : (opt.level === 2 ? 'Middle' : 'High');
        }
        html += `
            <div class="optimal-setting">
                <strong>${param.name}</strong>
                <span class="${opt.level === (currentLevelType === 2 ? 2 : 3) ? 'level-high' : 'level-low'}">${opt.value} (${levelText})</span>
            </div>
        `;
    });
    
    html += '</div>';
    html += `<p style="margin-top: 20px; font-size: 1.1rem;"><strong>Predicted Optimal Result:</strong> <span style="color: var(--success-color); font-size: 1.3rem; font-weight: 700;">${predicted.toFixed(2)}</span></p>`;
    html += '</div>';

    html += '<div class="analysis-details">';
    html += '<h3>Detailed Analysis</h3>';
    html += '<table class="analysis-table">';
    
    if (currentLevelType === 2) {
        html += '<thead><tr><th>Parameter</th><th>Low Level Avg</th><th>High Level Avg</th><th>Difference</th><th>Optimal</th></tr></thead>';
    } else {
        html += '<thead><tr><th>Parameter</th><th>Low Level Avg</th><th>Middle Level Avg</th><th>High Level Avg</th><th>Difference</th><th>Optimal</th></tr></thead>';
    }
    
    html += '<tbody>';
    
    optimizer.parameters.forEach(param => {
        const a = analysis[param.name];
        let optimalText;
        
        if (currentLevelType === 2) {
            optimalText = a.optimalLevel === 1 ? `${param.low} (Low)` : `${param.high} (High)`;
            html += `
                <tr>
                    <td><strong>${param.name}</strong></td>
                    <td>${a.level1Average.toFixed(2)}</td>
                    <td>${a.level2Average.toFixed(2)}</td>
                    <td>${a.difference.toFixed(2)}</td>
                    <td class="${a.optimalLevel === 2 ? 'level-high' : 'level-low'}">${optimalText}</td>
                </tr>
            `;
        } else {
            optimalText = a.optimalLevel === 1 ? `${param.low} (Low)` : 
                          (a.optimalLevel === 2 ? `${param.middle} (Middle)` : `${param.high} (High)`);
            html += `
                <tr>
                    <td><strong>${param.name}</strong></td>
                    <td>${a.level1Average.toFixed(2)}</td>
                    <td>${a.level2Average.toFixed(2)}</td>
                    <td>${a.level3Average.toFixed(2)}</td>
                    <td>${a.difference.toFixed(2)}</td>
                    <td class="${a.optimalLevel === 3 ? 'level-high' : 'level-low'}">${optimalText}</td>
                </tr>
            `;
        }
    });
    
    html += '</tbody></table>';
    html += '</div>';

    display.innerHTML = html;
}

function resetExperiment() {
    if (confirm('Are you sure you want to start a new experiment? This will clear all current data.')) {
        currentLevelType = 2;
        optimizer = new TaguchiOptimizer(currentLevelType);
        currentStep = 1;
        
        const levelRadio = document.querySelector('input[name="levelType"][value="2"]');
        if (levelRadio) {
            levelRadio.checked = true;
        }
        
        const instructions = document.getElementById('parameterInstructions');
        instructions.textContent = 'Enter up to 5 parameters you want to test with their low and high values:';
        
        document.getElementById('parametersContainer').innerHTML = '';
        document.getElementById('arraySection').classList.add('hidden');
        document.getElementById('experimentsSection').classList.add('hidden');
        document.getElementById('resultsSection').classList.add('hidden');
        
        addParameterInput();
        localStorage.removeItem('taguchiState');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function saveState() {
    const state = optimizer.exportState();
    state.currentStep = currentStep;
    state.currentLevelType = currentLevelType;
    
    const container = document.getElementById('parametersContainer');
    const paramDivs = container.querySelectorAll('.parameter-input');
    const formParams = [];
    
    paramDivs.forEach(paramDiv => {
        const param = {
            name: paramDiv.querySelector('.param-name').value,
            low: paramDiv.querySelector('.param-low').value,
            high: paramDiv.querySelector('.param-high').value
        };
        
        const middleInput = paramDiv.querySelector('.param-middle');
        if (middleInput) {
            param.middle = middleInput.value;
        }
        
        formParams.push(param);
    });
    
    state.formParams = formParams;
    localStorage.setItem('taguchiState', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('taguchiState');
    if (!saved) return;

    try {
        const state = JSON.parse(saved);
        optimizer.importState(state);
        currentStep = state.currentStep || 1;
        currentLevelType = state.currentLevelType || 2;
        
        const levelRadio = document.querySelector(`input[name="levelType"][value="${currentLevelType}"]`);
        if (levelRadio) {
            levelRadio.checked = true;
        }
        
        const instructions = document.getElementById('parameterInstructions');
        if (currentLevelType === 2) {
            instructions.textContent = 'Enter up to 5 parameters you want to test with their low and high values:';
        } else {
            instructions.textContent = 'Enter up to 5 parameters you want to test with their low, middle, and high values:';
        }
    } catch (error) {
        console.error('Error loading saved state:', error);
        localStorage.removeItem('taguchiState');
    }
}

function renderCurrentState() {
    const saved = localStorage.getItem('taguchiState');
    if (!saved) return;

    const state = JSON.parse(saved);
    const container = document.getElementById('parametersContainer');
    container.innerHTML = '';

    if (state.formParams && state.formParams.length > 0) {
        state.formParams.forEach((param, index) => {
            const paramDiv = document.createElement('div');
            paramDiv.className = 'parameter-input';
            paramDiv.dataset.index = index;
            
            const fieldsClass = currentLevelType === 3 ? 'parameter-fields three-level' : 'parameter-fields';
            const middleValueHTML = currentLevelType === 3 ? `
                <div class="form-group form-group-middle">
                    <label>Middle Value</label>
                    <input type="text" class="param-middle" value="${param.middle || ''}" placeholder="e.g., 150" required>
                </div>
            ` : '';
            
            paramDiv.innerHTML = `
                <div class="parameter-header">
                    <h3>Parameter ${index + 1}</h3>
                    <button class="btn btn-danger" onclick="removeParameter(${index})">Remove</button>
                </div>
                <div class="${fieldsClass}">
                    <div class="form-group">
                        <label>Parameter Name</label>
                        <input type="text" class="param-name" value="${param.name}" placeholder="e.g., Temperature" required>
                    </div>
                    <div class="form-group">
                        <label>Low Value</label>
                        <input type="text" class="param-low" value="${param.low}" placeholder="e.g., 100" required>
                    </div>
                    ${middleValueHTML}
                    <div class="form-group">
                        <label>High Value</label>
                        <input type="text" class="param-high" value="${param.high}" placeholder="e.g., 200" required>
                    </div>
                </div>
            `;
            
            container.appendChild(paramDiv);
        });
    }

    if (state.experiments && state.experiments.length > 0) {
        const { arrayName, experiments } = optimizer.generateExperiments();
        displayOrthogonalArray(arrayName, experiments);
        displayExperiments(experiments);
        
        document.getElementById('arraySection').classList.remove('hidden');
        document.getElementById('experimentsSection').classList.remove('hidden');
    }

    if (state.results && state.results.length > 0) {
        const allComplete = state.results.every(r => r !== undefined && r !== '');
        if (allComplete) {
            try {
                const analysis = optimizer.analyzeResults();
                const optimal = optimizer.getOptimalSettings();
                const predicted = optimizer.predictOptimalResult();
                displayResults(analysis, optimal, predicted);
                document.getElementById('resultsSection').classList.remove('hidden');
            } catch (error) {
                console.error('Error rendering results:', error);
            }
        }
    }
}

