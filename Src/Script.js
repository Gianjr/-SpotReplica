const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

// Estado padrão simplificado
let defaultImage = '';
let defaultName = '';

// Salva o estado inicial quando a página carrega
window.addEventListener('load', () => {
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    defaultImage = artistImage.src;
    defaultName = artistName.innerText;
});

// Função para fazer requisição à API com debounce
function requestApi(searchTerm) {
      const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    
    fetch(url)
        .then(response => response.json())
        .then(result => displayResults(result))
        .catch(() => resetToDefault());
}

// Função para voltar ao estado padrão
function resetToDefault() {
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    
    artistName.innerText = defaultName;
    artistImage.src = defaultImage;
    resultArtist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden');
}

function displayResults(result) {
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    if (result && result.length > 0) {
        resultPlaylist.classList.add('hidden');
        artistName.innerText = result[0].name;
        artistImage.src = result[0].urlImg;
        resultArtist.classList.remove('hidden');
    } else {
        resetToDefault();
    }
}

// Debounce simplificado
let timeoutId = null;
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Limpa o timeout anterior
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    
    if (searchTerm === '') {
        resetToDefault();
        return;
    }
    
    // Define novo timeout
    timeoutId = setTimeout(() => {
        requestApi(searchTerm);
    }, 300);
});