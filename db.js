import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()


mongoose.connect(process.env.MONGO_URL, 
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }//그냥 환결설정 일뿐. 중요X
);

const db = mongoose.connection;//mongoDB와의 연결을 변수 db에 저장

const handleOpen = () => console.log('✅__Connectd to DB')
const handleError = (error) => console.log(`❌ Error on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
