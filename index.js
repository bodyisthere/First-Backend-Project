import express from 'express';
import mongoose from 'mongoose';

import { UserController, PostController } from './controllers/index.js'
import { loginValidation, regValidation, postCreateValidation } from './validations/validations.js';
import handleValidationErrors from './validations/handleValidationErrors.js';
import checkAuth from './utils/checkAuth.js'

const app = express();

mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.cvi7gkx.mongodb.net/prod?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Everything working!')
})

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', regValidation, handleValidationErrors, UserController.register);
app.get('/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);

app.delete('/posts/:id', checkAuth, PostController.remove);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(2222, (err) => {
    if(err) {
        return console.log(err)
    }

    console.log('Server OK');
})