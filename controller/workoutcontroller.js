//RECIEVING COLLECTION FROM workoutmodel
const req_workout = require('../models/workoutmodel')

const mong = require('mongoose')



// GET/display all workouts
const getworkouts = async (req, res) => {
    const all_workouts = await req_workout.find({}).sort({createdAt: -1})   // -1 for sorting in descending(newest first)

    res.status(200).json(all_workouts)
}



//GET single workout
const getworkout = async (req, res) => {
    const {id} = req.params //stores id ig

    //mongoose module's method to return an error message rather than letting server crash for wrong id in get single workout request
    if(!mong.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    //finding element by id in imported collection req_workouts
    const workout = await req_workout.findById(id)

    //if above data not recieved, then do this:
    if(!workout) {
        return res.state(404).json({error: "No such workout"})
    }

    //if if statement dosent execute i.e., data is recieved
    res.status(200).json(workout)
}






//ADDING NEW WORKOUT TO DATABASE VIA POST
const createworkout = async (req, res) => {

    const {title, load, reps} = req.body      // destructuring the req.body object and assigning the values of its title, load, and reps properties to the title, load, and reps variables respectively.

    try{
        const workout = await req_workout.create({title, load, reps})        //rhs is async function hence renamed the post function above as async + await keywork makes sure req_workout.create() is completely executed creating a new collection in db before moving flow of control to next line (hence async)
        res.status(200).json(workout)   //.status(200) sets the HTTP status code of the response to 200, which means "OK", .json is USED FOR SENDING DATAF FROM VARIABLE OR DIRECTLY AS STRING(mssg: 'message here')
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// how was a random id for a workout post generated on posting a request ?



//DELETE EXISTING WORKOUT
const deleteworkout = async (req, res) => {
    const { id } = req.params

    if(!mong.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // finding element by id and deleting it
    const workout = await req_workout.findOneAndDelete({_id: id})

    if(!workout) {
        return res.state(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}



//UPDATE EXISTING WORKOUT
const updateworkout = async (req, res) => {
    const { id } = req.params

    if(!mong.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await req_workout.findOneAndUpdate({_id: id}, {
        ...req.body //data passed by patch request will replace the req.body elements(tieil, reps and load) for given id 
    })

    if(!workout) {
        return res.state(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

module.exports = {
    createworkout,
    getworkouts,
    getworkout,
    deleteworkout,
    updateworkout
}
