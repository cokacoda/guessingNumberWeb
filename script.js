let answer = generateNumbers();
let history = [];

let explanation_text = 'The game is played by guessing a 4-digit number without zero and duplicate digits. For each guess, the game will return the number of correct digits in the correct position (A) and the number of correct digits in the wrong position (B). \n For example, if the answer is 1234 and the guess is 1356, the game will return 1A1B. Because 1 is in the correct position and 3 is in the wrong position.'

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
    history.push({guess: guess.join(''), result: `${A}A${B}B`});
    showHistory();
    if (A === 4) {
        // document.getElementById('result').innerText = 'Correct!';
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
    document.getElementById('guessInput').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('answer').innerText = '';
    let historyList = document.getElementById('historyList');
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
    }
    history = [];
    document.getElementById('answer-group').style.display = 'none';
    document.getElementById('Success').style.display = 'none';
    document.getElementById('notes-input').value = '';
}

function showAnswer(success = false) {
    document.getElementById('answer').innerText = answer.join('');
    document.getElementById('answer-group').style.display = 'block';
    if (success) {
        document.getElementById('Success').style.display = 'block';
    }
}

function showHistory() {
    let historyList = document.getElementById('historyList'); // table
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

function autoResizeTextarea() {
    var textArea = document.getElementById("notes-input");
    textArea.style.height = 'auto'; // Reset the height
    var newHeight = textArea.scrollHeight + 'px'; // Calculate the new height
    if (textArea.clientHeight < textArea.scrollHeight) {
        textArea.style.height = newHeight; // Only expand if the new height is greater
    }
}