document.addEventListener('DOMContentLoaded', () => {
    const createEnigmeButton = document.getElementById('createEnigmeButton');
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answerInput');
  
    createEnigmeButton.addEventListener('click', () => {
      const question = questionInput.value;
      const answer = answerInput.value;
  
      if (!question || !answer) {
        alert('Both question and answer are required.');
        return;
      }
  
      const requestBody = {
        question: question,
        answer: answer,
      };
  
      fetch(`/api/riddles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((newEnigme) => {
          console.log("3");
          alert('Enigme created successfully!');
          questionInput.value = '';
          answerInput.value = '';
        })
        .catch((error) => {
          console.error('Error creating enigme:', error);
        });
    });
  });
  
  