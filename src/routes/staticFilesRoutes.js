import express from 'express';
import * as path from 'path';

const staticPages = express.Router();

staticPages.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../UI/html/index.html'));
});
staticPages.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../UI/html/signin.html'));
});
staticPages.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../UI/html/createOrder.html'));
});

staticPages.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../UI/html/signup.html'));
});

staticPages.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../UI/html/userProfile.html'));
});
staticPages.get('/summary', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../UI/html/summaryOrders.html'));
});
staticPages.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../UI/html/adminProfile.html'));
});
staticPages.get('/error', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../UI/html/notAuthorizedError.html'));
});

export default staticPages;
