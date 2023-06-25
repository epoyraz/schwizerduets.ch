document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("myTextarea")
    .addEventListener("input", updateCharactersLeft);
  document.getElementById("myForm").addEventListener("submit", submitForm);
});

function updateCharactersLeft() {
  var inputLength = document.getElementById("myTextarea").value.length;
  var charsLeft = 300 - inputLength;
  document.getElementById("charsLeft").innerText =
    charsLeft + " Zeichen übrig";
}

async function submitForm(event) {
  event.preventDefault();

  var textareaValue = document.getElementById("myTextarea").value;

  // Show spinner
  document.getElementById("loadingSpinner").style.display = "block";
  document.getElementById("submitButton").disabled = true;

  var response = await fetch(
    "https://schwizerduetsch-backend-3mdmydlrkq-ew.a.run.app/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textareaValue }),
    }
  );

  // Hide spinner
  document.getElementById("loadingSpinner").style.display = "none";
  document.getElementById("submitButton").disabled = false;

  if (response.ok) {
    var data = await response.json();
    console.log(data);
    document.getElementById("myAudio").src = data.audioUrl;
    console.log(data.audioUrl);
  } else {
  }
}
