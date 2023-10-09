document.addEventListener('DOMContentLoaded', () => {
    const deleteRiddleForm = document.getElementById('deleteRiddleForm');
  
    deleteRiddleForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
  
      const deleteIdInput = document.getElementById('deleteId').value;
  
      fetch(`/api/riddles/${deleteIdInput}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 204) {
            alert('Enigme deleted successfully!');
            document.getElementById('deleteId').value = '';
          } else if (response.status === 404) {
            alert('Enigme not found.');
          }
        })
        .catch((error) => {
          console.error('Error deleting enigme:', error);
        });
    });
  });
  