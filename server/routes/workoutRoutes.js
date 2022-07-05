import express from 'express';
import {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
} from '../cotrollers/workoutController.js';

const routes = express.Router();

routes.get('/', getWorkouts);

routes.get('/:id', getWorkout);

routes.post('/', createWorkout);

routes.delete('/:id', deleteWorkout)

routes.patch('/:id', updateWorkout)

export default routes;