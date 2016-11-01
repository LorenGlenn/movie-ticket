var movieArray = [];
var movies=[];
var price, rating, genre;
var genreArray=[];
var theMovies=[];
var populateGenres=function(){
  var genreTmpNames= listOfGenres = genres.genres.map(listOfGenres => listOfGenres.name);
  var genreTmpId=  listOfGenres = genres.genres.map(listOfGenres => listOfGenres.id);

  genreTmpId.forEach(function(index,el){
    genreArray[index]=genreTmpNames[el];
  });
}



var getMovies = function(){
  randomizer=Math.floor(Math.random()*500);
  url="https://api.themoviedb.org/3/discover/movie?page="+randomizer+"&include_video=true&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=8808d5174bbb4fd01ce5d91143afd858";
  return url;
}

var settingsMovies = function(){
    var newMovieList = {
      "async": true,
      "crossDomain": true,
      "url":getMovies(),
      "method": "GET",
      "headers": {},
      "data": "{}"
    }
    return newMovieList;
    }


var settingsGenre = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=8808d5174bbb4fd01ce5d91143afd858",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

var genreDropdown = function(){
  var listOfGenres = genres.genres.map(listOfGenres => listOfGenres.name);
  return listOfGenres;
  }
var addPrice = function(){
  var checkNew = new Date("2016");
  var checkOld = new Date("2010");
  var dates = movies.map(listOfGenres => listOfGenres.release_date);
  movies.forEach(function(each,index){
    if(new Date(dates[index]) >= checkNew){
      each.price=15;
    }else if (new Date(dates[index]) > checkOld){
      each.price=7;
    }else {
      each.price=4;
    }
  });
}

var setGenres = function(){
  movies.forEach(function(movie){
    movie.genres=[];
    movie.genre_ids.forEach(function(id){
      movie.genres.push(genreArray[id]);
    })
  })
}

var flatten = function() {
  for(var i=0;i<20;i++){
    for(var j=0;j<20;j++){
      movies.push(movieArray[i][j]);
    }
  }
}

var findMatch = function(obj) {
  if (obj.price <= price && obj.vote_average >= rating) {
    return true;
}
}

var getRidOfGenres = function(obj){
  for(i=0;i<obj.genres.length;i++){
      if(genre==obj.genres[i]){
        return true;
    }
  }
}


$(document).ready(function(){

  for(index = 0; index < 20; index++){
    $.ajax(settingsMovies()).done(function (movieResponse) {
      movieArray.push(movieResponse.results);
    });
  }

    $.ajax(settingsGenre).done(function (genreResponse) {
      genres=genreResponse;
      var listOfGenres = genreDropdown();
      listOfGenres.forEach(function(genre){
        $('#genre').append("<option>" + genre + "</option>")
      });
    });

    $("#movieFilter").submit(function(event){
      movies=[];
      theMovies=[];
      theFinalMovies=[];
      $('.container2').empty();
      event.preventDefault();
      flatten();
      addPrice();
      populateGenres();
      setGenres();
      price = parseInt($('#price').val());
      rating = parseInt($('#rating').val());
      genre = $('#genre').val();
      theMovies= movies.filter(findMatch);
      theFinalMovies= theMovies.filter(getRidOfGenres);


      theFinalMovies.forEach(function(each){
        $('#output').append("<div class='item'><center><h3>"+ each.title+ "</h3><br><img src='http://image.tmdb.org/t/p/w780/" + each.poster_path +"'><br><p>"+ each.overview +"</p><br><span>Released: "+ each.release_date + "</span><br><span>Price for movie: $" + each.price + "</span>");
      })

    });

});



//http://image.tmdb.org/t/p/w780/
