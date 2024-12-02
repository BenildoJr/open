let qrScanned = 0; // Contador de QR codes escaneados

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    const progress = (qrScanned / 5) * 100;
    progressBar.style.width = `${progress}%`;

    // Habilitar o botão de votação quando 100% da barra for alcançada
    if (qrScanned === 5) {
        document.getElementById("votingBtn").disabled = false;
    }
}

// Função para escanear os QR codes
function onScanSuccess(decodedText, decodedResult) {
    // Verifica se o QR Code corresponde a uma das salas e ainda não foi escaneado
    if (decodedText === "qr1" || decodedText === "qr2" || decodedText === "qr3" || decodedText === "qr4" || decodedText === "qr5") {
        if (!document.getElementById(decodedText).classList.contains('scanned')) {
            document.getElementById(decodedText).classList.add('scanned');
            qrScanned++;
            updateProgressBar();
        }
    }
}

// Inicia o leitor de QR Code
const html5QrCode = new Html5Qrcode("qr-code-reader");

function startScanning() {
    html5QrCode.start(
        { facingMode: "environment" }, // Configuração de câmera traseira
        {
            fps: 10,    // Frames por segundo
            qrbox: 250  // Tamanho da caixa de escaneamento
        },
        onScanSuccess
    ).catch((err) => {
        console.log("Erro ao iniciar a leitura do QR Code: ", err);
    });
}

// Iniciar o scanner ao carregar a página
startScanning();
