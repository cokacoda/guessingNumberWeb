let answer = generateNumbers();
let history = [];

let explanation_text = 'The game is played by guessing a 4-digit number without zero and duplicate digits. For each guess, the game will return the number of correct digits in the correct position (A) and the number of correct digits in the wrong position (B).'

function generateNumbers() {
    let numbers = [];
    while (numbers.length < 4) {
        let r = Math.floor(Math.random() * 9) + 1;
        if (numbers.indexOf(r) === -1) numbers.push(r);
    }
    return numbers;
}

function evaluateGuess() {
    let guess = document.getElementById('guessInput').value.split('').map(Number);
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
    document.getElementById('result').innerText = `${A}A${B}B`;
    showHistory();
    if (A === 4) {
        document.getElementById('result').innerText = 'Correct!';
        showAnswer();
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
    document.getElementById('guessInput').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('answer').innerText = '';
    document.getElementById('history').innerText = '';
}

function showAnswer() {
    document.getElementById('answer').innerText = answer.join('');
}

function showHistory() {
    let historyList = document.getElementById('history');
    let historyItem = document.createElement('li');
    // new item contains the guess input and the result
    historyItem.innerText = document.getElementById('guessInput').value + '\t' + document.getElementById('result').innerText;
    historyList.appendChild(historyItem);
    history.push(historyItem);
}

function explanation() {
    alert(explanation_text);
}

// Event listener for document ready to set up the click handlers
document.addEventListener("DOMContentLoaded", function() {
    // Get all the toggle buttons or elements
    var toggles = document.querySelectorAll('.toggle-explanation');

    // Add click event listener for each toggle
    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            // Find the next sibling explanation element
            var explanation = this.nextElementSibling;

            // Check if the explanation is currently shown
            if (explanation.style.display === 'none' || explanation.style.display === '') {
                explanation.style.display = 'block'; // Show it
            } else {
                explanation.style.display = 'none'; // Hide it
            }
        });
    });
});

