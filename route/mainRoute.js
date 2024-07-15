const express = require('express')

const router = express.Router()

const mainController= require('../controller/mainController')

router.get('/',mainController.getReviewForm)
router.get('/review/get-review/:search',mainController.getReview)
router.post('/review/add-review',mainController.postReview)


module.exports = router