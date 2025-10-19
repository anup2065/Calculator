$(document).ready(function(){
    let display = $("#display");
    let operationDisplay = $("#operation");
    let currentValue = "0";
    let previousValue = null;
    let operator = null;
    let shouldResetDisplay = false;
    let calculationHistory = [];

    // Update display
    function updateDisplay() {
        display.val(currentValue);
    }

    // Update operation display
    function updateOperationDisplay() {
        if (previousValue !== null && operator) {
            operationDisplay.text(`${previousValue} ${operator}`);
        } else {
            operationDisplay.text('');
        }
    }

    // Clear everything
    function clearAll() {
        currentValue = "0";
        previousValue = null;
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
        updateOperationDisplay();
        display.removeClass('error');
    }

    // Format result
    function formatResult(value) {
        if (isNaN(value)) {
            return "Error";
        }
        if (!isFinite(value)) {
            return "Error";
        }
        // Round to 10 decimal places
        let rounded = Math.round(value * 10000000000) / 10000000000;
        // Convert to string and remove trailing zeros
        let str = rounded.toString();
        return str;
    }

    // Perform calculation
    function calculate() {
        if (previousValue === null || operator === null) {
            return;
        }

        let prev = parseFloat(previousValue);
        let current = parseFloat(currentValue);
        let result;

        switch(operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    showError("Cannot divide by zero");
                    return;
                }
                result = prev / current;
                break;
            case 'mod':
                if (current === 0) {
                    showError("Cannot modulo by zero");
                    return;
                }
                result = prev % current;
                break;
            case '^':
                result = Math.pow(prev, current);
                break;
            default:
                return;
        }

        const formattedResult = formatResult(result);
        
        if (formattedResult !== "Error") {
            addToHistory(previousValue, operator, currentValue, formattedResult);
            currentValue = formattedResult;
            previousValue = null;
            operator = null;
            shouldResetDisplay = true;
            updateDisplay();
            updateOperationDisplay();
        }
    }

    // Show error
    function showError(message) {
        display.val(message);
        display.addClass('error');
        setTimeout(() => {
            clearAll();
        }, 1500);
    }

    // Add to history
    function addToHistory(num1, op, num2, result) {
        const calculation = `${num1} ${op} ${num2} = ${result}`;
        calculationHistory.unshift({
            calculation: calculation,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        });
        
        if (calculationHistory.length > 10) {
            calculationHistory.pop();
        }
        
        updateHistoryDisplay();
    }

    // Update history display
    function updateHistoryDisplay() {
        const historyList = $("#historyList");
        
        if (calculationHistory.length === 0) {
            historyList.html('<p class="no-history">No calculations yet</p>');
            return;
        }
        
        let historyHTML = '';
        calculationHistory.forEach((item, index) => {
            historyHTML += `
                <div class="history-item" data-index="${index}">
                    <div class="history-calc">${item.calculation}</div>
                    <div class="history-time">${item.timestamp}</div>
                </div>
            `;
        });
        
        historyList.html(historyHTML);
        
        $('.history-item').click(function() {
            const index = $(this).data('index');
            currentValue = calculationHistory[index].result;
            previousValue = null;
            operator = null;
            shouldResetDisplay = true;
            updateDisplay();
            updateOperationDisplay();
        });
    }

    // Number buttons
    $(".number-btn").click(function() {
        const number = $(this).data('number').toString();
        
        if (shouldResetDisplay || currentValue === "0") {
            currentValue = number;
            shouldResetDisplay = false;
        } else {
            if (currentValue.length < 15) { // Limit display length
                currentValue += number;
            }
        }
        
        updateDisplay();
    });

    // Operator buttons
    $(".operator-btn, .advanced-btn").click(function() {
        const op = $(this).data('operator');
        
        if (previousValue !== null && operator !== null && !shouldResetDisplay) {
            calculate();
        }
        
        previousValue = currentValue;
        operator = op;
        shouldResetDisplay = true;
        updateOperationDisplay();
    });

    // Equals button
    $("#equals").click(function() {
        calculate();
    });

    // Clear button
    $("#clear").click(function() {
        clearAll();
    });

    // Backspace
    $("#backspace").click(function() {
        if (currentValue.length > 1) {
            currentValue = currentValue.slice(0, -1);
        } else {
            currentValue = "0";
        }
        updateDisplay();
    });

    // Decimal point
    $("#decimal").click(function() {
        if (shouldResetDisplay) {
            currentValue = "0";
            shouldResetDisplay = false;
        }
        
        if (!currentValue.includes('.')) {
            currentValue += '.';
            updateDisplay();
        }
    });

    // Toggle sign
    $("#toggleSign").click(function() {
        if (currentValue !== "0") {
            if (currentValue.startsWith('-')) {
                currentValue = currentValue.substring(1);
            } else {
                currentValue = '-' + currentValue;
            }
            updateDisplay();
        }
    });

    // Percent button (calculates percentage based on context)
    $("#percent").click(function() {
        const value = parseFloat(currentValue);
        
        // If there's a previous operation, calculate immediately with percentage
        if (previousValue !== null && operator !== null) {
            const prev = parseFloat(previousValue);
            let percentValue;
            
            // For + and -, use percentage of previous value
            if (operator === '+' || operator === '-') {
                percentValue = (prev * value) / 100;
            } 
            // For ×, ÷, mod, ^, just convert to decimal percentage
            else {
                percentValue = value / 100;
            }
            
            // Now perform the calculation immediately
            let result;
            switch(operator) {
                case '+':
                    result = prev + percentValue;
                    break;
                case '-':
                    result = prev - percentValue;
                    break;
                case '×':
                    result = prev * percentValue;
                    break;
                case '÷':
                    if (percentValue === 0) {
                        showError("Cannot divide by zero");
                        return;
                    }
                    result = prev / percentValue;
                    break;
                case 'mod':
                    if (percentValue === 0) {
                        showError("Cannot modulo by zero");
                        return;
                    }
                    result = prev % percentValue;
                    break;
                case '^':
                    result = Math.pow(prev, percentValue);
                    break;
            }
            
            const formattedResult = formatResult(result);
            addToHistory(previousValue, operator, value + "%", formattedResult);
            
            currentValue = formattedResult;
            previousValue = null;
            operator = null;
            shouldResetDisplay = true;
            updateDisplay();
            updateOperationDisplay();
        } else {
            // Standalone percent - just convert to decimal
            currentValue = formatResult(value / 100);
            shouldResetDisplay = true;
            updateDisplay();
        }
    });

    // Copy result
    $("#copyResult").click(function() {
        const tempInput = $("<input>");
        $("body").append(tempInput);
        tempInput.val(currentValue).select();
        document.execCommand("copy");
        tempInput.remove();
        
        const originalText = $(this).text();
        $(this).text("✓ Copied");
        setTimeout(() => {
            $(this).text(originalText);
        }, 1000);
    });

    // Use result
    $("#useResult").click(function() {
        previousValue = null;
        operator = null;
        shouldResetDisplay = true;
        updateOperationDisplay();
    });

    // Clear history
    $("#clearHistory").click(function() {
        if (confirm("Clear all calculation history?")) {
            calculationHistory = [];
            updateHistoryDisplay();
        }
    });

    // Keyboard support
    $(document).keydown(function(e) {
        // Numbers
        if (e.key >= '0' && e.key <= '9') {
            $(`.number-btn[data-number="${e.key}"]`).click();
        }
        // Operators
        else if (e.key === '+') {
            $(`.operator-btn[data-operator="+"]`).click();
        }
        else if (e.key === '-') {
            $(`.operator-btn[data-operator="-"]`).click();
        }
        else if (e.key === '*') {
            $(`.operator-btn[data-operator="×"]`).click();
        }
        else if (e.key === '/') {
            e.preventDefault();
            $(`.operator-btn[data-operator="÷"]`).click();
        }
        else if (e.key === '%') {
            $("#percent").click();
        }
        // Special keys
        else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            $("#equals").click();
        }
        else if (e.key === 'Escape') {
            $("#clear").click();
        }
        else if (e.key === 'Backspace') {
            e.preventDefault();
            $("#backspace").click();
        }
        else if (e.key === '.') {
            $("#decimal").click();
        }
    });
});
