import express from 'express';
const app = express()

const PORT = 4000;

const handleListening = () => {
    console.log(`Listening on Http://localhost:${PORT}`);
}

const handleHoem = (req, res) => {
    res.send('Hello from home');
}

const handleProfile = (req, res) => res.send('You are on my profile');

const betweenHome = (req, res, next) => {
    console.log('I am beteen');
    next()//next를 통해 다음 미들웨어로 넘긴다.   
}

app.use(betweenHome)//모든 path에서 미들웨어 작동

app.get('/', betweenHome, handleHoem); // 해당 path에서만 미들웨어 자곧ㅇ

app.get('/profile', handleProfile);

app.listen(PORT, handleListening);