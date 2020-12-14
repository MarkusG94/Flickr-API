const key = '8fc19c222dfa89d038afb6837a7f7e77';
const secret = 'eb8c38bf30301a43';
const url = 'https://api.flickr.com/services/rest?method=flickr.photos.search';
let search = document.getElementById('search');
let btn = document.getElementById('btn');
let toggle = document.getElementById('toggleBtn');
let medium = '_b';
let small = '_m';
let perPage = '&per_page=12';
let page = 1;
let sort = '&sort=relevance';
let totalPages;
// let item = '';
let setPageNmbr = document.getElementById('set-page-number');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

async function getData(query, page) {

    document.getElementById('render_images').innerHTML = null;
    const response = await fetch(`${url}&text=${query}&api_key=${key}${perPage}&page=${page}${sort}&extras=description&format=json&nojsoncallback=?`)
    const data = await response.json();
    totalPages = data.photos.pages;

    console.log(data);
    updatePageCounter(page, totalPages);
    getImage(data);
};

function updatePageCounter(currentPage, totalPage) {
    let html = document.getElementById('page-count');
    let text = `Sida ${currentPage} av ${totalPage}`

    html.innerHTML = text;
}


//Eventlyssnare med click på knappen "search".
btn.addEventListener('click', () => {
    getData(search.value, page);
});

next.addEventListener('click', () => {

    if (page >= 1 && page < totalPages) {
        page = page + 1
        getData(search.value, page);
    }
});

prev.addEventListener('click', () => {
    if (page >= 2) {
        page = page - 1
        getData(search.value, page);
    }
});


setPageNmbr.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        let pageNumber = parseInt(e.currentTarget.value)
        page = parseInt(e.currentTarget.value);

        getData(search.value, pageNumber);
    }
});


// Gör att du kan söka med att trycka på enter
search.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        getData(search.value, page);
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

