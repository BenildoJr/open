// Função para atualizar a barra de progresso com base na porcentagem
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = parseInt(localStorage.getItem('progress') || 0); // Pega o progresso salvo no localStorage
    progressBar.style.width = `${progress}%`; // Atualiza a largura da barra com o valor de progresso
    progressBar.setAttribute('aria-valuenow', progress); // Atualiza o valor no atributo 'aria-valuenow'
}

// Função para atualizar o estado de cada botão
function updateButtonState(buttonId, isClicked) {
    const button = document.getElementById(buttonId);
    if (isClicked) {
        button.disabled = true; // Desabilita o botão
        button.style.backgroundColor = '#ccc'; // Muda a cor de fundo para indicar que está desabilitado
    } else {
        button.disabled = false; // Habilita o botão
        button.style.backgroundColor = '#4caf50'; // Restaura a cor de fundo do botão
    }
}

// Função para registrar a ação de um botão
function handleButtonClick(buttonId) {
    const currentProgress = parseInt(localStorage.getItem('progress') || 0);
    if (currentProgress < 100) {
        const newProgress = currentProgress + 20; // A cada clique, a barra sobe 20%
        localStorage.setItem('progress', newProgress); // Salva o novo valor de progresso
        updateProgressBar(); // Atualiza a barra de progresso

        // Marca o botão como clicado
        localStorage.setItem(buttonId, 'clicked');
        updateButtonState(buttonId, true);
    }

    // Verifica se a barra de progresso está completa
    if (parseInt(localStorage.getItem('progress') || 0) === 100) {
        enableVotingButton(); // Habilita o botão de votação
    }
}

// Função para habilitar o botão de votação
function enableVotingButton() {
    const votingButton = document.getElementById('votingBtn');
    votingButton.disabled = false;
    votingButton.style.backgroundColor = '#2196f3'; // Muda a cor para azul quando habilitado
}

// Função para reiniciar o progresso
function resetProgress() {
    localStorage.setItem('progress', 0); // Zera o progresso
    updateProgressBar(); // Atualiza a barra de progresso
    // Remove os estados dos botões
    for (let i = 1; i <= 5; i++) {
        localStorage.removeItem(`button${i}`);
        updateButtonState(`button${i}`, false); // Reabilita todos os botões
    }

    // Desabilita o botão de votação
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
    // Atualiza a barra de progresso
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

// Verifica o parâmetro da URL para ajustar o progresso
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('progress')) {
    const progressIncrement = parseInt(urlParams.get('progress'));
    let progress = parseInt(localStorage.getItem('progress') || 0);
    if (progressIncrement && progress < 100) {
        progress = Math.min(progress + progressIncrement, 100); // Limita o progresso a 100%
        localStorage.setItem('progress', progress); // Salva no localStorage
        updateProgressBar();
    }
}
