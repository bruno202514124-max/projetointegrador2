import cors from 'cors';
import express from 'express';
import { rotas } from './rotas';

const port = 2000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(rotas);

app.listen(port, async () => {
  console.log(`Servidor executado no port ${port}`);
});
