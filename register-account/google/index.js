// Get the actual viewport height
const updateElementHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  // Call the function initially and whenever the window is resized
  window.addEventListener('resize', updateElementHeight);
  updateElementHeight();
  