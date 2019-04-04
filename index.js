const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());



app.get('/api/test', (req, res) => {
    res.send({'greeting': 'Welcome from node !'});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));