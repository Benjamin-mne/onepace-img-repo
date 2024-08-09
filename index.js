import express, { Router } from 'express';
import { promises as fs } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = process.env.PORT ?? 3001

const app = express();
app.use(express.json());

const route = Router();

route.get('/images/:arc/:episode', async (req, res) => {
    const { arc, episode } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = path.resolve(__dirname, `./images/arcs/arc-${arc}/${episode}.webp`);

    try {
        const image = await fs.readFile(filePath);

        res.setHeader('Content-Type', 'image/webp');
        res.send(image);
    } catch (error) {
        console.error('Error:', error);
        res.status(404).send('Image not found');
    }
});

app.use(route);

app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})
