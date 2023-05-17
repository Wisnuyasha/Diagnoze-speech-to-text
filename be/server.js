const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/api/buy-medicine/products/search', async (req, res) => {
  const { query } = req.query; 

  try {
    const response = await axios.get(`https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/${query}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/buy-medicine/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://magneto.api.halodoc.com/api/v1/buy-medicine/products/${id}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));