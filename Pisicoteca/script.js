// Colectie de pisici prietenoase – le prindem in canvas
let pisici = [];
let pisiciColectate = [];
let imaginiPisici = [];
let pisicaSelectata = 0;

// Preîncarcă imaginile (numite exact ca fișierele din assets/)
function preload() {
  for (let i = 1; i <= 3; i++) {
    let img = loadImage(`assets/pisica${i}.png`);
    imaginiPisici.push(img);
  }
}

// Se rulează o singură dată la început
function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);

  // Generăm 3 pisici în locații random
  for (let i = 0; i < imaginiPisici.length; i++) {
    pisici.push({
      x: random(100, width - 100),
      y: random(100, height - 100),
      img: imaginiPisici[i],
      gasita: false
    });
  }
}

// Se rulează în buclă, de 60 de ori pe secundă
function draw() {
  background('#fff0f5');

  // Afișăm toate pisicile (care nu au fost deja prinse)
  for (let i = 0; i < pisici.length; i++) {
    if (!pisici[i].gasita) {
      // Animatie bouncing
      let yOffset = sin(frameCount * 0.1 + i) * 5;
      image(pisici[i].img, pisici[i].x, pisici[i].y + yOffset, 64, 64);
    }
  }

  // Afișăm scorul
  fill(80);
  textSize(16);
  textAlign(LEFT);
  text(`Pisici prinse: ${pisiciColectate.length}/${pisici.length}`, 10, 20);
}

// Prinde o pisică dacă dai click pe ea
function mousePressed() {
  for (let i = 0; i < pisici.length; i++) {
    if (!pisici[i].gasita) {
      let d = dist(mouseX, mouseY, pisici[i].x, pisici[i].y);
      if (d < 32) {
        pisici[i].gasita = true;
        pisiciColectate.push(pisici[i].img);
      }
    }
  }
}

// Alternativ, cu tastele: selectezi și prinzi cu Enter
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    pisicaSelectata = (pisicaSelectata - 1 + pisici.length) % pisici.length;
  } else if (keyCode === RIGHT_ARROW) {
    pisicaSelectata = (pisicaSelectata + 1) % pisici.length;
  } else if (keyCode === ENTER) {
    if (!pisici[pisicaSelectata].gasita) {
      pisici[pisicaSelectata].gasita = true;
      pisiciColectate.push(pisici[pisicaSelectata].img);
    }
  }
}
