document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('myTextarea').addEventListener('input', updateCharactersLeft);
    document.getElementById('myForm').addEventListener('submit', submitForm);
  });
  a
  function updateCharactersLeft() {
    var inputLength = document.getElementById('myTextarea').value.length;
    var charsLeft = 300 - inputLength;
    document.getElementById('charsLeft').innerText = charsLeft + ' characters left';
  }
  
  async function submitForm(event) {
    event.preventDefault();
  
    var textareaValue = document.getElementById('myTextarea').value;
  
        // Show spinner
      document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('submitButton').disabled = true;
  
    var response = await fetch('https://example.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: textareaValue })
    });
  
    
      // Hide spinner
      document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('submitButton').disabled = false;
  
    if (response.ok) {
      alert('Form submitted successfully');
    } else {
      alert('Form submission failed');
    }
  }