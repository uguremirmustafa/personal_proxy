const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

// Use CORS middleware to allow all origins
app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url; // The target URL is passed as a query parameter

  if (!targetUrl) {
    return res.status(400).send('Please provide a URL.');
  }

  try {
    const response = await axios({
      url: targetUrl,
      method: req.method, // Forward the original HTTP method (GET, POST, etc.)
      headers: req.headers, // Forward the request headers
      data: req.body, // Forward the request body for POST/PUT
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Set Vercel's default port
app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
