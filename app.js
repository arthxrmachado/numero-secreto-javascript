// chamando funções
let listaSorteados = [];
let numeroLimite = 100;
novoJogo();

// alterando o 'h1' e o 'p' lá da página html
function exibirTextoNaTela(tag, texto) {    
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// função para exibir a mensagem inicial na tela quando um jogo começa ou é reiniciado
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// gerando número aleatório
function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
    //se a lista de números sorteados atingir todos os número possíveis (10), ele zera a lista   
    if (listaSorteados.length == numeroLimite) {
        listaSorteados = [];
    }
    // verificando se o número sorteado já existe na lista
    if (listaSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    }
    // adicionando o número sorteado na lista
    listaSorteados.push(numeroSorteado);
    console.log(listaSorteados);
    return numeroSorteado;
}

// quando o usuário digita um número errado, essa função limpa automaticamente o campo onde o número foi digitado
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    numeroTentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// verificando o chute
function verificarChute() {
    // verificando se quando o usuário clica no botão, existe um valor digitado. caso não exista, o programa não conta como válida a tentativa
    if (document.querySelector('input').value != '') {
        // pegando o valor que o usuário digita
        let chute = document.querySelector('input').value;
    
        if (chute == numeroSecreto) {
            // verificando se o usuário acertou em uma ou mais tentativas
            let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você precisou de ${numeroTentativas} ${palavraTentativa} para descobrir o número secreto.`;
            exibirTextoNaTela('h1', 'Acertou!');
            exibirTextoNaTela('p', mensagemTentativas);
            // após o usuário acertar o número secreto, o bo    tão de 'novo jogo' é liberado para poder ser clicado
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('h1', 'Errou! :(');
                exibirTextoNaTela('p', 'Tente um número menor...');
            } else {
                exibirTextoNaTela('h1', 'Errou! :(');
                exibirTextoNaTela('p', 'Tente um número maior...');
            }
            numeroTentativas++;
            limparCampo();
        }
    }
}