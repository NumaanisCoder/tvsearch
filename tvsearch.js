const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Submited");
  const suggest = document.querySelector('#suggest');
  suggest.style.display = 'none';
  const user = document.querySelector("#inpu").value;
  const selectValue = document.querySelector("#select").value;

  if (selectValue == "Mov") {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=e34c3d0e727fb20bb91fe0db121f6b30&language=en-US&query=${user}&page=1&include_adult=false`
    )
      .then((res) => {
        res
          .json()
          .then((data) => {
            const heading = document.querySelector("#heading");
            heading.innerText = data.results[0].title;
            const image = document.querySelector("#photo");
            image.style.height = "295px";
            image.style.width = "210px";
            const path =
              "https://image.tmdb.org/t/p/original/" +
              data.results[0].poster_path;
            image.src = path;
            const rel = document.querySelector("#reld");
            rel.innerText = null;
            const platform = document.querySelector("#platform");
            platform.innerText = null;
            const rating = document.querySelector("#rating");
            rating.innerText = "Rating: " + data.results[0].vote_average;
            const endd = document.querySelector("#endd");
            endd.innerText = "Release date: " + data.results[0].release_date;
            const para = document.querySelector("#detail");
            para.innerText = data.results[0].overview;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    fetch(`https://api.tvmaze.com/search/shows?q=${user}`).then((res) => {
      res
        .json()
        .then((response) => {
          heading.innerText = response[0].show.name;
          const image = document.querySelector("#photo");
          image.src = response[0].show.image.medium;
          const rating = document.querySelector("#rating");
          rating.innerText = "Rating: " + response[0].show.rating.average;
          const rel = document.querySelector("#reld");
          rel.innerText = "First episode date: " + response[0].show.premiered;
          const endd = document.querySelector("#endd");
          if (response[0].show.ended == null) {
            endd.innerText = "Last episode date: Still going..";
          } else {
            endd.innerText = "Last episode date: " + response[0].show.ended;
          }
          const platform = document.querySelector("#platform");
          platform.innerText = "Available On: " + response[0].show.network.name;
          const para = document.querySelector("#detail");
          para.innerHTML = response[0].show.summary;
          console.log(response);
          document.getElementById("info").style.display = "block";
        })
        .catch((e) => {
          const heading = document.querySelector("#heading");
          heading.innerText = "Please Enter valid show name";
          document.getElementById("info").style.display = "none";
        });
    });
  }
});


function suggest() {
  const suggest = document.querySelector('#suggest');
  suggest.style.display = 'block';
  const user = document.querySelector("#inpu").value;
  if(user == ''){
    suggest.style.display = 'none';
  }
  if (user) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=e34c3d0e727fb20bb91fe0db121f6b30&language=en-US&query=${user}&page=1&include_adult=false`
    ).then((res) =>
      res.json().then((data) => {
        const list = data.results;
        const suggest1 = document.querySelector('#suggest1');
        const suggest2 = document.querySelector('#suggest2');
        const suggest3 = document.querySelector('#suggest3');

        const suggest = document.querySelector('#suggest');
        suggest.style.display = 'block';
      
          suggest1.innerText = list[0].title
          suggest2.innerText = list[1].title
          suggest3.innerText = list[2].title  
      })
      .catch((err)=>{
        console.log(err);
      })
    );
  } else {
  }
}
