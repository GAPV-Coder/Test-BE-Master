import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import config from './config.js';
import connectionDB from './database/connectionDB.js';
import routes from './routes/index.js';

const app = express();


// Middleware's
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE',
    );
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Routes
app.use('/api/v1', routes);

// Server configuration
const { port } = config || 8080;
const httpServer = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Database connection
connectionDB();