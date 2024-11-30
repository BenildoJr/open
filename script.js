let progress = 0; // Variável para controlar o progresso

// Função para aumentar o progresso
function increaseProgress() {
    if (progress < 100) {
        progress += 20; // Aumenta 20% por clique
        updateProgressBar(); // Atualiza a barra de progresso
    }

    // Desativa os botões se a barra chegar a 100%
    if (progress === 100) {
        disableButtons();
    }
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
}

// Função para desabilitar os botões
function disableButtons() {
    const buttons = document.querySelectorAll('.progress-btn');
    buttons.forEach(button => {
        button.disabled = true;
    });
}
