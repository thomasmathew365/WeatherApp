const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const router = require('./router');

router.route(app);
app.listen(port, () => console.log(`Listening on port ${port}`));
