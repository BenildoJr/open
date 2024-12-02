// Inicializa o progresso da barra de progresso
let progress = localStorage.getItem('progress') ? parseInt(localStorage.getItem('progress')) : 0;
const progressBar = document.getElementById('progressBar');
const votingBtn = document.getElementById('votingBtn');

// Definindo os QR Codes e o valor que cada um adiciona ao progresso
const qrCodes = [
    { id: 'qr1', value: 20 },
    { id: 'qr2', value: 25 },
    { id: 'qr3', value: 15 },
    { id: 'qr4', value: 25 },
    { id: 'qr5', value: 15 }
];

// Função para atualizar a barra de progresso
function updateProgressBar() {
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
    // Verifica se o progresso atingiu 100% e habilita o botão de votação
    if (progress >= 100) {
        votingBtn.disabled = false; // Habilita o botão de votação
    }
}

// Função para armazenar no localStorage os QR Codes lidos
function storeQrCodeRead(qrCodeId) {
    let qrCodesRead = JSON.parse(localStorage.getItem('qrCodesRead')) || [];
    if (!qrCodesRead.includes(qrCodeId)) {
        qrCodesRead.push(qrCodeId);
        localStorage.setItem('qrCodesRead', JSON.stringify(qrCodesRead));
    }
}

// Função para verificar se o QR Code foi lido
function isQrCodeRead(qrCodeId) {
    const qrCodesRead = JSON.parse(localStorage.getItem('qrCodesRead')) || [];
    return qrCodesRead.includes(qrCodeId);
}

// Atualiza a barra de progresso ao carregar a página
updateProgressBar();

// Verifica se algum QR Code foi lido e soma o progresso
qrCodes.forEach(qrCode => {
    if (isQrCodeRead(qrCode.id)) {
        progress += qrCode.value; // Somar o valor correspondente ao QR Code lido
    }
});

// Atualiza a barra de progresso com o progresso acumulado
updateProgressBar();

// Função para incrementar o progresso ao ler um QR Code
function scanQRCode(qrCodeId) {
    // Se o QR Code já foi lido, não faz nada
    if (isQrCodeRead(qrCodeId)) return;

    // Armazena o QR Code como lido
    storeQrCodeRead(qrCodeId);

    // Encontrar o QR Code e somar seu valor ao progresso
    const qrCode = qrCodes.find(code => code.id === qrCodeId);
    if (qrCode) {
        progress += qrCode.value;
        localStorage.setItem('progress', progress); // Armazenar o progresso atualizado
        updateProgressBar();
    }
}

// Função para resetar o progresso e os QR Codes lidos
function resetProgress() {
    localStorage.removeItem('progress'); // Remove o progresso armazenado
    localStorage.removeItem('qrCodesRead'); // Remove os QR Codes lidos
    progress = 0; // Reinicia o progresso
    updateProgressBar(); // Atualiza a barra de progresso para 0%
    votingBtn.disabled = true; // Desabilita o botão de votação
}

// A função scanQRCode será chamada quando o QR Code for lido
// Exemplo de como você pode chamar a função com o id do QR Code
// scanQRCode('qr1'); // Chamaria quando o QR Code 1 fosse lido

// Adicionando o evento de click para o botão de reset
document.getElementById('resetBtn').addEventListener('click', resetProgress);
