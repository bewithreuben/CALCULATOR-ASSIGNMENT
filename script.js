// CALCULATOR PROGRAM
let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');

let results = "";
let buttonArray = Array.from(buttons);

buttonArray.forEach(button => {
    button.addEventListener('click', (e) =>{
        const button = e.target.closest('button');
        if (!button) return;

        const value = button.textContent.trim();


        if(value === '='){
            try {
                const resultsBeforeEval = results; // To keep original expression

                // Replace operators before evaluating
                results = results
                     .replace(/x/g, '*')
                     .replace(/÷/g, '/')
                     .replace(/%/g, '/100')
                     .replace(/\^/g, '**'); // <==

                results = eval(results);
                display.value = results;

                addToHistory(resultsBeforeEval, results);  // To correctly log result = answer
            } catch (err) {
                display.value = "Error";
                results = "";
            }
        }

        else if(value === 'C'){
            results = "";
            display.value = results;
        }

        else if (button.classList.contains('delete')) {
            results = results.slice(0, -1);
            display.value = results;
        }

        else{
            results += value;
            display.value = results;
        }
    })
});
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')','%','^'].includes(key)) {
        results += key;
        display.value = results;
    } else if (key === 'Enter') {
        try {
            const expression = results
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/%/g, '/100')
                .replace(/\^/g, '**');

            const answer = eval(expression);
            display.value = answer;
            addToHistory(results, answer);
            results = answer.toString();
        } catch {
            display.value = "Error";
            results = "";
        }
    } else if (key === 'Backspace') {
        results = results.slice(0, -1);
        display.value = results;
    } else if (key === 'Escape') {
        results = "";
        display.value = results;
    }
});

function addToHistory(expression, result) {
    const historyList = document.getElementById('history-list');
    const item = document.createElement('li');
    item.textContent = `${expression} = ${result}`;
    historyList.prepend(item);
}
const toggleBtn = document.getElementById('history-toggle');
const historyContainer = document.getElementById('history');

toggleBtn.addEventListener('click', () => {
  historyContainer.classList.toggle('show');
});