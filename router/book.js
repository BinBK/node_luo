const express = require('express')
const router = express.Router()

const bookHandler = require('../router_handler/book')

router.get('/getbook',bookHandler.getbook)
router.delete('/deletebook/:id',bookHandler.delbook)
router.post('/postbook',bookHandler.postbook)
router.put('/updatebook',bookHandler.updatebook)
router.get('/getId/:id',bookHandler.getId)


module.exports = router