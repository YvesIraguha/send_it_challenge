import express from 'express';
import dotenv from 'dotenv';
import parcelsRouter from './routes/parcels';
import usersRouter from './routes/users';

dotenv.config();
// instantiate the app;
const app = express();
// set the middle ware to use for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set the router to use.
app.use('/api/v1', parcelsRouter);
app.use('/api/v1/users', usersRouter);
app.get('/', (req, res) => {
  res.send({message:"Welcome to yvessendit api",structure:"HTTP method: /api/v1/"});
});
 app.get('*',(req,res) => {
   res.status(404).send({message:"Page requested not found"});
 });
// Set the port for listening on.
const port = process.env.PORT || 3000;
app.listen(port);

// export the app for testing
export default app;
