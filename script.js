let numeroSecreto;
let tentativasRestantes;
let jogoAtivo;
let tentativasFeitas;

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 101); // 0 a 100
    tentativasRestantes = 7;
    jogoAtivo = true;
    tentativasFeitas = [];
    
    document.getElementById('tentativas').textContent = tentativasRestantes;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('palpite').value = '';
    document.getElementById('palpite').disabled = false;
    document.getElementById('novo-jogo').style.display = 'none';
    document.getElementById('lista-tentativas').innerHTML = '';
    
    console.log('Número secreto:', numeroSecreto); // Para debug - remover em produção
}

function verificarPalpite() {
    if (!jogoAtivo) return;
    
    const palpite = parseInt(document.getElementById('palpite').value);
    const feedbackElement = document.getElementById('feedback');
    
    // Validar entrada
    if (isNaN(palpite) || palpite < 0 || palpite > 100) {
        feedbackElement.textContent = 'Por favor, digite um número entre 0 e 100!';
        feedbackElement.className = 'feedback';
        return;
    }
    
    // Verificar se já foi tentado
    if (tentativasFeitas.includes(palpite)) {
        feedbackElement.textContent = 'Você já tentou esse número!';
        feedbackElement.className = 'feedback';
        return;
    }
    
    // Adicionar à lista de tentativas
    tentativasFeitas.push(palpite);
    adicionarTentativaAoHistorico(palpite);
    
    tentativasRestantes--;
    document.getElementById('tentativas').textContent = tentativasRestantes;
    
    // Verificar o palpite
    if (palpite === numeroSecreto) {
        feedbackElement.textContent = `🎉 Parabéns! Você acertou o número ${numeroSecreto}!`;
        feedbackElement.className = 'feedback correto';
        terminarJogo(true);
    } else if (tentativasRestantes === 0) {
        feedbackElement.textContent = `😞 Suas tentativas acabaram! O número era ${numeroSecreto}.`;
        feedbackElement.className = 'feedback perdeu';
        terminarJogo(false);
    } else if (palpite > numeroSecreto) {
        feedbackElement.textContent = '📉 O número é MENOR que seu palpite!';
        feedbackElement.className = 'feedback menor';
    } else {
        feedbackElement.textContent = '📈 O número é MAIOR que seu palpite!';
        feedbackElement.className = 'feedback maior';
    }
    
    // Limpar input
    document.getElementById('palpite').value = '';
}

function adicionarTentativaAoHistorico(palpite) {
    const lista = document.getElementById('lista-tentativas');
    const item = document.createElement('li');
    
    let status;
    if (palpite === numeroSecreto) {
        status = '✅ CORRETO!';
    } else if (palpite > numeroSecreto) {
        status = '📉 Muito alto';
    } else {
        status = '📈 Muito baixo';
    }
    
    item.textContent = `${palpite} - ${status}`;
    lista.appendChild(item);
}

function terminarJogo(ganhou) {
    jogoAtivo = false;
    document.getElementById('palpite').disabled = true;
    document.getElementById('novo-jogo').style.display = 'inline-block';
}

function novoJogo() {
    iniciarJogo();
}

// Permitir jogar pressionando Enter
document.getElementById('palpite').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarPalpite();
    }
});

// Iniciar o jogo quando a página carregar
window.onload = function() {
    iniciarJogo();
};