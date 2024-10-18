const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const https = require('https');

const agent = new https.Agent({
  secureProtocol: 'TLSv1_2_method', // Forcing TLS 1.2
});

// Use CORS middleware to allow all origins
app.use(cors());

async function proxyController(req, res) {
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
      httpsAgent: agent, // Use the custom agent with TLS settings
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
}

app.get('/proxy', proxyController);
app.post('/proxy', proxyController);

// Set Vercel's default port
app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
