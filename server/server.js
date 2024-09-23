const express = require('express');
const cors = require('cors');
const flightRoutes = require('./routes/flightRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', flightRoutes);
app.use('/api', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));