let historyArr = [];
searchFormBtn.addEventListener('click', () => {
    location.hash='#search='+searchFormInput.value;
});
trendingBtn.addEventListener('click', () => {location.hash='#trends='});
arrowBtn.addEventListener('click', () => {
    if(historyArr.length>1){
        location.hash = historyArr[historyArr.length-2];
        historyArr.splice(-2,2);
    }else{
        historyArr.pop();
        location.hash = "#home";
    }
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator () {
    console.log({location});

    if(location.hash.startsWith("#trends") || location.hash.startsWith("#search=") || location.hash.startsWith("#movie=") || location.hash.startsWith("#category=")){
        historyArr.push(location.hash)
      }
    
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else if(location.hash.startsWith('#movie=')){
        movieDetailPage();
    }else if(location.hash.startsWith('#category=')){
        categoriesPage();
    }else{
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; // Hace que la página cargue en la parte superior
    
}

function homePage(){
    console.log('Home!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searhForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');


    getCategoriesPreview();
    getTrendingMoviesPreview();
}
function categoriesPage(){
    console.log('categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searhForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('='); // ['#category', 'id.name']
    const [categoryId, categoryName] = categoryData.split('-');
    //Para reemplazar %20 por espacios en blanco y ver tildes
    var name = categoryName;
    if(name.includes('%20')){
        name = name.split('%20');
        name = name.join(' ');
    }
    if(name.includes('%C3%B3')){
        name = name.replace('%C3%B3','ó');
    }
    if(name.includes('%C3%A9')){
        name = name.replace('%C3%A9','é')
    }
    if(name.includes('%C3%AD')){
        name = name.replace('%C3%AD','í')
    }
    if(name.includes('%C3%BA')){
        name = name.replace('%C3%BA','ú')
    }
    headerCategoryTitle.innerHTML = name;
    getMoviesByCategory(categoryId);
}
function movieDetailPage(){
    console.log('Movie!!');

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searhForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');


    const [_, movieId] = location.hash.split('='); // ['#movie', '12345']
    getMovieById(movieId);
}
function searchPage(){
    console.log('Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searhForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('='); // ['#search', 'platzi']
    getMoviesBySearch(query);
}
function trendsPage(){
    console.log('TRENDS!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searhForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();
}