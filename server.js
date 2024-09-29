const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;


app.get('/ws/:symbol/:interval', (req, res) => {
  const { symbol, interval } = req.params;
  const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);

  binanceSocket.on('message', (data) => {
    res.write(data);
  });

  binanceSocket.on('close', () => res.end());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
