document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('nameInput');
    const output = document.getElementById('output');
    const nextButtonContainer = document.getElementById('nextButtonContainer');
    const nextButton = document.getElementById('nextButton');
    const terminal = document.querySelector('.terminal');

    // Focus the input when page loads
    input.focus();

    // Handle input submission
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            processInput();
        }
    });

    // Focus input when clicking terminal
    terminal.addEventListener('click', (e) => {
        if (e.target !== nextButton && !nextButton.contains(e.target)) {
            input.focus();
        }
    });

    function processInput() {
        const name = input.value.trim();
        if (!name) return;

        input.value = '';

        if (name.toLowerCase() === 'anne') {
            output.innerHTML += '<p>The darkness shatters! A brilliant light floods the ship.</p>';
            output.innerHTML += '<p>The engines hum to life. You\'re heading home...</p>';
            input.disabled = true;
            input.placeholder = 'Access Granted';
            nextButtonContainer.style.display = 'block';
        } else {
            // Show error message in red
            const errorMsg = document.createElement('p');
            errorMsg.textContent = `"${name}" is not the correct name. Try again...`;
            errorMsg.classList.add('error-message');
            output.appendChild(errorMsg);
        }

        output.scrollTop = output.scrollHeight;
    }
});