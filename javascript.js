const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1ed79bca0a31ddb41d60c67a544c41cf';


const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const search=document.getElementById('search');
const main=document.getElementById('main');
const form=document.getElementById('form') ;

getMovie(API_URL)


async function getMovie(url){
    const response= await fetch(url);
    const data= await response.json(); 

  showMovies(data.results);
}




function showMovies(movies){

    main.innerHTML='';


    movies.forEach( movie =>  {
        const {title,poster_path,overview,vote_average}=movie;

        const movieEl=document.createElement('div');
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    `

        main.appendChild(movieEl)
    });
}


function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm=search.value;

if(searchTerm && searchTerm!==''){
    getMovie(SEARCH_API + searchTerm);
    search.value='';

}else{
    window.location.reload();
}

})