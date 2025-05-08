document.addEventListener('DOMContentLoaded', function() {
  const deepseekImg = document.querySelector('.deepseek img');
  
  // Initial setup
  let scale = 1;
  let direction = 0.005; // The amount to scale by each frame
  const minScale = 0.98;  // Minimum scale (exhale)
  const maxScale = 1.02;  // Maximum scale (inhale)
  
  function breathe() {
      // Update scale
      scale += direction;
      
      // Reverse direction when reaching limits
      if (scale >= maxScale || scale <= minScale) {
          direction *= -1;
      }
      
      // Apply the scale transform
      deepseekImg.style.transform = `scale(${scale})`;
      
      // Continue the animation
      requestAnimationFrame(breathe);
  }
  
  // Start the animation
  breathe();
});