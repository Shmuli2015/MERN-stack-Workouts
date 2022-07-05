import Workout from '../models/workoutModels.js';
import mongoose from 'mongoose';

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({
        createAt: -1
    });
    res.status(200).json(workouts);
}

const getWorkout = async (req, res) => {
    const {
        id
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: `${id} is not a valid id`
        })
    }
    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({
            error: `workout ${id} not found`
        })
    }
    res.status(200).json(workout);
}

const createWorkout = async (req, res) => {
    const {
        title,
        load,
        reps
    } = req.body;
    try {
        const workout = await Workout.create({
            title,
            load,
            reps
        });
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).json({
            msg: error.message
        })
        console.log(error.message);
    }
}

const deleteWorkout = async (req, res) => {
    const {
        id
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: `${id} is not a valid id`
        })
    }

    const workout = await Workout.findByIdAndDelete({
        _id: id
    });
    if (!workout) {
        return res.status(404).json({
            error: `workout ${id} not found`
        })
    }
    res.status(200).json(workout);
}

const updateWorkout = async (req, res) => {
    const {
        id
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: `${id} is not a valid id`
        })
    };
    const workout = await Workout.findByIdAndUpdate({
        _id: id
    }, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({
            error: `workout ${id} not found`
        })
    }
    res.status(200).json(workout);
}

export {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};