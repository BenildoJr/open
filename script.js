// Inicializa o progresso da barra de progresso
let progress = localStorage.getItem('progress') ? parseInt(localStorage.getItem('progress')) : 0;
const progressBar = document.getElementById('progressBar');
const votingBtn = document.getElementById('votingBtn');

// Função para atualizar a barra de progresso
function updateProgressBar() {
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
    // Verifica se o progresso atingiu 100% e habilita o botão de votação
    if (progress >= 100) {
        votingBtn.disabled = false; // Habilita o botão de votação
    }
}

// Atualiza a barra de progresso ao carregar a página
updateProgressBar();

// Verifica o parâmetro da URL para aumentar o progresso
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('progress')) {
    const progressIncrement = parseInt(urlParams.get('progress'));
    if (progressIncrement) {
        // Incrementa o progresso com base no valor obtido da URL
        progress += progressIncrement;
        // Armazena o progresso atualizado no localStorage
        localStorage.setItem('progress', progress);
        // Atualiza a barra de progresso com o novo valor
        updateProgressBar();
    }
}