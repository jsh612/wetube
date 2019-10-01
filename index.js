const express = require('express')
const app = express()

const PORT = 4000;

const handleListening = () => {
    console.log(`Listening on Http://localhost:${PORT}`);
}

const handleHoem = (req, res) => {
    console.log(req)
    res.send('Hello from home');
}

const handleProfile = (req, res) => {
    res.send('You are on my profile');
}

app.get('/', handleHoem);

app.get('/profile', handleProfile);

app.listen(PORT, handleListening);