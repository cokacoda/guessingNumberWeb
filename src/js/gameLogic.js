let answer = generateNumbers();
let history = [];

function generateNumbers() {
    let numbers = [];
    while (numbers.length < 4) {
        let r = Math.floor(Math.random() * 9) + 1;
        if (numbers.indexOf(r) === -1) numbers.push(r);
    }
    return numbers;
}

function evaluateGuess() {
    let guess = document.getElementById('guess-input').value.split('').map(Number);
    // check if the input is valid
    if (!handleInvalidInput(guess)) return;

    let A = 0, B = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === answer[i]) {
            A += 1;
        } else if (answer.includes(guess[i])) {
            B += 1;
        }
    }
    document.getElementById('result-div').innerText = `${A}A${B}B`;
    history.push({guess: guess.join(''), result: `${A}A${B}B`});
    showHistory();
    if (A === 4) {
        showAnswer(true);
    }
}

// Optional: Add a function to handle invalid inputs
function handleInvalidInput(guess) {
    if (guess.length !== 4) {
        alert('Invalid input! Please enter a 4-digit number.');
        return false;
    }
    // check if the input contains zero or duplicate digits or non digit
    for (let i = 0; i < 4; i++) {
        if (guess[i] === 0 || isNaN(guess[i]) || guess[i] % 1 !== 0 || guess[i] < 0 || guess[i] > 9) {
            alert('Invalid input! Please enter a 4-digit number without zero.');
            return false;
        }
        for (let j = i + 1; j < 4; j++) {
            if (guess[i] === guess[j]) {
                alert('Invalid input! Please enter a 4-digit number without duplicate digits.');
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    answer = generateNumbers();
    document.getElementById('guess-input').value = '';
    document.getElementById('result-div').innerText = '';
    let historyList = document.getElementById('history-table');
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
    }
    history = [];
    document.getElementById('answer-div').style.display = 'none';
    document.getElementById('answer-subdiv').innerText = '';
    document.getElementById('success-text').style.display = 'none';
    document.getElementById('notes-input').value = '';
}

function showAnswer(success = false) {
    document.getElementById('answer-div').style.display = 'block';
    document.getElementById('answer-subdiv').innerText = answer.join('');
    if (success) {
        document.getElementById('success-text').style.display = 'block';
    }
}

function showHistory() {
    let historyList = document.getElementById('history-table'); // table
    // left column is the guess, right column is the result
    let historyItem = document.createElement('tr');
    let guess = document.createElement('td');
    guess.innerText = history[history.length - 1].guess;
    let result = document.createElement('td');
    result.innerText = history[history.length - 1].result;
    historyItem.appendChild(guess);
    historyItem.appendChild(result);
    historyList.appendChild(historyItem);
}