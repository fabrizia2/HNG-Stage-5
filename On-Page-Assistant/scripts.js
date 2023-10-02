let isDragging = false;
let initialX;
let initialY;
let isResizing = false;
let avatar;
let avatarInitialWidth;
let avatarInitialHeight;

document.addEventListener('DOMContentLoaded', () => {
  const assistant = document.querySelector('.assistant');
  avatar = assistant ? assistant.querySelector('.avatar') : null;

  if (avatar) {
    avatar.addEventListener('mousedown', onAvatarMouseDown);
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
  } else {
    console.error('Avatar element not found.');
  }

  const button1 = document.getElementById('button1');
  if (button1) {
    button1.addEventListener('click', () => {
      moveToButtonAndExplain(button1, 'Get all your questions answered here.');
    });
  }

  const button2 = document.getElementById('button2');
  if (button2) {
    button2.addEventListener('click', () => {
      moveToButtonAndExplain(button2, 'Help in answering others questions over here');
    });
  }
});

function onAvatarMouseDown(event) {
  if (!avatar) return;
  event.preventDefault();
  isDragging = true;
  initialX = event.clientX - avatar.offsetLeft;
  initialY = event.clientY - avatar.offsetTop;
}

function onWindowMouseMove(event) {
  if (isDragging && avatar) {
    const newX = event.clientX - initialX;
    const newY = event.clientY - initialY;
    avatar.style.left = `${newX}px`;
    avatar.style.top = `${newY}px`;
  }

  if (isResizing && avatar) {
    const newWidth = Math.max(event.clientX - avatar.offsetLeft, 50);
    const newHeight = Math.max(event.clientY - avatar.offsetTop, 50);
    avatar.style.width = `${newWidth}px`;
    avatar.style.height = `${newHeight}px`;
  }
}

function onWindowMouseUp() {
  isDragging = false;
  isResizing = false;
}

function moveToButtonAndExplain(button, explanation) {
  const assistant = document.getElementById('assistant');
  const assistantText = document.getElementById('assistantText');

  const buttonRect = button.getBoundingClientRect();
  const buttonX = buttonRect.left + window.scrollX + buttonRect.width / 2;
  const buttonY = buttonRect.top + window.scrollY + buttonRect.height / 2;

  const avatarRect = avatar.getBoundingClientRect();
  const avatarX = avatarRect.left + avatarRect.width / 2;
  const avatarY = avatarRect.top + avatarRect.height / 2;

  const deltaX = buttonX - avatarX;
  const deltaY = buttonY - avatarY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const duration = 300;
  const speed = distance / duration;

  const startTime = performance.now();

  function moveAvatar(currentTime) {
    const elapsed = currentTime - startTime;

    if (elapsed < duration) {
      const progress = elapsed / duration;
      const moveX = deltaX * speed * progress;
      const moveY = deltaY * speed * progress;

      avatar.style.left = `${avatarX + moveX - avatarRect.width / 2}px`;
      avatar.style.top = `${avatarY + moveY - avatarRect.height / 2}px`;

      requestAnimationFrame(moveAvatar);
    } else {
      avatar.style.left = `${buttonX - avatarRect.width / 2}px`;
      avatar.style.top = `${buttonY - avatarRect.height / 2}px`;

      assistant.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
      assistant.style.opacity = '1';
      assistant.style.transform = 'translateY(0)';
      assistantText.innerText = explanation;
    }
  }

  requestAnimationFrame(moveAvatar);
}
