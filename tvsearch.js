const form = document.querySelector('form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    console.log("Submited")
    const user =  form.elements.query.value;
    fetch(`https://api.tvmaze.com/search/shows?q=${user}`)
    .then((res)=>{
        res.json()
        .then((response)=>{
            const heading = document.querySelector('#heading');
            heading.innerText = response[0].show.name;
            const image = document.querySelector('#photo');
            image.src = response[0].show.image.medium;
            const rating = document.querySelector('#rating');
            rating.innerText = "Rating: "+response[0].show.rating.average;
            const rel = document.querySelector('#reld');
            rel.innerText = "First episode date: "+response[0].show.premiered;
            const endd = document.querySelector('#endd');
            if(response[0].show.ended == null){
                endd.innerText = "Last episode date: Still going.."
            }else{
                endd.innerText = "Last episode date: " +response[0].show.ended;
            }
            const para = document.querySelector('#detail');
            para.innerHTML = response[0].show.summary;
            console.log(response)
            document.getElementById("info").style.display = "block";
        })
        .catch((e)=>{
            const heading = document.querySelector('#heading');
            heading.innerText = "Please Enter valid show name";
            document.getElementById("info").style.display = "none";
        })
    })
})
