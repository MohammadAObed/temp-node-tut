//3-define router and change all 'app' to 'router', change url to '/' or '/'url''
//4-module export = router

const express = require('express')
const router = express.Router();

const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')


// // way1:
// router.get('/',getPeople)
// router.post('/',createPerson)
// router.post('/postman',createPersonPostman);
// router.put('/:id',updatePerson)
// router.delete('/:id',deletePerson)
// // way2

router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)


module.exports = router;