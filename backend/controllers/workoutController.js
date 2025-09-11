const workout = require('../models/workoutModel');
const mongoose = require('mongoose')

//GET all workouts in desc order
const getWorkouts = async (req,res) => {
    const workouts = await workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//GET single workout by id
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const singleWorkout = await workout.findById(id)

    if(!singleWorkout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(singleWorkout)

}

//CREATE new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    //add doc to db
    try {
        const newWorkout = await workout.create({
            title,
            load,
            reps
        })
        res.status(200).json(newWorkout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
};

//DELETE a workout by id
const deleteWorkout = async (req,res) => {
       const { id } = req.params

         if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
         }
 
        const deletedWorkout = await workout.findOneAndDelete({
            _id: id
        })

        if(!deletedWorkout) {
        return res.status(404).json({error: 'No such workout'})
        }
        res.status(200).json(deletedWorkout)
              
}

//UPDATE a workout by id
const updateWorkout = async (req,res) => {
       const { id } = req.params

         if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
         }

         const updatedWorkout = await workout.findOneAndUpdate({_id: id}, {
                ...req.body
         }, { new: true })

        if(!updatedWorkout) {
        return res.status(404).json({error: 'No such workout'})
        }
        res.status(200).json(updatedWorkout)

}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
};












