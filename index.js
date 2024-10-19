const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

const proxyTable = {
  '/api': 'https://v2-api.obilet.com/api',
};

const apiProxy = createProxyMiddleware({
  changeOrigin: true,
  router: proxyTable,
  target: 'https://v2-api.obilet.com/api',
});

app.use(apiProxy);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
