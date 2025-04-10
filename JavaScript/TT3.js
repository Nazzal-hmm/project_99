document.addEventListener('DOMContentLoaded', () => {
    let gameActive = true;
  
    // Code validation function
    window.validateCode = async function() {
        if (!gameActive) return;
  
        const codeInput = document.getElementById('boost-code');
        const correctCode = '23024517';
        
        if (codeInput.value === correctCode) {
            codeInput.classList.remove('incorrect');
            codeInput.classList.add('success');
            gameActive = false;
            
            try {
                await updatePoints(10); // Award 10 points for correct answer
                setTimeout(() => {
                    window.location.href = 'ending2_2.html';
                }, 1000);
            } catch (error) {
                console.error('Error updating points:', error);
                // Still redirect even if points update fails
                window.location.href = 'ending2_1.html';
            }
        } else if (codeInput.value.length === 8) {
            codeInput.classList.remove('success');
            codeInput.classList.add('incorrect');
            setTimeout(() => {
                codeInput.classList.remove('incorrect');
            }, 1000);
        }
    };
});
