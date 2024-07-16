let form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {

  event.preventDefault();
  let stars = document.querySelectorAll('.rate')
  let companyName = document.getElementById("name").value;
  let companyPros = document.getElementById("pros").value; 
  let companyCons = document.getElementById("cons").value;
  // let companyRating = document.getElementById("rating").value;
  let id = document.getElementById('reviewId').value

  let companyRating = stars.forEach((star)=>{
    star.addEventListener('click',(event)=>{
       let val = star.getAttribute('value')
       return val
      
    })
  })

  console.log(companyRating)

  let newReview = {
    id :id,
    name:companyName,
    pros:companyPros,
    cons:companyCons,
    rating:companyRating
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
    averageRatingDiv.innerHTML = `<p class='d-flex justify-content-evenly'>Average Rating: ${averageRatings} <span class="star-filled">★</span></p>`;


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



