const canvas = document.getElementById("tabuleiro");
const ctx = canvas.getContext("2d");
const elPontos = document.getElementById("pontos");
const elRecorde = document.getElementById("recorde");
const elMensagem = document.getElementById("mensagem");

const TAMANHO = 20;                       // tamanho de cada quadrado
const COLUNAS = canvas.width / TAMANHO;
const LINHAS = canvas.height / TAMANHO;

let cobra, direcao, proximaDirecao, comida, pontos, intervalo, pausado, fimDeJogo;
let recorde = Number(localStorage.getItem("recorde-cobrinha")) || 0;
elRecorde.textContent = recorde;

function iniciar() {
  cobra = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  direcao = { x: 0, y: 0 };
  proximaDirecao = direcao;
  pontos = 0;
  pausado = false;
  fimDeJogo = false;
  elPontos.textContent = pontos;
  elMensagem.textContent = "Pressione uma seta (ou WASD) para começar";
  gerarComida();
  clearInterval(intervalo);
  intervalo = setInterval(atualizar, 120);
  desenhar();
}

function gerarComida() {
  do {
    comida = {
      x: Math.floor(Math.random() * COLUNAS),
      y: Math.floor(Math.random() * LINHAS),
    };
  } while (cobra.some(p => p.x === comida.x && p.y === comida.y));
}

function atualizar() {
  if (pausado || fimDeJogo) return;
  direcao = proximaDirecao;
  if (direcao.x === 0 && direcao.y === 0) return; // ainda não começou

  const cabeca = { x: cobra[0].x + direcao.x, y: cobra[0].y + direcao.y };

  const bateuParede = cabeca.x < 0 || cabeca.x >= COLUNAS || cabeca.y < 0 || cabeca.y >= LINHAS;
  const bateuCorpo = cobra.some(p => p.x === cabeca.x && p.y === cabeca.y);
  if (bateuParede || bateuCorpo) return terminar();

  cobra.unshift(cabeca);

  if (cabeca.x === comida.x && cabeca.y === comida.y) {
    pontos += 10;
    elPontos.textContent = pontos;
    gerarComida();
  } else {
    cobra.pop();
  }
  desenhar();
}

function terminar() {
  fimDeJogo = true;
  if (pontos > recorde) {
    recorde = pontos;
    elRecorde.textContent = recorde;
    try { localStorage.setItem("recorde-cobrinha", recorde); } catch (e) {}
  }
  elMensagem.textContent = `Fim de jogo! Você fez ${pontos} pontos. Clique em Reiniciar.`;
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(comida.x * TAMANHO, comida.y * TAMANHO, TAMANHO - 2, TAMANHO - 2);

  cobra.forEach((p, i) => {
    ctx.fillStyle = i === 0 ? "#58e08f" : "#2ecc71";
    ctx.fillRect(p.x * TAMANHO, p.y * TAMANHO, TAMANHO - 2, TAMANHO - 2);
  });
}

function mudarDirecao(nova) {
  // impede de voltar na direção contrária
  if (nova.x === -direcao.x && nova.y === -direcao.y && (direcao.x || direcao.y)) return;
  proximaDirecao = nova;
  if (!fimDeJogo && !pausado) elMensagem.textContent = "";
}

function alternarPausa() {
  if (fimDeJogo) return;
  pausado = !pausado;
  elMensagem.textContent = pausado ? "Jogo pausado" : "";
}

document.addEventListener("keydown", (e) => {
  const teclas = {
    ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
  };
  if (e.key === " ") { e.preventDefault(); return alternarPausa(); }
  const nova = teclas[e.key] || teclas[e.key.toLowerCase()];
  if (nova) { e.preventDefault(); mudarDirecao(nova); }
});

document.getElementById("btn-pausar").addEventListener("click", alternarPausa);
document.getElementById("btn-reiniciar").addEventListener("click", iniciar);

iniciar();
