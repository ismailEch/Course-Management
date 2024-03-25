const express = require('express');
const planController = require('../Controllers/planeController')
const router = express.Router();


router.route('/')
.get( planController.GetPlans)
.post( planController.CreatePlane)

router.route('/:id' )
.get( planController.GetSinglePlan)
.patch( planController.UpdatePlan)
.delete( planController.deletePlan)


module.exports = router