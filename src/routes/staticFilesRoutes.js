import express from 'express';
import * as path from 'path';

const staticPages = express.Router();

staticPages.get('/',(req,res) => {
        res.sendFile(path.join(__dirname,'/../../UI/html/index.html'));
        return;
}); 
staticPages.get('/signin',(req,res) => {
        res.sendFile(path.join(__dirname,'/../../UI/html/signin.html'));
        return;
}); 
staticPages.get('/create',(req,res) => {
        res.sendFile(path.join(__dirname,'/../../UI/html/createOrder.html'));
        return;
}); 
 
staticPages.get('/signup',(req,res) => {
        res.sendFile(path.join(__dirname,'/../../UI/html/signup.html'));
        return;
}); 
 
staticPages.get('/user',(req,res) => {
        res.sendFile(path.join(__dirname,'/../../UI/html/userProfile.html'));
        return;
}); 
staticPages.get('/summary',(req,res) => {
        res.sendFile(path.join(__dirname,'/../../UI/html/summaryOrders.html'));
        return;
}); 
staticPages.get('/admin',(req,res) => {
        res.sendFile(path.join(__dirname,'/../../UI/html/adminProfile.html'));
        return;
}); 

export default staticPages; 