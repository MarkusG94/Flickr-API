const key = '8fc19c222dfa89d038afb6837a7f7e77';
const secret = 'eb8c38bf30301a43';
const url = 'https://api.flickr.com/services/rest?method=flickr.photos.search';
let search = document.getElementById('search');
let btn = document.getElementById('btn');
let toggle = document.getElementById('toggleBtn');
let medium = '_b';
let small = '_m';
let page = '&per_page=12';
let sort = '&sort=relevance';
// let item = '';


async function getData(query) {

    document.getElementById('render_images').innerHTML = null;
    const response = await fetch(`${url}&text=${query}&api_key=${key}${page}${sort}&extras=url_sq,url_m,description&format=json&nojsoncallback=?`)
    const data = await response.json();
    console.log(data);
    getImage(data);
};


//Eventlyssnare med click på knappen "search".
btn.addEventListener('click', () => {
    getData(search.value);
});

// Gör att du kan söka med att trycka på enter
search.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        getData(search.value);
    }
  });

function getImage(data) {
    let images = document.getElementById('render_images');

    // if satsen nedan gör att om det vi söker på inte finns så skrivs det ut i HTML "hittades ej".
    if (!data.photos.photo.length) {
        images.innerHTML = `No match found from your input "${search.value}", please try again!`
        return;
    }
   // Nedan kör vi forEach så att vi kan göra en dynamisk URL med hjälp av parameter.
   // Vi skapar även en li i vår UL för varje bild vi får fram.
    data.photos.photo.forEach(element => {
        let item = document.createElement('li')
        item.style.listStyle = 'none';
        item.classList.add('gridPic');
        item.innerHTML = (`<img src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}${small}.jpg"/>`);
        images.appendChild(item);
    });
}

