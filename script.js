// Função para atualizar a barra de progresso com base na porcentagem
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = localStorage.getItem('progress') || 0;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

// Função para atualizar o estado de cada botão
function updateButtonState(buttonId, isClicked) {
    const button = document.getElementById(buttonId);
    if (isClicked) {
        button.disabled = true;
        button.style.backgroundColor = '#ccc';
    } else {
        button.disabled = false;
        button.style.backgroundColor = '#4caf50';
    }
}

// Função para registrar a ação de um botão
function handleButtonClick(buttonId) {
    const currentProgress = parseInt(localStorage.getItem('progress') || 0);
    if (currentProgress < 100) {
        const newProgress = currentProgress + 20;
        localStorage.setItem('progress', newProgress);
        updateProgressBar();

        // Marca o botão como clicado
        localStorage.setItem(buttonId, 'clicked');
        updateButtonState(buttonId, true);
    }

    // Verifica se a barra de progresso está completa
    if (parseInt(localStorage.getItem('progress') || 0) === 100) {
        enableVotingButton();
    }
}

// Função para habilitar o botão de votação
function enableVotingButton() {
    const votingButton = document.getElementById('votingBtn');
    votingButton.disabled = false;
    votingButton.style.backgroundColor = '#2196f3';
}

// Função para reiniciar o progresso
function resetProgress() {
    localStorage.setItem('progress', 0);
    updateProgressBar();
    for (let i = 1; i <= 5; i++) {
        localStorage.removeItem(`button${i}`);
        updateButtonState(`button${i}`, false);
    }

    const votingButton = document.getElementById('votingBtn');
    votingButton.disabled = true;
    votingButton.style.backgroundColor = '#ccc';
}

// Função para simular o clique do botão através do QR code
function handleQRCodeScan(buttonId) {
    if (!localStorage.getItem(buttonId)) {
        handleButtonClick(buttonId);
    }
}

// Verifica o estado dos botões ao carregar a página
function initialize() {
    updateProgressBar();

    // Verifica o estado de cada botão
    for (let i = 1; i <= 5; i++) {
        const isClicked = localStorage.getItem(`button${i}`) === 'clicked';
        updateButtonState(`button${i}`, isClicked);
    }

    // Habilita o botão de votação se o progresso for 100%
    if (parseInt(localStorage.getItem('progress') || 0) === 100) {
        enableVotingButton();
    }

    // Verifica se há um hash na URL (ex: #button1)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#button')) {
        const buttonId = hash.substring(1); // Remove o '#' do hash
        handleQRCodeScan(buttonId); // Aciona o botão correspondente
    }
}

// Função para redirecionar para o formulário de votação do Google Forms
function vote() {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfkABb7ihtrT19LHMEqOy4vVXWpfGF7Fd2w-gmBxqKadJvHQA/viewform';
}

// Inicializa a página ao carregar
window.onload = initialize;

// Adiciona os ouvintes de evento para os botões
document.getElementById('button1').addEventListener('click', () => handleButtonClick('button1'));
document.getElementById('button2').addEventListener('click', () => handleButtonClick('button2'));
document.getElementById('button3').addEventListener('click', () => handleButtonClick('button3'));
document.getElementById('button4').addEventListener('click', () => handleButtonClick('button4'));
document.getElementById('button5').addEventListener('click', () => handleButtonClick('button5'));

// Adiciona o ouvinte de evento para o botão de reset
document.getElementById('resetBtn').addEventListener('click', resetProgress);

// Adiciona o ouvinte de evento para o botão de votação
document.getElementById('votingBtn').addEventListener('click', vote);
