// elementlarni chaqirib olish

const moviesList = document.querySelector(".movies-list");
const form = document.querySelector(".filtering-form");
const titleInput = document.querySelector(".title-input");
const ratingInput = document.querySelector(".rating-input");
const catigorySelect = document.querySelector(".catigories-select");
const sorting = document.querySelector(".sorting-select");
const moviesTemplate = document.querySelector("#movie-template").content;

let kinolar = movies.splice(0, 100);


// movies arrayini normolize qilish
let normalizedMovies = kinolar.map((movie, i) => {
    return {
        id: i + 1,
        title: movie.Title.toString(),
        year: movie.movie_year,
        categories: movie.Categories.split("|").join(", "),
        rating: movie.imdb_rating,
        runTime: movie.runtime,
        language: movie.language,
        summary: movie.summary,
        // trailer: `https://www.youtube.com/watch?v=${movie.ytid}`,
        poster: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    }
});


// template elementlariga array qiymatlarini yozish
let createMovieElement = (kino) => {
    let movieElement = moviesTemplate.cloneNode(true);

    movieElement.querySelector(".movie-img").src = kino.poster;
    movieElement.querySelector(".card-title").textContent = kino.title;
    movieElement.querySelector(".movie-year").textContent = kino.year;
    movieElement.querySelector(".movie-catigories").textContent = kino.categories;
    movieElement.querySelector(".rating").textContent = kino.rating;
    movieElement.querySelector(".run-time").textContent = kino.runTime;
    movieElement.querySelector(".language").textContent = kino.language;
    movieElement.querySelector(".summary").textContent = kino.summary;
    movieElement.querySelector(".summary").href = kino.trailer;

    return movieElement;
}



// arrayni render qilib fragment ochish
let renderMovies = (movies) => {
    let resultFragment = document.createDocumentFragment();

    movies.forEach((movie) => {
        resultFragment.append(createMovieElement(movie));
    });

    moviesList.append(resultFragment);
}

renderMovies(normalizedMovies);





let searchingMovie = [];



form.addEventListener("submit", function(evt) {
    evt.preventDefault;

    moviesList.innerHTML = "";

    const titleInputValue = titleInput.value.trim();
    const ratingInputValue = ratingInput.value;
    const catigorySelectValue = catigorySelect.value.toString();

    
    var searchRegex = new RegExp(titleInputValue, "gi");


      

     let searchResult = normalizedMovies.filter((movie) => {
         if (movie.title.match(searchRegex)) {
           return movie.title.match(searchRegex);
         }
       });

     
    let ratingResult = normalizedMovies.filter((movie) => {
        return movie.rating > ratingInputValue;
      });


    let categoriesResult = normalizedMovies.filter((movie) => {
        if (movie.categories.match(catigorySelectValue)) {
          return movie.categories.match(catigorySelectValue);
        }
    });

    

      if (titleInputValue) {
          renderMovies(searchResult);
      } else if (ratingInputValue) {
          renderMovies(ratingResult);
      } else if (catigorySelectValue) {
          renderMovies(categoriesResult)
      }



})