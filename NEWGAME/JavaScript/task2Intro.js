document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.querySelector('.terminal');
    const message = document.getElementById('message');
    
    if (!terminal || !message) {
        console.error('Required elements not found');
        return;
    }

    terminal.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const input = terminal.value.trim().replace(/\s/g, '');
            
            if (input.split(',').length === 3) {
                if (input === '19,13,55') {
                    try {
                        await updatePoints(30);
                    } catch (error) {
                        console.error('Error updating points:', error);
                    }
                    setTimeout(() => {
                        window.location.href = '../HTML/task2Memory.html';
                    }, 1500);
                } else {
                    message.textContent = 'Please enter 3 comma-separated values';
                    setTimeout(() => {
                        window.location.href = '../HTML/task2Memory.html';
                    }, 1500);
                }
            } else {
                message.textContent = 'Please enter 3 comma-separated values';
            }
        }
    });

    terminal.value = '';
    terminal.focus();
});
