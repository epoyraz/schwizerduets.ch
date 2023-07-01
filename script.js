document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("myTextarea")
    .addEventListener("input", updateCharactersLeft);
  document.getElementById("myTextarea").value =
    "Grüezi! Künstliche Intelligenz kann nun auch Schwizerdütsch. Schreibe einen Text auf Hochdeutsch und generiere ein Audio auf Schwizerdütsch. Probiere es aus!";

  document.getElementById("submitButton").addEventListener("click", submitForm);

  document
    .getElementById("sampleText1")
    .addEventListener("click", addSampleText);
  document
    .getElementById("sampleText2")
    .addEventListener("click", addSampleText);
  document
    .getElementById("sampleText3")
    .addEventListener("click", addSampleText);
  document
    .getElementById("sampleText4")
    .addEventListener("click", addSampleText);
});

function addSampleText(event) {
  // check id of event target id
  var sampleText = "";
  if (event.target.id === "sampleText1") {
    sampleText =
      "Grüezi! Künstliche Intelligenz kann nun auch Schwizerdütsch. Schreibe einen Text auf Hochdeutsch und generiere ein Audio auf Schwizerdütsch. Probiere es aus!";
  }
  if (event.target.id === "sampleText2") {
    sampleText =
      "Die SBB AG ist das grösste Unternehmen des öffentlichen Verkehrs in der Schweiz und eine der grössten Arbeitgeberinnen des Landes. Zu ihren Service-Public-Leistungen gehören der Personenverkehr und die Schieneninfrastruktur.";
  }
  if (event.target.id === "sampleText3") {
    sampleText =
      "Die Geschichte von Heidi hat dazu beigetragen, die Vorstellung von den Schweizer Alpen als idyllischer und romantischer Kulisse zu prägen.";
  }
  if (event.target.id === "sampleText4") {
    sampleText = "";
  }

  document.getElementById("myTextarea").value = sampleText;
  if (sampleText.length < 5) {
    document.getElementById("submitButton").disabled = true;
  } else {
    document.getElementById("submitButton").disabled = false;
  }
}

function updateCharactersLeft() {
  var inputLength = document.getElementById("myTextarea").value.length;
  var charsLeft = 300 - inputLength;
  document.getElementById("charsLeft").innerText = charsLeft + " Zeichen übrig";
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
