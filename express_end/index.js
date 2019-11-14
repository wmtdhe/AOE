const express = require('express');
const cors = require('cors') //cross origin resource sharing

// --- connection to mysql


require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //parse json send receive
app.use(express.urlencoded())//receive post
//routes
const recipeRouter = require('./routes/recipe');
const searchRouter = require('./routes/search');
const imgRouter = require('./routes/test');
const userRouter = require('./routes/signup_signin')

app.get('/',(req,res)=>'hello world')
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.use('/recipe',recipeRouter);
app.use('/search',searchRouter);
app.use('/avatar',imgRouter);
app.use('/user',userRouter);
// app.use('')

app.listen(port,function () {
    console.log(`server side running on ${port}`)
})