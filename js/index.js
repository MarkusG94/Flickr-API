const key = '8fc19c222dfa89d038afb6837a7f7e77';
const secret = 'eb8c38bf30301a43';
const url = 'https://api.flickr.com/services/rest?method=flickr.photos.search';
let search = document.getElementById('search');
let btn = document.getElementById('btn');
let toggle = document.getElementById('toggleBtn');
let medium = '_b';
let small = '_m';
let item = '';


async function getData(query) {

    document.getElementById('render_images').innerHTML = null;
    const response = await fetch(`${url}&text=${query}&api_key=${key}&per_page=12&sort=relevance&extras=url_sq,url_m,description&format=json&nojsoncallback=?`)
    const data = await response.json();
    console.log(data);
    getImage(data);
};



btn.addEventListener('click', () => {
    getData(search.value);
});

search.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        getData(search.value);
    }
  });



function getImage(data) {
    let images = document.getElementById('render_images');

    if (!data.photos.photo.length) {
        images.innerHTML = 'Hittade inte ' + search.value;
        return;
    }
   
    data.photos.photo.forEach(element => {
        let item = document.createElement('li')
        item.style.listStyle = 'none';
        item.classList.add('gridPic');
        item.innerHTML = (`<img src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}${small}.jpg"/>`);
        images.appendChild(item);
    });
}

/*  1. Gör en async function,
    2. Gör en knapp som kör fetchen
    3. loopa ut Farm, ID, Server, Secret. 
*/