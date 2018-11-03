const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.json());
app.get('/',(req,res)=>res.sendStatus(200));

app.listen(PORT,console.log('listening'));

