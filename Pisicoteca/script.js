let pisici = [];
let pisiciCapturate = [];
let imaginiPisici = [];

function preload() {
  for (let i = 1; i <= 10; i++) {
    imaginiPisici.push(loadImage(`assets/pisica${i}.png`));
  }
}

function setup() {
  const canvas = createCanvas(640, 240);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(16);
  selecteazaPisiciAleatoare();
}

function draw() {
  background('#fff5fc');

  for (let i = 0; i < pisici.length; i++) {
    let p = pisici[i];
    let bounce = sin(frameCount * 0.1 + i) * 5;

    image(p.img, p.x, p.y + bounce, 64, 64);
  }
}

// Selectează 3 pisici necapturate, aleatoriu
function selecteazaPisiciAleatoare() {
  pisici = [];
  let indexuriDisponibile = imaginiPisici.map((_, i) => i).filter(i => !pisiciCapturate.includes(i));
  shuffle(indexuriDisponibile, true);

  for (let i = 0; i < 3 && i < indexuriDisponibile.length; i++) {
    let idx = indexuriDisponibile[i];
    pisici.push({
      img: imaginiPisici[idx],
      index: idx,
      x: 100 + i * 150,
      y: 100,
    });
  }
}

function mousePressed() {
  verificaClick(mouseX, mouseY);
}

function keyPressed() {
  verificaClick(mouseX, mouseY); // poți prinde și cu o tastă
}

function verificaClick(x, y) {
  for (let i = 0; i < pisici.length; i++) {
    let p = pisici[i];
    if (x > p.x && x < p.x + 64 && y > p.y && y < p.y + 64) {
      if (!pisiciCapturate.includes(p.index)) {
        pisiciCapturate.push(p.index);
        adaugaInAlbum(p.img);
      }
      selecteazaPisiciAleatoare();
      break;
    }
  }
}

function adaugaInAlbum(img) {
  let album = document.getElementById("album");
  let nouaPisica = createImg(img.canvas.toDataURL(), "Pisică");
  nouaPisica.parent(album);
}
