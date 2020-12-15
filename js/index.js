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
let setPageNmbr = document.getElementById('set-page-number');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

async function getData(query, page) {

    document.getElementById('render_images').innerHTML = null;
    const response = await fetch(`${url}&text=${query}&api_key=${key}${perPage}&page=${page}${sort}&extras=description&format=json&nojsoncallback=?`)
    const data = await response.json();

    //Om sidan har mer än 5 sidor så sätter vi max 5 sidor
    //annars visas det totala antalet sidor som finns.
    if (data.photos.pages >= 5) {
        totalPages = 5;
    } else {
        totalPages = data.photos.pages;
    }

    console.log(data);
    updatePageCounter(page, totalPages);
    getImages(data);
};

// visar vilken sida du är på
function updatePageCounter(currentPage, totalPage) {
    let html = document.getElementById('page-count');
    let text = `Page ${currentPage} of ${totalPage}`

    html.innerHTML = text;
}


//Eventlyssnare med click på knappen "search".
btn.addEventListener('click', () => {
    page = 1;
    setPageNmbr.value = '';
    getData(search.value, page);
});

//trycker du på next kommer du till nästa sida
next.addEventListener('click', () => {
//Är sidan vi är på högre eller = 1 och samtidigt mindre 
//än totala sidor.
    if (page >= 1 && page < totalPages) {
        page = page + 1
        setPageNmbr.value = ''; // nollställer siffran i inputen där vilken sida du sökt på är.
        getData(search.value, page);
    }
});

//samma som ovan fast du går bakåt ett steg
prev.addEventListener('click', () => {
    if (page >= 2) {
        page = page - 1
        setPageNmbr.value = '';
        getData(search.value, page);
    }
});

//Denna gör att när du trycker på enter söker du efter sida i sökfältet
setPageNmbr.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        let pageNumber = parseInt(e.currentTarget.value)
        page = parseInt(e.currentTarget.value);
        if (page >= 1 && page <= totalPages) {
            getData(search.value, pageNumber);
        }
    }
});


// Gör att du kan söka med att trycka på enter om man vill
search.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        page = 1;
        setPageNmbr.value = '';
        getData(search.value, page);
    }
});

// hämtar bilder
function getImages(data) {
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
        item.innerHTML = (`<img data-high_res="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}${medium}.jpg" data-description='${element.description._content}' class="flickr-image" src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}${small}.jpg" />`);
        images.appendChild(item);
    });

    initLightbox();
}

// Lightbox
var modal = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function () {
    modal.style.display = "none";
}

function initLightbox() {
    let images = document.querySelectorAll(".flickr-image");
    images.forEach((el) => { //loopar igenom alla bilder och skapar ett clickevent
        // som sätter den clickade bildens url till lightboxens
        //img-tag (highres med data-attribut).
        el.addEventListener('click', (e) => {
            modal.style.display = "block";

            // Här sparar vi ner element och data i variablar

            // bild-elementet vi klickar på
            let clickedImage = e.currentTarget;

            // Här sparas den dynamiska bild taggen ner
            let modalImg = document.getElementById("modal-img");

            // Här sparas den dynamiska p taggen, även kallas caption
            let captionText = document.getElementById("caption");


            modalImg.src = clickedImage.dataset.high_res;
            captionText.innerHTML = clickedImage.dataset.description;
        });
    });
}
