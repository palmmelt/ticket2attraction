const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080; 
app.use(bodyParser.json());
app.use(cors());

require('./controllers/placesController')(app);
require('./controllers/clientCartController')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
