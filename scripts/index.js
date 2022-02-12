let movies_div = document.getElementById("debounce");

async function getMovies() {
    movies_div.style.width = "0";
    movies_div.style.height = "0";

    let input = document.getElementById("search").value;

    try {
        let res = await fetch(`http://www.omdbapi.com/?apikey=5ca9f57b&s=${input}`)

        let data = await res.json();

        if(data.Response === "False") {
            console.log(data.Error);
            notFound();
        }
        else {
            appendMovies(data.Search);
        }
    }
    catch(error) {
        console.log(error);
    }
}

function notFound() {
    document.getElementById("container").innerHTML = "";
    let h2 = document.createElement("h2");
    h2.innerText = "Movie Not Found!!!"

    let image = document.createElement("img");
    image.src = "https://c.tenor.com/Wcmh1m50cXsAAAAM/carry-minati-ajey-nagar.gif";
    
    let p = document.createElement("h5");
    p.innerText = "Check your movie name or try another one."
    let div = document.createElement("div");
    div.id = "error";

    div.append(image,h2,p)
    document.getElementById("container").append(div);
}

function appendMovies(movie) {
    console.log(movie);

    document.getElementById("container").innerHTML = "";

    movie.forEach(function (data) {
        let name = document.createElement("h3");
        name.innerText = data.Title;

        let image = document.createElement("img");
        image.src = data.Poster;
        image.alt = "Poster Not Found";

        let rating = document.createElement("h5");
        let randomRating = Math.round(Math.random() * (10-6)+6)
        if(randomRating > 8.5) {
            rating.innerHTML = `IMDB: ${randomRating}⭐ <span>Recommended</span>`
        }
        else {
            rating.innerText = `IMDB: ${randomRating}⭐`;
        }

        let imdb = document.createElement("p");
        imdb.innerText = `IMDB ID: ${data.imdbID}`;

        let year = document.createElement("p");
        year.innerText = `Year: ${data.Year}`;

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");

        div1.append(year, imdb);
        div2.append(image,name,rating,div1);
        document.getElementById("container").append(div2);
    })
}

async function searchMovie() {
    try {
        let movie = document.getElementById("search").value;

        let res = await fetch(`http://www.omdbapi.com/?apikey=5ca9f57b&s=${movie}`);

        let data = await res.json();

        return data.Search;
        console.log(data)
    }
    catch(err) {
        console.log(err);
    }
}

async function main() {
    let data = await searchMovie();

    if(data===undefined) {
        return false;
    }
    appendData(data);
    console.log(data);
}

function appendData(data) {
    movies_div.innerHTML = null;
    data.forEach(function(elem) {
        
        movies_div.style.width = "31%";
        movies_div.style.height = "300px";
        movies_div.style.overflow = "scroll";

        let at = document.createElement("a");
        at.id = "anchor"
        at.addEventListener("click",function() {
            moveToMoviePage(elem)
        });

        let poster = document.createElement("img");
        poster.src = elem.Poster;

        let year = document.createElement("p");
        year.textContent = elem.Year;

        let name = document.createElement("p");
        name.innerText = elem.Title;

        at.append(poster)

        let div1 = document.createElement("div");
        div1.class = "result"
        let div2 = document.createElement("div");

        div2.append(name,year);
        div1.append(at,div2);

        movies_div.append(div1);
    })
}

let timerID;


function debounce(fun,delay) {

    let movie = document.getElementById("search").value;

    if(movie.length == 0) {
        movies_div.style.width = "0";
        movies_div.style.height = "0";
    }

    if(timerID) {
        clearTimeout(timerID);
    }

    timerID = setTimeout(function() {
        fun();
    }, delay);
}

function moveToMoviePage(data) {
    window.location.href = "movie_details.html";

    localStorage.setItem("Movie",JSON.stringify(data));
}