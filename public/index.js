let form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {

  event.preventDefault();
  let companyName = document.getElementById("name").value;
  let companyPros = document.getElementById("pros").value; 
  let companyCons = document.getElementById("cons").value;
  let companyRating = document.getElementById("rating").value;
  let id = document.getElementById('reviewId').value


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
    console.log(data.reviews)
    console.log((data.averageRating).toFixed(1) )

    const companyNameDiv = document.getElementById('companyName');
    const averageRatingDiv = document.getElementById('averageRating');
    const prosConsList = document.getElementById('prosConsList');

    companyNameDiv.innerHTML = `<h4>${searchedname}</h4>`;
    averageRatingDiv.innerHTML = `<p>Average Rating: ${data.averageRating.toFixed(1)}</p>`;


    let expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
 
  data.reviews.forEach((element, index) => {
    
     let reviewAdded = document.createElement("li");
     reviewAdded.className = "exp-made ";
     reviewAdded.classList.add("list-group-item");
   
     reviewAdded.textContent = `Company Name: ${element.name}, pros: ${element.pros}, Cons: ${element.cons} , Ratings:${element.rating}`;

     expenseList.appendChild(reviewAdded);
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