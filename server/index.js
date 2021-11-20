require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: true }));

const staticFileMiddleware = express.static('dist');
app.use(staticFileMiddleware);

app.use('/api/books', require('./api/books.js'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))