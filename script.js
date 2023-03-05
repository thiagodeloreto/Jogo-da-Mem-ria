const cartas = document.querySelectorAll('.carta');

let hasFlippedCard = false; 
let bloquearCarta = false;
let primeiraCarta;
let segundaCarta;

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
    isMatch ? desabilitarPar() : desvirarCartas();
  }

function desabilitarPar(){
    primeiraCarta.removeEventListener('click', virarCartas);
    segundaCarta.removeEventListener('click', virarCartas);
    resetarTabuleiro();
}

function resetarTabuleiro(){
    [hasFlippedCard, bloquearCarta] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
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

(function embaralhar(){
    cartas.forEach(card => {
        let posAleatoria = Math.floor(Math.random() * 12);
        card.style.order = posAleatoria;
    });
})();

cartas.forEach(card => card.addEventListener('click', virarCartas));
