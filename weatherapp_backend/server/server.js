const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const router = require('./router');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.route(app);
app.listen(port, () => console.log(`Listening on port ${port}`));
