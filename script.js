// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = parseInt(localStorage.getItem('progress') || 0); // Pega o progresso do localStorage
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);

    // Habilita o botão de votação se o progresso for 100%
    if (progress >= 100) {
        enableVotingButton();
    }
}

// Função para habilitar o botão de votação
function enableVotingButton() {
    const votingButton = document.getElementById('votingBtn');
    votingButton.disabled = false;
    votingButton.style.backgroundColor = '#2196f3'; // Cor azul quando habilitado
}

// Função para atualizar o estado de um botão
function updateButtonState(buttonId, isClicked) {
    const button = document.getElementById(buttonId);
    if (isClicked) {
        button.disabled = true;
        button.style.backgroundColor = '#ccc'; // Muda a cor quando desabilitado
    } else {
        button.disabled = false;
        button.style.backgroundColor = '#4caf50'; // Cor original do botão
    }
}

// Função para registrar a ação de um botão
function handleButtonClick(buttonId) {
    let progress = parseInt(localStorage.getItem('progress') || 0);
    if (progress < 100) {
        progress += 20; // Aumenta o progresso em 20%
        localStorage.setItem('progress', progress); // Salva o novo valor no localStorage
        updateProgressBar(); // Atualiza a barra de progresso

        // Marca o botão como clicado
        localStorage.setItem(buttonId, 'clicked');
        updateButtonState(buttonId, true);
    }
}

// Função para reiniciar o progresso
function resetProgress() {
    localStorage.setItem('progress', 0);
    updateProgressBar();
    for (let i = 1; i <= 5; i++) {
        localStorage.removeItem(`button${i}`);
        updateButtonState(`button${i}`, false);
    }

    // Desabilita o botão de votação
    const votingButton = document.getElementById('votingBtn');
    votingButton.disabled = true;
    votingButton.style.backgroundColor = '#ccc';
}

// Função para simular o clique do botão via QR Code
function handleQRCodeScan(buttonId) {
    if (!localStorage.getItem(buttonId)) {
        handleButtonClick(buttonId);
    }
}

// Função para redirecionar para o Google Forms para votar
function vote() {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfkABb7ihtrT19LHMEqOy4vVXWpfGF7Fd2w-gmBxqKadJvHQA/viewform';
}

// Inicializa a página
function initialize() {
    updateProgressBar(); // Atualiza a barra de progresso ao carregar

    for (let i = 1; i <= 5; i++) {
        const isClicked = localStorage.getItem(`button${i}`) === 'clicked';
        updateButtonState(`button${i}`, isClicked);
    }

    if (parseInt(localStorage.getItem('progress') || 0) === 100) {
        enableVotingButton();
    }
}

// Adiciona os ouvintes de evento para os botões
for (let i = 1; i <= 5; i++) {
    document.getElementById(`button${i}`).addEventListener('click', () => handleButtonClick(`button${i}`));
}

// Adiciona o ouvinte de evento para o botão de reset
document.getElementById('resetBtn').addEventListener('click', resetProgress);

// Adiciona os ouvintes de evento para os QR codes
for (let i = 1; i <= 5; i++) {
    document.getElementById(`qr${i}`).addEventListener('click', () => handleQRCodeScan(`button${i}`));
}

// Adiciona o ouvinte de evento para o botão de votação
document.getElementById('votingBtn').addEventListener('click', vote);

// Inicializa a página ao carregar
window.onload = initialize;
