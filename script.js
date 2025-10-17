const button = document.getElementById("openButton");
const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");
const forYouText = document.getElementById("forYouText");

button.addEventListener("click", () => {
  button.style.display = "none";
  canvas.style.display = "block";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBouquet();
});

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// 🌤 Dibujar nube
function drawCloud(x, y, size) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  for (let i = 0; i < 6; i++) {
    const offsetX = Math.cos((i / 6) * Math.PI * 2) * size * 0.5;
    const offsetY = Math.sin((i / 6) * Math.PI * 2) * size * 0.4;
    ctx.arc(x + offsetX, y + offsetY, size * 0.3, 0, Math.PI * 2);
  }
  ctx.fill();
}

// 🌟 Estrellitas pequeñas
function drawStar(x, y, size) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,200,0.9)";
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5;
    const xPoint = x + Math.cos(angle) * size;
    const yPoint = y + Math.sin(angle) * size;
    ctx.lineTo(xPoint, yPoint);
  }
  ctx.closePath();
  ctx.fill();
}

// 🌸 Dibujar flor con tallo
function drawFlower(x, y, size, petalColor, centerColor) {
  // Tallo
  ctx.beginPath();
  ctx.strokeStyle = "#2e8b57";
  ctx.lineWidth = size * 0.15;
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + size * 3.5);
  ctx.stroke();

  // Pétalos
  ctx.fillStyle = petalColor;
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const px = x + Math.cos(angle) * size;
    const py = y + Math.sin(angle) * size;
    ctx.beginPath();
    ctx.ellipse(px, py, size * 0.7, size * 1.5, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  // Centro
  ctx.beginPath();
  ctx.fillStyle = centerColor;
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

// 🌸 Dibuja ramo con nubes y estrellas
function drawBouquet() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo suave
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#b3e5fc");
  grad.addColorStop(1, "#e1bee7");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Nubes
  for (let i = 0; i < 15; i++) {
    drawCloud(random(50, canvas.width - 50), random(30, canvas.height / 2), random(20, 80));
  }

  // Estrellas
  for (let i = 0; i < 25; i++) {
    drawStar(random(0, canvas.width), random(0, canvas.height / 1.3), random(1, 3));
  }

  // Flores
  const flowerColors = [
    ["#ffb6c1", "#ff69b4"],
    ["#ffdab9", "#ffa07a"],
    ["#fff0f5", "#ffc0cb"],
    ["#e6e6fa", "#9370db"],
    ["#ffffff", "#f5f5f5"],
  ];

  const centerY = canvas.height * 0.75;
  const centerX = canvas.width / 2;

  for (let i = -3; i <= 3; i++) {
    const [petal, center] = flowerColors[Math.floor(random(0, flowerColors.length))];
    drawFlower(centerX + i * 60, centerY + random(-30, 30), random(25, 35), petal, center);
  }

  // Texto "For you" 2cm más abajo
  forYouText.style.top = "calc(25% + 2cm)";
  forYouText.classList.add("show");
}