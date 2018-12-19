import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import parcelsRouter from './routes/parcels';
import usersRouter from './routes/users';
import pages from './routes/staticFilesRoutes';

dotenv.config();
// instantiate the app;
const app = express();
// set the middle ware to use for body parsing

// Set the static directory to use
app.use(express.static(path.join(__dirname, '../UI')));

// set the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set the router to use.
app.use('/api/v1', parcelsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/pages', pages);
app.get('/', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/6026755/RzfdpVau');
});
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page requested not found' });
});
// Set the port for listening on.
const port = process.env.PORT || 3000;
app.listen(port);

// export the app for testing
export default app;
