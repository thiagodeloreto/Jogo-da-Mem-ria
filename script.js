const cartas = document.querySelectorAll('.carta');

let hasFlippedCard = false; 
let bloquearCarta = false;
let primeiraCarta;
let segundaCarta;
let paresDesabilitados = 0; 
const numPares = cartas.length / 2;


const botaoComecarJogo = document.getElementById('botao-comecar-jogo');
const modalInicio = document.getElementById('modal-inicio');

botaoComecarJogo.addEventListener('click', iniciarJogo);

function iniciarJogo() {

    modalInicio.style.display = 'none';

    embaralhar();

  cartas.forEach(card => card.addEventListener('click', virarCartas));
}




function virarCartas(){
    if(bloquearCarta) return;
    if(this == primeiraCarta) return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    bloquearCarta = true;
    
    checarPar();
}


function checarPar() {
    let isMatch = primeiraCarta.dataset.tipo === segundaCarta.dataset.tipo;

    if (isMatch) {
    desabilitarPar();
    paresDesabilitados++;

    if (paresDesabilitados === numPares) {
      vencerPartida();
    }
  } else {
    desvirarCartas();
  }
}

  function vencerPartida(){

    setTimeout(() => {
      const modal = document.createElement('div');
      modal.classList.add('modal');
    
      const mensagem = document.createElement('p');
      mensagem.textContent = 'Parabéns, você ganhou!';
    
      const botaoReiniciar = document.createElement('button');
      botaoReiniciar.textContent = 'Reiniciar';
      botaoReiniciar.addEventListener('click', () => {
        location.reload(); // recarrega a página para reiniciar a partida
      });
    
      modal.appendChild(mensagem);
      modal.appendChild(botaoReiniciar);
    
      document.body.appendChild(modal);

    }, 1000);

  }

function desabilitarPar(){
    primeiraCarta.removeEventListener('click', virarCartas);
    segundaCarta.removeEventListener('click', virarCartas);
    resetarTabuleiro();
}

function desvirarCartas(){
    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');
        resetarTabuleiro();
    }, 1500)
}

function resetarTabuleiro(){
    [hasFlippedCard, bloquearCarta] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null]; 
}

function embaralhar(){
    cartas.forEach(card => {
        let posAleatoria = Math.floor(Math.random() * 12);
        card.style.order = posAleatoria;
    });
};





