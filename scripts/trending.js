

async function getMovies() {

    try {
        let res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=a7ac0b0884b0f17f2c8c89a5cea99ab6`)

        let data = await res.json();
        appendMovies(data.results)
    }
    catch(error) {
        console.log(error);
    }
}
getMovies();
let i = 1;

function appendMovies(movie) {
    console.log(movie);

    movie.forEach(function (data) {
        let name = document.createElement("h3");
        name.innerText = `${i++}. ${data.title}`;

        let image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
        image.alt = "Poster Not Found";

        // console.log(image)

        let rating = document.createElement("h5");

        if(data.vote_average > 8) {
            rating.innerHTML = `Rating: ${data.vote_average}⭐ <span>Recommended</span>`
        }
        else {
            rating.innerText = `Rating: ${data.vote_average}⭐`;
        }
        

        let imdb = document.createElement("p");
        imdb.innerText = `ID: ${data.id}`;

        let date = document.createElement("p");
        date.innerText = `Date: ${data.release_date}`;

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");

        div1.append(date, imdb);
        div2.append(image,name,rating,div1);
        document.getElementById("container").append(div2);
    })
}