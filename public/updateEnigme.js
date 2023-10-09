document.addEventListener('DOMContentLoaded', () => {
    const updateRiddleForm = document.getElementById('updateRiddleForm');
  
    updateRiddleForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
  
      const updateIdInput = document.getElementById('updateId').value;
      const updateQuestionInput = document.getElementById('updateQuestion').value;
      const updateAnswerInput = document.getElementById('updateAnswer').value;
  
      const requestBody = {
        question: updateQuestionInput,
        answer: updateAnswerInput,
      };
  
      fetch(`/api/riddles/${updateIdInput}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((updatedEnigme) => {
          alert('Enigme updated successfully!');
          document.getElementById('updateId').value = '';
          document.getElementById('updateQuestion').value = '';
          document.getElementById('updateAnswer').value = '';
        })
        .catch((error) => {
          console.error('Error updating enigme:', error);
        });
    });
  });
  