import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import parserRouter from './routes/parserRouter';


const app = express();
const port = 8080;


app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use('/api', parserRouter);


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});