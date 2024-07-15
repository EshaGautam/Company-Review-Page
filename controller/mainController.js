const path = require('path')
const Review = require('../model/review')

exports.getReviewForm=(req,res,next)=>{
    const formPath = path.join(__dirname,'../views/index.html')
    res.sendFile(formPath)
}

exports.postReview = (req, res, next) => {
  
    const {name,pros,cons, rating } = req.body;
  
    Review.create({
      name:name,
      pros:pros,
      cons:cons,
      rating:rating
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: 'Review posted successfully', review : result });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Failed to post review' });
    });
  };


  exports.getReview = (req, res, next) => {
    const searchedCompany = req.params.search;

    Review.findAll({ where: { name: searchedCompany } })
        .then(reviews => {
            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ message: 'No reviews found for this company' });
            }

            let sum = 0;
            reviews.forEach(review => {
                sum += review.rating;
            });
            const averageRating = sum / reviews.length;

            res.status(200).json({ reviews, averageRating });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch reviews and calculate average rating' });
        });
};