// Função para simular o clique no botão
function simulateButtonClick(buttonId) {
    const button = document.getElementById(buttonId);
    if (button && !button.disabled) {
        button.click(); // Simula o clique no botão
    }
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = localStorage.getItem('progress') || 0;
    progressBar.style.width = `${progress}%`; 
    progressBar.setAttribute('aria-valuenow', progress);
}

// Função para simular o clique no botão de progresso
function handleButtonClick(buttonId) {
    const currentProgress = parseInt(localStorage.getItem('progress') || 0);
    if (currentProgress < 100) {
        const newProgress = currentProgress + 20; 
        localStorage.setItem('progress', newProgress);
        updateProgressBar();
        localStorage.setItem(buttonId, 'clicked');
    }

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

// Função para manipular o parâmetro da URL e simular o clique no botão
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const buttonId = urlParams.get('button1') || urlParams.get('button2') || urlParams.get('button3') || urlParams.get('button4') || urlParams.get('button5');

    if (buttonId) {
        simulateButtonClick(buttonId);
    }
}

// Função para reiniciar o progresso
function resetProgress() {
    localStorage.setItem('progress', 0); 
    updateProgressBar();
    for (let i = 1; i <= 5; i++) {
        localStorage.removeItem(`button${i}`);
        const button = document.getElementById(`button${i}`);
        button.disabled = false;
        button.style.backgroundColor = '#4caf50'; 
    }
    const votingButton = document.getElementById('votingBtn');
    votingButton.disabled = true;
    votingButton.style.backgroundColor = '#ccc';
}

// Função para votar
function vote() {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfkABb7ihtrT19LHMEqOy4vVXWpfGF7Fd2w-gmBxqKadJvHQA/viewform';
}

// Inicializa a página
window.onload = function() {
    handleURLParams(); // Verifica o parâmetro na URL e simula o clique
    updateProgressBar();
    for (let i = 1; i <= 5; i++) {
        const isClicked = localStorage.getItem(`button${i}`) === 'clicked';
        const button = document.getElementById(`button${i}`);
        if (isClicked) {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
        }
    }
    if (parseInt(localStorage.getItem('progress') || 0) === 100) {
        enableVotingButton();
    }
};

// Adiciona ouvintes para os botões
for (let i = 1; i <= 5; i++) {
    document.getElementById(`button${i}`).addEventListener('click', () => handleButtonClick(`button${i}`));
}

// Ouvinte para resetar o progresso
document.getElementById('resetBtn').addEventListener('click', resetProgress);

// Ouvinte para o botão de votação
document.getElementById('votingBtn').addEventListener('click', vote);
