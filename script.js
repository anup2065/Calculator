$(document).ready(function(){
    let a = $("#num1");
    let b = $("#num2");
    let result = $("#result");
    let calculationHistory = [];
    let lastOperation = '';

    // Helper function to validate inputs
    function validateInputs() {
        let num1 = parseFloat(a.val());
        let num2 = parseFloat(b.val());
        
        if (isNaN(num1) || a.val() === '') {
            showError("Please enter a valid Number 1");
            return null;
        }
        if (isNaN(num2) || b.val() === '') {
            showError("Please enter a valid Number 2");
            return null;
        }
        return { num1, num2 };
    }

    // Helper function to format result
    function formatResult(value) {
        if (isNaN(value)) {
            return "Error: Invalid calculation";
        }
        if (!isFinite(value)) {
            return "Error: Division by zero";
        }
        // Round to 10 decimal places to avoid floating point issues
        return Math.round(value * 10000000000) / 10000000000;
    }

    // Helper function to show error
    function showError(message) {
        result.val(message);
        result.addClass('error');
        setTimeout(() => {
            result.removeClass('error');
        }, 2000);
    }

    // Helper function to add to history
    function addToHistory(num1, operator, num2, resultValue) {
        const calculation = `${num1} ${operator} ${num2} = ${resultValue}`;
        calculationHistory.unshift({
            calculation: calculation,
            result: resultValue,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // Keep only last 10 calculations
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
        
        // Add click handlers to history items
        $('.history-item').click(function() {
            const index = $(this).data('index');
            const historyResult = calculationHistory[index].result;
            result.val(historyResult);
        });
    }

    // Perform calculation
    function calculate(operator, operatorSymbol) {
        const inputs = validateInputs();
        if (!inputs) return;
        
        let resultValue;
        const { num1, num2 } = inputs;
        
        switch(operator) {
            case 'add':
                resultValue = num1 + num2;
                break;
            case 'sub':
                resultValue = num1 - num2;
                break;
            case 'mul':
                resultValue = num1 * num2;
                break;
            case 'divi':
                if (num2 === 0) {
                    showError("Error: Cannot divide by zero");
                    return;
                }
                resultValue = num1 / num2;
                break;
            case 'mod':
                if (num2 === 0) {
                    showError("Error: Cannot modulo by zero");
                    return;
                }
                resultValue = num1 % num2;
                break;
            case 'percent':
                // Calculate percentage: num1 percent of num2
                resultValue = (num1 / 100) * num2;
                break;
            case 'power':
                resultValue = Math.pow(num1, num2);
                break;
        }
        
        const formattedResult = formatResult(resultValue);
        result.val(formattedResult);
        result.removeClass('error');
        
        addToHistory(num1, operatorSymbol, num2, formattedResult);
        lastOperation = operator;
    }

    // Button click handlers
    $("#add").click(function(){
        calculate('add', '+');
    });

    $("#sub").click(function(){
        calculate('sub', '-');
    });

    $("#divi").click(function(){
        calculate('divi', '÷');
    });

    $("#mul").click(function(){
        calculate('mul', '×');
    });

    $("#mod").click(function(){
        calculate('mod', '%');
    });

    $("#percent").click(function(){
        calculate('percent', '% of');
    });

    $("#power").click(function(){
        calculate('power', '^');
    });

    // Clear button
    $("#clear").click(function(){
        a.val('');
        b.val('');
        result.val('');
        result.removeClass('error');
    });

    // Toggle negative for Number 1
    $("#toggle1").click(function(){
        if (a.val() !== '') {
            a.val(parseFloat(a.val()) * -1);
        }
    });

    // Toggle negative for Number 2
    $("#toggle2").click(function(){
        if (b.val() !== '') {
            b.val(parseFloat(b.val()) * -1);
        }
    });

    // Copy result to clipboard
    $("#copyResult").click(function(){
        const resultValue = result.val();
        if (resultValue && !resultValue.startsWith("Error")) {
            // Create temporary input to copy
            const tempInput = $("<input>");
            $("body").append(tempInput);
            tempInput.val(resultValue).select();
            document.execCommand("copy");
            tempInput.remove();
            
            // Show feedback
            const originalText = $(this).text();
            $(this).text("✓");
            setTimeout(() => {
                $(this).text(originalText);
            }, 1000);
        }
    });

    // Use result for next calculation
    $("#useResult").click(function(){
        const resultValue = result.val();
        if (resultValue && !resultValue.startsWith("Error")) {
            a.val(resultValue);
            b.val('');
            result.val('');
        }
    });

    // Clear history
    $("#clearHistory").click(function(){
        if (confirm("Clear all calculation history?")) {
            calculationHistory = [];
            updateHistoryDisplay();
        }
    });

    // Keyboard support
    $(document).keydown(function(e){
        // Prevent default only for calculator shortcuts
        if ([13, 27, 187, 189, 106, 111, 53].includes(e.keyCode) && 
            (e.target.id === 'num1' || e.target.id === 'num2' || e.target.tagName === 'BODY')) {
            
            switch(e.keyCode) {
                case 13: // Enter key
                    e.preventDefault();
                    if (lastOperation && lastOperation !== '') {
                        $("#" + lastOperation).click();
                    } else {
                        $("#add").click(); // Default to addition
                    }
                    break;
                case 27: // Escape key
                    e.preventDefault();
                    $("#clear").click();
                    break;
                case 187: // + key (with or without shift)
                case 107: // Numpad +
                    e.preventDefault();
                    $("#add").click();
                    break;
                case 189: // - key
                case 109: // Numpad -
                    e.preventDefault();
                    $("#sub").click();
                    break;
                case 106: // Numpad *
                    if (e.shiftKey && e.keyCode === 56) { // Shift + 8 for *
                        e.preventDefault();
                        $("#mul").click();
                    } else if (e.keyCode === 106) { // Numpad *
                        e.preventDefault();
                        $("#mul").click();
                    }
                    break;
                case 111: // Numpad /
                case 191: // / key
                    e.preventDefault();
                    $("#divi").click();
                    break;
                case 53: // 5 key
                    if (e.shiftKey) { // Shift + 5 for %
                        e.preventDefault();
                        $("#mod").click();
                    }
                    break;
            }
        }
    });

    // Also handle keypress for * key
    $(document).keypress(function(e){
        if (e.key === '*') {
            e.preventDefault();
            $("#mul").click();
        } else if (e.key === '/') {
            e.preventDefault();
            $("#divi").click();
        } else if (e.key === '+') {
            e.preventDefault();
            $("#add").click();
        } else if (e.key === '-') {
            e.preventDefault();
            $("#sub").click();
        } else if (e.key === '%') {
            e.preventDefault();
            $("#mod").click();
        }
    });

    // Focus on first input on load
    a.focus();
});
