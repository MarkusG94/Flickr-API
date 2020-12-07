const key = '8fc19c222dfa89d038afb6837a7f7e77';
const secret = 'eb8c38bf30301a43';
const url = 'https://api.flickr.com/services/rest?method=flickr.photos.search';
let search = document.getElementById('search');
let btn = document.getElementById('btn');
let images = document.getElementById('render-images');


async function getData(query) {
    const response = await fetch(`${url}&text=${query}&api_key=${key}&per_page=12&extras=url_sq,url_m,description&format=json&nojsoncallback=?`)
    const data = await response.json();
    console.log(data);
};



btn.addEventListener('click', function() {
    getData(search.value);
});
