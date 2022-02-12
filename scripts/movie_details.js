let movie = JSON.parse(localStorage.getItem("Movie"));

document.querySelector("title").innerText = movie.Title;

let h1 = document.createElement("h1");
h1.innerText = movie.Title;

let poster = document.createElement("img");
poster.src = movie.Poster;

let year = document.createElement("h3");
year.innerText = `Realease Year: ${movie.Year}`;

let rating = document.createElement("h3");
let randomRating = Math.round(Math.random() * (10-6)+6)
if(randomRating > 8.5) {
    rating.innerHTML = `IMDB: ${randomRating}⭐ <span>Recommended</span>`
}
else {
rating.innerText = `IMDB: ${randomRating}⭐`;
}

let button = document.createElement("button");
button.innerText = "Go To Home"
button.addEventListener("click", locate)

let div = document.createElement("div");
let div2 = document.createElement("div");

div.append(rating, year);
div2.append(h1,div,button)
document.getElementById("container").append(poster,div2)

function locate() {
    window.location.href = "index.html";
}