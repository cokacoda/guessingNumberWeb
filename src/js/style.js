// Shows or hides the explanation
document.addEventListener("DOMContentLoaded", function() {
    // Get all the toggle buttons or elements
    var toggles = document.querySelectorAll('#show-explanation-button');

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

// Auto resize the textarea
function autoResizeTextarea() {
    var textArea = document.getElementById("notes-input");
    textArea.style.height = 'auto'; // Reset the height
    var newHeight = textArea.scrollHeight + 'px'; // Calculate the new height
    if (textArea.clientHeight < textArea.scrollHeight) {
        textArea.style.height = newHeight; // Only expand if the new height is greater
    }
}

// Night mode
const themeToggleButton = document.getElementById('theme-toggle-button');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('night-mode');
    sunIcon.hidden = true;
    moonIcon.hidden = false;
}

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    const isDarkMode = document.body.classList.contains('night-mode');
    sunIcon.hidden = isDarkMode;
    moonIcon.hidden = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});


/*
window.addEventListener('resize', setButtonPosition);
document.addEventListener('DOMContentLoaded', setButtonPosition);

function setButtonPosition() {
    const gameContainer = document.querySelector('#gameContainer');
    const themeToggleButton = document.querySelector('.theme-toggle-button');
    if (gameContainer && themeToggleButton) {
        const rightPosition = gameContainer.getBoundingClientRect().left + 40
        const bottomPosition = gameContainer.getBoundingClientRect().top - 40
        themeToggleButton.style.right = `${rightPosition}px`;
        themeToggleButton.style.bottom = `${bottomPosition}px`;
    }
}*/
