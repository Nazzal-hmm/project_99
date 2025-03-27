document.addEventListener('DOMContentLoaded', function() {
  const commandInput = document.getElementById('commandInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminal = document.getElementById('terminal');

  // Ensure input gets focus when clicking inside terminal
  terminal.addEventListener('click', function() {
      commandInput.focus();
  });

  // Ensure input is focused on page load
  setTimeout(() => commandInput.focus(), 100);

  commandInput.addEventListener('blur', function() {
      setTimeout(() => commandInput.focus(), 100); // Refocus if blurred
  });

  commandInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          const command = this.value.trim().toLowerCase();
          this.value = '';

          if (command === 'go to maintenance room') {
              terminalOutput.innerHTML += '<br>> ACCESSING TURBO BOOSTER OVERRIDE...';
              setTimeout(function() {
                  window.location.href = '../HTML/Nztask3.html'; // Change this to the actual next page or action
              }, 1500);
          } else {
              terminalOutput.innerHTML += `<br>> ${command}: COMMAND NOT RECOGNIZED`;
              terminalOutput.innerHTML += '<br>> TYPE "GO TO MAINTENANCE ROOM" TO BEGIN OVERRIDE SEQUENCE';
          }

          // Auto-scroll to bottom
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
  });
});