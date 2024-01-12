function registerUser(){
  document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
  //test
    const username = document.getElementById('user_name').value;
    const email = document.getElementById('email').value;
  
    const userInfo = {username, email}
  
    const option = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify(userInfo)
    }
    fetch("http://localhost:8000/api/register", option)
      .then(res => {
        return res.json()
      })
      .then(res =>{
        console.log("results returning --->", res)
        if(res.errors){
          document.getElementById("userNameError").innerText = res.errors.username?.message || ''
          document.getElementById("emailError").innerText = res.errors.email?.message || ''
        }else{
          window.location.replace("/login")
        }
      })
      .catch((err) => {
        console.log("err --->", err)
      })
  })
  
}
function loginUser(){
  document.getElementById("login-form").addEventListener('submit', (e) =>{
    e.preventDefault();
    const username = document.getElementById('user_name').value;
    const email = document.getElementById('email').value;
  
    const userLoginInfo = {username, email}
    const option = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify(userLoginInfo)
    }
    fetch("http://localhost:8000/api/login", option)
      .then(res =>{
        return res.json()
      })
      .then(res =>{
        console.log("res ---> ", res)
        if(res.errors){
          document.getElementById("userNameError").innerText = res?.errors
        }else{
          window.location.replace("/home")
        }
      })
      .catch(err =>{
        console.log("err ---> ", err)
      })
  })
}  

/************************/
function toggleDropdown(event) {
  var dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
  } else {
      dropdownContent.style.display = "block";
      event.stopPropagation();
  }
}

document.body.addEventListener("click", function() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.style.display = "none";
});
/********************** */

function fetchRandomAnimes(){
  const api_key = "7b974b5298edb35e27fd39e2481710a9"
  const option = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yjk3NGI1Mjk4ZWRiMzVlMjdmZDM5ZTI0ODE3MTBhOSIsInN1YiI6IjY1OTZkZDdkODY5ZTc1NmViNDA2ZDA5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UkZxf8i20B0Wdw_W4vdCwZcPhUyvOTb2SfCZnKZqrsI'
    }
  }
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&page=1&with_keywords=210024|287501&certification=PG-13&certification_country=US`, option)

  .then(res =>{
    return res.json()
  })
  .then(res =>{
    console.log("res ---> ", res)
    const randomAnimes = res.results.splice(0, 20)
    displayAnime(randomAnimes);
  })
  .catch(err => console.log("err --> ", err))
}

function searchFunction(){
  document.getElementById('SearchAnime').addEventListener('submit', (e) =>{
    e.preventDefault()

    const option = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yjk3NGI1Mjk4ZWRiMzVlMjdmZDM5ZTI0ODE3MTBhOSIsInN1YiI6IjY1OTZkZDdkODY5ZTc1NmViNDA2ZDA5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UkZxf8i20B0Wdw_W4vdCwZcPhUyvOTb2SfCZnKZqrsI'
      }
    };

    const searchAnime = document.getElementById("search").value.trim()
    if(searchAnime){
      fetch(`https://api.themoviedb.org/3/search/movie?query=${searchAnime}&include_adult=false&language=en-US&page=1`, option)
        .then(res =>{
          return res.json()
        })
        .then(res =>{
          console.log("res ---> ", res)
          
            displayAnime(res.results);
        })
        .catch(err => console.log("err --> ", err))
    }else{
      fetchRandomAnimes();
    }
  })
}

function displayAnime(movies){
  var anime = movies.map(result => generateBox(result.title, result.poster_path, result.id));

  document.getElementById("title").innerHTML = anime.join('');
}

function generateBox(title, img, id) {
  return `
  <div class="box"> 
    <img src="https://image.tmdb.org/t/p/original/${img}" class="img"></img>
    <h4 class="title"> ${title} </h4>
    <button class="favorite-heart" data-id="${id}" data-title="${title}" data-img="${img}" onclick="toggleFavorite(event)">
      &#x2665; <!-- Heart symbol -->
    </button> 
  </div>`
}

