let progress = 0; // Variável para controlar o progresso
const serverIp = "http://localhost"; // Sem a porta
const buttonIds = ['button1', 'button2', 'button3', 'button4', 'button5']; // IDs dos botões

// Função para aumentar o progresso
function increaseProgress(button) {
    if (progress < 100 && !button.disabled) {
        progress += 20; // Aumenta 20% por clique
        updateProgressBar(); // Atualiza a barra de progresso
        button.disabled = true; // Desabilita o botão clicado
        saveButtonState(button.id, true); // Salva o estado do botão (pressionado)
    }

    // Desativa todos os botões se a barra chegar a 100%
    if (progress === 100) {
        disableAllButtons();
    }
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%'; // Altera a largura da barra de progresso
}

// Função para desabilitar todos os botões
function disableAllButtons() {
    const buttons = document.querySelectorAll('.progress-btn');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Função para gerar QR Codes para cada botão
function generateQRCode(buttonId) {
    // A URL única para cada botão será algo como: http://localhost/button1
    const url = `${serverIp}/${buttonId}`;

    QRCode.toDataURL(url, function (err, url) {
        if (err) {
            console.error(err);
        } else {
            // Gera o QR Code para o botão com o id correspondente
            document.getElementById('qr' + buttonId.replace('button', '')).innerHTML = `<img src="${url}" alt="QR Code">`;
        }
    });
}

// Função para salvar o estado do botão (pressionado) no localStorage
function saveButtonState(buttonId, state) {
    localStorage.setItem(buttonId, state); // Armazena o estado do botão (true ou false)
}

// Função para carregar o estado dos botões e atualizar a interface
function loadButtonStates() {
    buttonIds.forEach(buttonId => {
        const state = localStorage.getItem(buttonId); // Recupera o estado do localStorage
        const button = document.getElementById(buttonId);
        
        if (state === 'true') {
            button.disabled = true; // Desabilita o botão se já foi pressionado
            progress += 20; // Aumenta a barra de progresso
        }
    });
    updateProgressBar(); // Atualiza a barra de progresso com o valor atual
}

// Função para ativar o botão a partir da URL
function activateButtonFromUrl(url) {
    const buttonId = url.split('/').pop(); // Extrai o ID do botão da URL
    const button = document.getElementById(buttonId);

    if (button && !button.disabled) {
        increaseProgress(button); // Simula o clique no botão
    }
}

// Simulação de leitura de URL
window.onload = function() {
    // Carrega os estados dos botões ao carregar a página
    loadButtonStates();

    const urlParams = new URLSearchParams(window.location.search);
    const buttonId = urlParams.get('button'); // A URL terá um parâmetro ?button=button1, por exemplo

    if (buttonId) {
        activateButtonFromUrl(buttonId); // Ativa o botão com base no QR Code lido
    }
};

// Gera os QR Codes para todos os botões
buttonIds.forEach(buttonId => generateQRCode(buttonId));
