const apiKey = '53b2e71f4b81427bb07b60223ec91134';

const genresEndpoint = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=' + apiKey;

let selectedGenreId = '';


function mostrarValores(filmes) {
    const divFilmes = document.getElementById("filmes");

    const filmesHTML = filmes.map(filme => {
        return `
        <div class="col">
            <body class="bg-dark text-light">
            <div class="card bg-dark text-light">
                <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="${filme.title}">
                <div class="card-body">
                    <!-- Exibe o título do filme -->
                    <h5 class="card-title">${filme.title}</h5>
                    <!-- Exibe a sinopse do filme -->
                    
                    <p class="card-text limitar-linhas">${filme.overview}</p>
                </div>
            </div>
        </div>`;
    });

    divFilmes.innerHTML = `<div class="row">${filmesHTML.join("")}</div>`;
}



fetch(genresEndpoint)
    .then(response => response.json())
    .then(data => {
        const genreSelect = document.getElementById('genreSelect');

        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });

        genreSelect.addEventListener('change', () => {
            selectedGenreId = genreSelect.value;
            getAndDisplayMovies();
        });
    })
    .catch(error => console.error('Erro ao obter os gêneros:', error));

const moviesEndpoint = 'https://api.themoviedb.org/3/discover/movie?language=pt-BR&api_key=' + apiKey;

function getAndDisplayMovies() {
    const filteredEndpoint = selectedGenreId
        ? `${moviesEndpoint}&with_genres=${selectedGenreId}`
        : moviesEndpoint;

    getDadosAPI(filteredEndpoint)
        .then(filmes => mostrarValores(filmes))
        .catch(error => console.error("Erro ao obter os dados da API:", error));
}
async function getDadosAPI(endPoint) {
    try {
        const res = await fetch(endPoint);
        const data = await res.json();
        const filmes = data.results;
        return filmes;
    } catch (error) {
        throw error;
    }
}

getAndDisplayMovies();