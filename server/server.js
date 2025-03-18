const express = require('express');
const app = express();
const router = require('./routes'); // Importa le rotte centralizzate
const cors = require('cors');
const bodyParser = require('body-parser');
const client = require('./db');

// Middleware per il parsing dei body in JSON
app.use(bodyParser.json());
app.use(cors());

// Usa il router centralizzato
app.use('/', router);  // Tutte le rotte sono ora sotto "/"

// Avvio del server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server in esecuzione sulla porta ${port}`);
});
client.connect()
    .then(() => console.log('Connessione al database riuscita'))
    .catch(err => console.error('Errore di connessione al database:', err));

