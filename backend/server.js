import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import beautyRoutes from './routes/beautyRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api', beautyRoutes);
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../frontend/home.html'));
});

app.listen(3000, () => {
    console.log('servidor corriendo en http://localhost:3000');
});