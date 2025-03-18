const { Client } = require('pg');

// Configura la connessione al DB, ma non avviare la connessione qui
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'postgres',  // La password dell'utente
    port: 5432,
});

module.exports = client;
