const express = require('express');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'));

const port = process.env.PORT || 3000; // Utiliza el puerto proporcionado por Heroku o el puerto 3000 como alternativa
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});