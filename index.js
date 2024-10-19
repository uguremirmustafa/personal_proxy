const http = require('http');
const httpProxy = require('http-proxy');

// Create a new instance of http-proxy
const proxy = httpProxy.createProxyServer({});

// Start the proxy server
http
  .createServer((req, res) => {
    const targetUrl = req.query.url; // Modify the Origin header
    req.headers['origin'] = targetUrl;

    // Forward the request to the target server
    proxy.web(req, res, { target: targetUrl });
  })
  .listen(3000, () => {
    console.log('Proxy server is running on port 3000');
  });
