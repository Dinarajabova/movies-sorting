// elementlarni chaqirib olish

const moviesList = document.querySelector(".movies-list");
const form = document.querySelector(".filtering-form");
const titleInput = document.querySelector(".title-input");
const ratingInput = document.querySelector(".rating-input");
const catigorySelect = document.querySelector(".catigories-select");
const sorting = document.querySelector(".sorting-select");
const moviesTemplate = document.querySelector("#movie-template").content;
const selectOption = document.querySelector(".select-option");
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
        trailer: `https://www.youtube.com/watch?v=${movie.ytid}`,
        poster: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    }
});


// template elementlariga array qiymatlarini yozish
let createMovieElement = (kino) => {
    let movieElement = moviesTemplate.cloneNode(true);

    movieElement.querySelector(".movies-item").title = kino.title;
    movieElement.querySelector(".movie-img").src = kino.poster;
    movieElement.querySelector(".card-title").textContent = kino.title;
    movieElement.querySelector(".movie-year").textContent = kino.year;
    movieElement.querySelector(".movie-catigories").textContent = kino.categories;
    movieElement.querySelector(".rating").textContent = kino.rating;
    movieElement.querySelector(".run-time").textContent = kino.runTime;
    movieElement.querySelector(".language").textContent = kino.language;
    movieElement.querySelector(".summary").textContent = kino.summary;
    movieElement.querySelector(".play").href = kino.trailer;

    return movieElement;
}




// Select Optionlarini yaratish
let creatingOptions = function () {
    let movieCategoryArr = [];


    normalizedMovies.forEach(function (movie) {
        movie.categories.split(", ").forEach(function (category) {
            if (!movieCategoryArr.includes(category)) {
                movieCategoryArr.push(category);
            }
        })
    })
    movieCategoryArr.sort()

    let optionFragment = document.createDocumentFragment();

    movieCategoryArr.forEach(function (category) {
        let categoryOption = createElement("option", "", category);
        categoryOption.value = category;

        optionFragment.append(categoryOption);
        catigorySelect.append(optionFragment);
    })

}
creatingOptions();





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


let findMovie = function(title, rating, category) {
    return normalizedMovies.filter(function(movie) {
        return movie.title.match(title) && movie.rating >= rating && movie.categories.match(category);
    });
}


let sortByOrder = function(array) {
    return array.sort(function(a, b) {
        if (a.title > b.title) {
            return 1;
        } else if (a.title < b.title) {
            return -1;
        } else  {
            return 0;
        }
    })
}

let sortByRating = function(array) {
    return array.sort(function(a, b) {
        if (b.rating > a.rating) {
           return -1;
        } else if (b.rating > a.rating) {
           return 1;
        } else {
            return 0;
        }
    })
}
let sortByRate = function(array) {
    return array.sort(function(a, b) {
        if (a.rating > b.rating) {
           return -1;
        } else if (b.rating > a.rating) {
           return 1;
        } else {
            return 0;
        }
    })
}

let orderResult = function(results, type) {
    if (type === "az") {
        sortByOrder(results);
    } else if (type === "za") {
        sortByOrder(results).reverse();
    } else if (type === "to-highest") {
        sortByRating(results);
    } else if (type === "to-lowest") {
        sortByRate(results)
    }
}

form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    moviesList.innerHTML = "";

    let searchTitle = titleInput.value.trim();
    let movieTitleRegex = new RegExp(searchTitle, "gi");
    
    let sortingRating = Number(ratingInput.value);
    let sortingGenre = catigorySelect.value;
    let sortingOrder = sorting.value;



    let searchResults = findMovie(movieTitleRegex, sortingRating, sortingGenre);
    orderResult(searchResults, sortingOrder);

    renderMovies(searchResults);
    console.log(searchResults)
})
