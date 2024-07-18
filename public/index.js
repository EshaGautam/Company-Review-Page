let form = document.querySelector("#form");

let selectedRating = 0;
document.querySelectorAll('.rate').forEach(star => {
  star.addEventListener('click', (event) => {
    selectedRating = star.getAttribute('value');
    console.log(`Selected rating: ${selectedRating}`);
  });
});

form.addEventListener("submit", async function (event) {

  event.preventDefault();
  

  let companyName = document.getElementById("name").value;
  let companyPros = document.getElementById("pros").value; 
  let companyCons = document.getElementById("cons").value;
  let id = document.getElementById('reviewId').value
 

  let newReview = {
    id :id,
    name:companyName,
    pros:companyPros,
    cons:companyCons,
    rating:selectedRating
  }

try{
 const response = await fetch('http://localhost:4000/review/add-review',{
  method:'POST',
  body:JSON.stringify(newReview),
  headers:{
    'Content-Type':'application/json'
  }
 })
 if(!response.ok){
  throw new Error('problem in adding review')
 }

}
catch(error){
  console.log(error)
}
 form.reset();
selectedRating=0
});


async function displayReview(searchedname) {
  console.log(searchedname)
  try{
    const response = await fetch(`http://localhost:4000/review/get-review/${searchedname}`)
    if(!response.ok){
      throw new Error('problem fetching data')
    } 
    const data = await response.json()
   const averageRatings = calculateAverageRatings(data.reviews)
  

    const companyNameDiv = document.getElementById('companyName');
    const averageRatingDiv = document.getElementById('averageRating');
   

    companyNameDiv.innerHTML = `<h3>${searchedname}</h3>`;
    averageRatingDiv.innerHTML = `<p class='d-flex'>Average Rating: ${averageRatings} <span class="star-filled">★</span></p>`;


    let reviewList = document.getElementById("reviewList");
    reviewList.innerHTML = "";
 
  data.reviews.forEach((element, index) => {
     
     let reviewAdded = document.createElement("li");
     reviewAdded.className = "exp-made ";
     reviewAdded.classList.add("list-group-item");


    
     let starsHTML = "";
     for (let i = 1; i <= 5; i++) {
         if (i <= element.rating) {
             starsHTML += `<span class="star-filled">★</span>`;
         } else {
             starsHTML += `<span class="star-unfilled">☆</span>`;
         }
     }


   
     reviewAdded.innerHTML = `<span><h5>Pros:</h5> ${element.pros}</span><span> <h5>Cons:</h5> ${element.cons}</span> <span><h>Ratings</h>${starsHTML}</span>`;

     reviewList.appendChild(reviewAdded);
  
   });

  }
  catch(err){
    console.log(err)
  }
 
}

const submitBtn = document.getElementById('search-btn')

submitBtn.addEventListener('click',async function(event){
    let searchCompany = document.getElementById('search').value
    let x = searchCompany.toLowerCase()
    displayReview(x)


})


function calculateAverageRatings(reviews){
    let sum = 0;
    reviews.forEach(review => {
        sum += review.rating;
    })
   const averageRating= sum / reviews.length;
   return averageRating.toFixed(1)
}



