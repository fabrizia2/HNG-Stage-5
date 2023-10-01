document.getElementById('button1').addEventListener('click', () => {
    moveToButtonAndExplain('Button 1 does something.');
  });
  
  document.getElementById('button2').addEventListener('click', () => {
    moveToButtonAndExplain('Button 2 does something else.');
  });
  
  document.getElementById('hoverIcon').addEventListener('click', () => {
    // Logic to trigger assistant's explanation for hovered elements
  });
  
  function moveToButtonAndExplain(explanation) {
    const assistant = document.getElementById('assistant');
    assistant.style.transition = 'transform 0.5s ease-in-out';
  
    // Calculate the movement offsets
    const buttonRect = event.target.getBoundingClientRect();
    const assistantRect = assistant.getBoundingClientRect();
    const offsetX = buttonRect.left - assistantRect.left;
    const offsetY = buttonRect.top - assistantRect.top;
  
    // Apply the animation to smoothly move the assistant
    assistant.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  
    // Show the assistant with a fade-in effect
    assistant.style.opacity = '1';
  
    // Show the explanation
    alert(explanation);
  }
  