document.addEventListener('DOMContentLoaded', () => {
    const loadedQuestionElement = document.getElementById('loadedQuestion');
    const loadedAnswerElement = document.getElementById('loadedAnswer');
    const loadRiddleButton = document.getElementById('loadRiddle');
  
    loadRiddleButton.addEventListener('click', () => {
      fetch('/api/riddles/random')
        .then((response) => response.json())
        .then((data) => {
          loadedQuestionElement.textContent = `Question: ${data.question}`;
          loadedAnswerElement.textContent = `Answer: ${data.answer}`;
          loadedAnswerElement.style.display = 'block'; 
        })
        .catch((error) => {
          console.error('Error loading riddle:', error);
        });
    });
  });  