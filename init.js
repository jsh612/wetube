import './db'
import app from './app';
import dotenv from 'dotenv';

dotenv.config()


const PORT = process.env.PORT || 4000

const hadnleListening = () => console.log( `✅Lisening on: http://localhost:${PORT}`);

app.listen(PORT, hadnleListening);

