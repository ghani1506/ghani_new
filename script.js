function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(topic) {
  switch (topic) {
    case "fractions":
      let a = getRandomInt(1, 9), b = getRandomInt(2, 10);
      return [`Simplify: ${a*b}/${b*b}`, `${a}/${b}`];
    case "percentage":
      let price = getRandomInt(20, 100), discount = getRandomInt(10, 50);
      return [`An item costs $${price} with ${discount}% discount. Find sale price.`,
              `$${(price * (1 - discount / 100)).toFixed(2)}`];
    case "volume":
      let l = getRandomInt(2, 10), w = getRandomInt(2, 10), h = getRandomInt(2, 10);
      return [`Find volume of cuboid ${l}×${w}×${h} cm.`, `${l*w*h} cm³`];
    case "equations":
      let x = getRandomInt(1, 20), m = getRandomInt(1, 5);
      return [`Solve: ${m}x = ${m*x}`, `x = ${x}`];
    case "probability":
      let total = getRandomInt(10, 30), red = getRandomInt(1, 9);
      return [`Bag has ${red} red out of ${total} balls. P(red)?`, `${red}/${total}`];
  }
}

function generateWorksheet() {
  const topic = document.getElementById("topic").value;
  const num = parseInt(document.getElementById("numQuestions").value);
  const worksheetDiv = document.getElementById("worksheet");
  const answersDiv = document.getElementById("answers");
  worksheetDiv.innerHTML = '';
  answersDiv.innerHTML = '';

  for (let i = 1; i <= num; i++) {
    let [q, a] = generateQuestion(topic);
    worksheetDiv.innerHTML += `<p>${i}. ${q}</p>`;
    answersDiv.innerHTML += `<p>${i}. ${a}</p>`;
  }
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let worksheetText = document.getElementById("worksheet").innerText;
  let answersText = document.getElementById("answers").innerText;
  doc.text("SPN21 Maths Worksheet", 10, 10);
  doc.text(worksheetText, 10, 20);
  doc.addPage();
  doc.text("Answer Key", 10, 10);
  doc.text(answersText, 10, 20);
  doc.save("worksheet.pdf");
}
