const exp = require('express')

const {
    createworkout,
    getworkouts,
    getworkout,
    deleteworkout,
    updateworkout
} = require('../controller/workoutcontroller')



//creating -router object- used to define routes for different HTTP methods (such as GET or POST) and corresponding actions to perform when those routes are accessed. usually in main .js file just app = required_module.express() can be used to use app.get etc.
const router = exp.Router()


/* if user accesses this(/api/workouts or /api/workouts/, same stuff) path in main server file as app.use('/api/workouts', wr) below code will be exported:

router.get('/', (req,res) => {
    console.log("ape");
    res.send("ape");
})


else if http://localhost:4000/api/workouts/hello path is requested, this code will b e executed:
router.get('/hello', (req, res) => {
    console.log("monke");
    res.send("monke");
})

*/

//** ADDING ALL REQUEST HANDLERS THAT WILL BE EXPORTED, (data is being send to server for how to respond)
//GET all workouts
// in practical situations we wanna communicate with dbs to get data and send it rather than sending these sample responses
router.get('/', getworkouts)


//GET a single workout
// could have used router.get('/api/workouts/:id', getworkout) here but shortened it using app.use
router.get('/:id', getworkout)

//POST a new workout
router.post('/', createworkout)

//DELETE a workout
//:id here can be replaced by any number/characters even before assigning to get same result
router.delete('/:id', deleteworkout)

//UPDATE a workout
router.patch('/:id', updateworkout)

module.exports = router     //exporting router object via exports object, this file acts as a module


