const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../db');  // Connessione al DB

// Funzione di registrazione
exports.register = async (req, res) => {
    console.log('registrazione inviata')
    console.log('req', req.body)

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email';
    console.log('Esecuzione query:', query, [name, email, hashedPassword]);

    try {
        const result = await client.query(query, [name, email, hashedPassword]);
        console.log('Risultato della query:', result);
        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ user, token });
    } catch (err) {
        //console.error('Errore durante la registrazione:', err);  // Log dell'errore
        res.status(500).json({ error: 'Errore durante la registrazione', details: err.stack });
    }
};

// Funzione di login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = $1';

    try {
        const result = await client.query(query, [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Utente non trovato' });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Credenziali errate' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ user, token });
    } catch (err) {
        res.status(500).json({ error: 'Errore durante il login', details: err.stack });
    }
};

// Funzione per ottenere il profilo dell'utente (protetta da JWT)
exports.profile = (req, res) => {
    res.json({ message: 'Accesso al profilo consentito' });
};
