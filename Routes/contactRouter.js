const express = require('express');
const contactController = require('../Controllers/contactController')
const router = express.Router();

router.route('/')
.get( contactController.getContact)
.post( contactController.CreateContact)

router.route('/:id' )
.get( contactController.GetSingleContact)
.patch( contactController.UpdateContact)
.delete( contactController.deleteContact)

module.exports = router