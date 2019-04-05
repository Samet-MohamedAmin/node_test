const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


app.use(express.json());
app.use(cors());


const greetingSchema = new mongoose.Schema({greeting: String});
const Greeting = mongoose.model('Greeting', greetingSchema);


app.get('/api/test', async (req, res) => {
    const greeting = await Greeting.findOne();
    res.send(greeting);
});


mongoose.connect(`mongodb+srv://samet:${process.env.MONGO_PASSWORD}@cluster0-qjiwa.mongodb.net/test?retryWrites=true`)
    .then(() => {console.log('Connected to mongo...')})
    .catch(err => console.error('Connection failed...'));

    
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));