document.addEventListener('DOMContentLoaded', () => {
  const loadingTexts = [
      "INITIALIZING ESCAPE SEQUENCE...",
      "CHARGING BOOSTERS...",
      "CALCULATING TRAJECTORY...",
      "PREPARING FOR LAUNCH..."
  ];
  
  let currentIndex = 0;
  const loadingTextElement = document.querySelector('.loading-text');
  
  // Change loading text every 1 second
  const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingTexts.length;
      loadingTextElement.textContent = loadingTexts[currentIndex];
  }, 1000);
  
  // Redirect to next task after 5 seconds
  setTimeout(() => {
      clearInterval(textInterval);
      window.location.href = '#';
  }, 5000);
});