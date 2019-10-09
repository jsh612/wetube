import './db'
import app from './app';
import dotenv from 'dotenv';
import './models/Video'; // 해당 mongoose Vidoe모델을 DB에 연결

dotenv.config()


const PORT = process.env.PORT || 4000

const hadnleListening = () => console.log( `✅Lisening on: http://localhost:${PORT}`);

app.listen(PORT, hadnleListening);

