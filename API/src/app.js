import express from 'express';
import parcelsRouter from './routes/parcels';

// instantiate the app;
const app = express();
// set the middle ware to use for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set the router to use.
app.use('/api/v1', parcelsRouter);

// Set the port for listening on.
const port = process.env.PORT || 3000;
app.listen(port);

// export the app for testing
export default app;