function toggleFavorite(event){
  const heartButton = event.target;
  const animeID = heartButton.getAttribute('data-id');
  const animeTitle = heartButton.getAttribute('data-title');
  const animeImg = heartButton.getAttribute('data-img');

  const animeInfo = {animeID, animeTitle, animeImg}

  // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Check if anime is already a favorite
  // const isAlreadyFavorite = favorites.includes(animeID);


  // if (isAlreadyFavorite) {
  //   // Remove from favorites
  //   const updatedFavorites = favorites.filter(id => id !== animeID);
  //   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  //   heartButton.classList.remove('filled');
  // } else {
  //   // Add to favorites
  //   favorites.push(animeID);
  //   localStorage.setItem('favorites', JSON.stringify(favorites));
    heartButton.classList.add('filled');
    const option1 = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }

    fetch(`http://localhost:8000/api/users/getuser`, option1)
      .then(res => {
          return res.json()
      })
      .then(res => {
          const userId = res.results.id

          const isFavoriteInProfile = res.results.favorites.some(favorite => favorite.animeID === animeID )

          if(!isFavoriteInProfile){
            const option2 = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(animeInfo),
            }
            fetch(`http://localhost:8000/api/users/favorites/${userId}`, option2)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.error(err));
          }else{
            const option3 = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
            fetch(`http://localhost:8000/api/users/favorites/${userId}`, option3)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.error(err));
        }
      })
      .catch(err => console.log('err --> ', err))
    // }
}

function loggedInUserInfo(){
  const option = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }
  
  fetch("http://localhost:8000/api/users/getuser", option)
    .then(res => {
      return res.json()
    })
    .then(res =>{
      console.log("results returning --->", res)
      if(res.results){
        document.getElementById("username").innerHTML = res.results.username
        document.getElementById("email").innerHTML = res.results.email
      }

      const deleteUser = document.getElementById("deleteAccount")
      deleteUser.dataset.userId = res.results.id

      const moviesWithPoster = res.results.favorites
      console.log(moviesWithPoster)
      var anime = moviesWithPoster.map(result => generateFavBox(result.animeTitle, result.animeImg, result.ID))
      console.log(moviesWithPoster)
      document.getElementById('title').innerHTML = anime.join('');
    })
    .catch((err) => {
      console.log("err --->", err)
    })
}

const generateFavBox = (title, img, id) => {
  return `
  <div class="box">
      <img class="img" src="https://image.tmdb.org/t/p/original/${img}" alt="Film"></img>
      <h4 class="title"> ${title} </h4>
      <button class="favorite-heart" data-id="${id}" data-title="${title}" data-img="${img}" onclick="toggleFavorite(event)">
          &#x2665;
      </button>
  </div>`;
}


function deleteAccount(button){
  const option = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }
  const userId = button.dataset.userId;
  console.log(userId)
  fetch(`http://localhost:8000/api/users/${userId}`, option)
    .then(res => {
      return res.json()
    })
    .then(res =>{
      window.location.replace('/')
    })
    .catch((err) => {
      console.log("err --->", err)
    })
}

document.addEventListener('DOMContentLoaded', function () {
  const updateButton = document.getElementById('updateButton');
  if (updateButton) {
    updateButton.addEventListener('click', updateUser);
  }
});

function updateUser(event) {
  event.preventDefault();
  const option1 = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }
  fetch("http://localhost:8000/api/users/getuser", option1)
    .then(res => {
      return res.json()
    })
    .then(res =>{
      if(res.results){
        const id = res.results.id
        const username = document.getElementById('userName').value;
        const email = document.getElementById('email').value;
        const userInfo = {username, email}
        const option2 = {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(userInfo)
        }
        fetch(`http://localhost:8000/api/users/${id}`, option2)
          .then(res => {
            return res.json()
          })
          .then(res =>{
            if(res.errors){
              document.getElementById('emailError').innerText = res.errors.email?.message || ''
            }else{
              window.location.replace('/profile')
            }
          })
          .catch((err) => {
            console.log("err --->", err)
          })
      }


    })
    .catch((err) => {
      console.log("err --->", err)
    })
  // Your existing updateUser function logic here
}