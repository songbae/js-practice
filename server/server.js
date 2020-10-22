import app from './app';
import config from './config/index';
const { PORT } = config;
app.listen('7000', () => {
    console.log(`서버시작 포트 주소 ${PORT} `);
});
