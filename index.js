const express = require('express');
const app = express();
const mongoose = require('mongoose');

// const cors = require('cors');
// app.use(cors());

app.use(express.json());


const greetingSchema = new mongoose.Schema({greeting: String});
const Greeting = mongoose.model('Greeting', greetingSchema);

app.get('/', (req, res) => {
    res.send({message: 'It works!'});
});

app.get('/api/home', (req, res) => {
    res.send({message: 'Welcome home!'});
});

app.get('/api/test', async (req, res) => {
    const greeting = await Greeting.findOne();
    res.send(greeting);
});

app.get('/api/test/add', async (req, res)=>{
    const greeting = new Greeting({message: "hellooo"});
    res.send(await greeting.save());
});


app.put('/api/test/update', async (req, res) => {
    const greeting = await Greeting.findOne();
    if(!greeting) return res.status(404).send('no greetings found');

    const msg= req.body.message;
    greeting.set({message: msg});
    return res.send(greeting.save());
});

// console.log(process.env.MONGO_PASSWORD);

mongoose.connect(`mongodb+srv://samet:samet@samet-mongo-w68d7.mongodb.net/test?retryWrites=true`)
    .then(() => {console.log('Connected to mongo...')})
    .catch(err => console.error('Connection to mongo failed...'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));