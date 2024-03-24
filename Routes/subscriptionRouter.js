const express = require('express');
const subscriptionController = require('../Controllers/subscriptionController')
const router = express.Router();

router.route('/')
.get( subscriptionController.GetSubscription)
.post( subscriptionController.CreateSubscription)

router.route('/:id' )
.get( subscriptionController.GetSingleSubscription)
.patch( subscriptionController.UpdateSubscription)
.delete( subscriptionController.deleteSubscription)

module.exports = router