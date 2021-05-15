
// API information.
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
// Selecting our Elements.
let pageCount = 1;
let pageHeight = 1800;
let pageLimit = 5;
let isSearchResult = false;

// step 1
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

/* call the showMovies function that requests the movie data from the Api using fetch.
 Then it puts those data in the main HTML tag by creating elments for those data. */
showMovies(apiUrl);
function showMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
    pageLimit = data.total_pages;
    data.results.forEach(element => {
      // Creating elemnts for our data inside the main tag. 
        // step 2
      const el = document.createElement("div");
      const image = document.createElement("img");
      const text = document.createElement("h2");
      
      text.innerHTML = element.title;
      image.src=IMGPATH + element.poster_path;      
      el.appendChild(image);
      el.appendChild(text);
      main.appendChild(el);
        
        
      
    }); 
});
}

// Prevent the Form from submitting if the search bar is empty.
form.addEventListener("submit", (e) => {
   e.preventDefault();
  main.innerHTML="";
  
  const searchName = search.value
  
  if (searchName) {
    showMovies(SEARCHAPI + searchName);
    isSearchResult = true;
    // search.value="";
  } else {
    showMovies(apiUrl);
    isSearchResult = false;

  }
  pageCount=1;
    
    
});



window.addEventListener('scroll', function() {
    console.log(window.pageYOffset);

    if(this.window.pageYOffset >= pageHeight * pageCount) {
        if (pageCount < pageLimit ) {
            pageCount++;
            console.log("showing Next Page");
            console.log("pageLimit: " + pageLimit);
            showMovies(apiUrl + '&page=' + pageCount);
        }
        
           
    
    }

  });

