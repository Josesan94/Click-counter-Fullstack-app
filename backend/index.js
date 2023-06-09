
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const buttonRoutes = require('./src/routes/buttonRoutes');
const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;
app.use('/', buttonRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})