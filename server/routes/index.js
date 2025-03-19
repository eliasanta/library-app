const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

// centralizzo le rotte 

router.use('/auth', authRoutes);

module.exports = router;
