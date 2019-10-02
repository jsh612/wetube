import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import coockieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express()

const PORT = 4000;

const handleListening = () => {
    console.log(`Listening on Http://localhost:${PORT}`);
}

const handleHoem = (req, res) => {
    res.send('Hello from home');
}

const handleProfile = (req, res) => res.send('You are on my profile');

app.use(morgan('dev'));
app.use(helmet());
app.use(coockieParser());
//로그인 등 문자를 처리할때 body-parser의 urlencoded 메소드 이용
app.use(bodyParser.urlencoded({extended: false}));
//json 데이터 처리를 위해 body-parser의 json 메소드 이용
app.use(bodyParser.json());


app.get('/', handleHoem); // 해당 path에서만 미들웨어 자곧ㅇ

app.get('/profile', handleProfile);

app.listen(PORT, handleListening);