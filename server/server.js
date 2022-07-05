import express from 'express';
import dotenv from 'dotenv';
import mongoose from'mongoose';
import workoutRoutes from './routes/workoutRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/workouts', workoutRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`star server with PORT ${process.env.PORT} and connected to mongoDB`)
    })
}).catch((e) => {
    console.log(e)
})