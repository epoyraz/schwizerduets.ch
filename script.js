document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("myTextarea")
    .addEventListener("input", updateCharactersLeft);
  document.getElementById("myTextarea").value =
    "Grüezi! Künstliche Intelligenz kann nun auch Schwizerdütsch. Schreibe einen Text auf Hochdeutsch und generiere ein Audio auf Schwizerdütsch. Probiere es aus!";

  updateCharactersLeft();
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

  document
    .getElementById("downloadAudio")
    .addEventListener("click", downloadAudio);

  document.getElementById("myAudio").src =
    "https://media.play.ht/full_-NZGyPQ8HkDXT2SBMoV7.mp3?generation=1688223722137842&alt=media";
});

function downloadAudio() {
  var randomText = Math.random().toString(36).substring(5);

  var audio = document.getElementById("myAudio");
  var url = audio.src;
  var a = document.createElement("a");
  a.href = url;
  a.click();
}

function addSampleText(event) {
  // check id of event target id
  var sampleText = "";
  if (event.target.id === "sampleText1") {
    sampleText =
      "Grüezi! Künstliche Intelligenz kann nun auch Schwizerdütsch. Schreibe einen Text auf Hochdeutsch und generiere ein Audio auf Schwizerdütsch. Probiere es aus!";
    document.getElementById("myAudio").src =
      "https://media.play.ht/full_-NZGyPQ8HkDXT2SBMoV7.mp3?generation=1688223722137842&alt=media";
    document.getElementById("downloadAudio").disabled = false;
  }
  if (event.target.id === "sampleText2") {
    sampleText =
      "Die SBB AG ist das grösste Unternehmen des öffentlichen Verkehrs in der Schweiz und eine der grössten Arbeitgeberinnen des Landes. Zu ihren Service-Public-Leistungen gehören der Personenverkehr und die Schieneninfrastruktur.";
    document.getElementById("myAudio").src =
      "https://media.play.ht/full_-NZH1YN3TLlfQzYkTnT4.mp3?generation=1688224808039674&alt=media";
    document.getElementById("downloadAudio").disabled = false;
  }
  if (event.target.id === "sampleText3") {
    sampleText =
      "Die Geschichte von Heidi hat dazu beigetragen, die Vorstellung von den Schweizer Alpen als idyllischer und romantischer Kulisse zu prägen.";
    document.getElementById("myAudio").src =
      "https://media.play.ht/full_-NZH1gUMxXJ72-mN4fRr.mp3?generation=1688224845019514&alt=media";
    document.getElementById("downloadAudio").disabled = false;
  }
  if (event.target.id === "sampleText4" || event.target.id === "trashIcon") {
    sampleText = "";
    document.getElementById("sampleText4").disabled = true;
    document.getElementById("downloadAudio").disabled = true;
    document.getElementById("myAudio").removeAttribute("src");
  }

  document.getElementById("myTextarea").value = sampleText;
  if (sampleText.length == 0) {
    document.getElementById("submitButton").disabled = true;
  } else {
    document.getElementById("submitButton").disabled = false;
  }

  updateCharactersLeft();
}

function updateCharactersLeft() {
  if (document.getElementById("myTextarea").value.length > 0) {
    document.getElementById("sampleText4").disabled = false;
    document.getElementById("submitButton").disabled = false;
  }
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
    document.getElementById("downloadAudio").disabled = false;
  } else {
  }
}
