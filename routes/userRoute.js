const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/', userController.indexUsers)
router.post('/',userController.createUser)
router.put('/:id',userController.auth, userController.updateUser)
router.delete('/:id',userController.auth, userController.deleteUser)
router.post('/login', userController.logInUser)
// router.post('/logout', userController.auth, userController.logOutUser)

module.exports = router