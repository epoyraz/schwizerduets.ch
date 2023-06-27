document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("myTextarea")
    .addEventListener("input", updateCharactersLeft);
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
    sampleText = "Ich bin ein Schwizerdütsch Text";
  }
  if (event.target.id === "sampleText2") {
    sampleText =
      "Das Netz ist unser Kernstück. Damit versorgen wir die Schweiz mit besonders leistungsfähigen und superschnellen Breitbandtechnologien. Und unser Netzausbau geht weiter: Bis Ende 2025 bauen wir die Glasfasernetz-Abdeckung in der Schweiz auf zwischen 50 und 55 Prozent aus und treiben parallel dazu den Mobilfunkausbau voran. Mit jährlichen Investitionen von 1,6 Mrd. Franken wollen wir unseren Kundinnen und Kunden eine herausragende Infrastruktur anbieten und leisten damit auch einen Beitrag zu einer wettbewerbsfähigen Schweiz.";
  }
  if (event.target.id === "sampleText3") {
    sampleText = "Ich bin ein dritter Schwizerdütsch Text";
  }
  if (event.target.id === "sampleText4") {
    sampleText = "";
  }
  document.getElementById("myTextarea").value = sampleText;
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
