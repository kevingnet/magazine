const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Magazine Demo App</h1>Message: Success<h4></h4><p>Version 1.0</p>');
})

app.get('/products', (req, res) => {
    res.send([
        {
            productId: '101',
            price: 150
        },
        {
            productId: '102',
            price: 150
        }
    ])
})

app.listen(port, () => {
    console.log('Magazine Demo App is up and listening on port: ${port}');
})